"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  type ColumnDef,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { api } from "~/trpc/react";
import { type FieldType } from "../../../generated/prisma";
import { type FilterGroup, createEmptyFilterGroup } from "./filter-bar";

const ROW_HEIGHT = 32;
const ROW_NUM_WIDTH = 84; // Airtable row-number gutter: drag handle + row number + checkbox + expand
const DEFAULT_COL_WIDTH = 180;
const MIN_COL_WIDTH = 60;

const FIELD_TYPE_ICONS: Record<string, React.ReactNode> = {
  TEXT: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-gray-500">
      <path d="M2.5 3.5A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H8.5v9a.5.5 0 0 1-1 0V4H3a.5.5 0 0 1-.5-.5z"/>
    </svg>
  ),
  NUMBER: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-orange-500">
      <path d="M4 3h3v4H4V3zm5 0h3v4H9V3zM4 9h3v4H4V9zm5 0h3v4H9V9z" fillOpacity="0.8"/>
    </svg>
  ),
  CHECKBOX: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-500">
      <rect x="2" y="2" width="12" height="12" rx="2" />
      <path d="M4.5 8l2.5 2.5 4.5-4.5" />
    </svg>
  ),
};

interface CellInputProps {
  cellValue: string;
  fieldType: string;
  onSave: (val: string) => void;
  isFocused: boolean;
  onNavigate: (direction: "up" | "down" | "left" | "right") => void;
  onFocus: () => void;
}

function CellInput({
  cellValue,
  fieldType,
  onSave,
  isFocused,
  onNavigate,
  onFocus,
}: CellInputProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(cellValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editing) setDraft(cellValue);
  }, [cellValue, editing]);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  useEffect(() => {
    if (isFocused && !editing && cellRef.current) {
      cellRef.current.focus();
    }
  }, [isFocused, editing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (editing) return;

    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        onNavigate("up");
        break;
      case "ArrowDown":
        e.preventDefault();
        onNavigate("down");
        break;
      case "ArrowLeft":
        e.preventDefault();
        onNavigate("left");
        break;
      case "ArrowRight":
        e.preventDefault();
        onNavigate("right");
        break;
      case "Tab":
        e.preventDefault();
        onNavigate(e.shiftKey ? "left" : "right");
        break;
      case "Enter":
        if (fieldType !== "CHECKBOX") {
          setEditing(true);
        }
        break;
      case "Backspace":
      case "Delete":
        if (fieldType !== "CHECKBOX") {
          setDraft("");
          setEditing(true);
        }
        break;
      default:
        // Any printable character immediately enters edit mode seeded with that char
        if (
          e.key.length === 1 &&
          !e.ctrlKey &&
          !e.metaKey &&
          !e.altKey &&
          fieldType !== "CHECKBOX"
        ) {
          e.preventDefault();
          setDraft(e.key);
          setEditing(true);
        }
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEditing(false);
      if (draft !== cellValue) onSave(draft);
      onNavigate("down");
    } else if (e.key === "Escape") {
      setEditing(false);
      setDraft(cellValue);
    } else if (e.key === "Tab") {
      e.preventDefault();
      setEditing(false);
      if (draft !== cellValue) onSave(draft);
      onNavigate(e.shiftKey ? "left" : "right");
    }
  };

  if (fieldType === "CHECKBOX") {
    return (
      <div
        ref={cellRef}
        tabIndex={0}
        className={`flex h-full items-center justify-center outline-none ${
          isFocused ? "ring-2 ring-inset ring-airtable-blue" : ""
        }`}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
      >
        <input
          type="checkbox"
          checked={cellValue === "true"}
          onChange={(e) => onSave(e.target.checked ? "true" : "false")}
          className="h-4 w-4 cursor-pointer rounded border-gray-300 text-airtable-blue focus:ring-airtable-blue focus:ring-offset-0"
          tabIndex={-1}
        />
      </div>
    );
  }

  if (!editing) {
    return (
      <div
        ref={cellRef}
        tabIndex={0}
        className={`flex h-full cursor-cell items-center text-[13px] leading-[19.5px] text-airtable-text-primary outline-none ${
          isFocused ? "ring-2 ring-inset ring-airtable-blue" : ""
        }`}
        style={{ padding: "0 6px" }}
        onClick={() => {
          onFocus();
          setEditing(true);
        }}
        onFocus={onFocus}
        onKeyDown={handleKeyDown}
      >
        <span className="truncate">{cellValue || ""}</span>
      </div>
    );
  }

  return (
    <input
      ref={inputRef}
      type={fieldType === "NUMBER" ? "number" : "text"}
      className="h-full w-full border-2 border-airtable-blue bg-white px-2 text-[13px] text-airtable-text-primary outline-none"
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => {
        setEditing(false);
        if (draft !== cellValue) onSave(draft);
      }}
      onKeyDown={handleInputKeyDown}
    />
  );
}

function ColumnRenameInput({
  initialValue,
  onCommit,
  onCancel,
}: {
  initialValue: string;
  onCommit: (value: string) => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState(initialValue);
  return (
    <form
      className="flex flex-1 items-center"
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) onCommit(value.trim());
      }}
    >
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => {
          if (value.trim()) onCommit(value.trim());
          else onCancel();
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") onCancel();
        }}
        onClick={(e) => e.stopPropagation()}
        className="w-full rounded border border-airtable-blue bg-white px-1.5 py-0.5 text-[13px] font-medium text-airtable-text-primary outline-none"
      />
    </form>
  );
}

type FlatRow = {
  _rowId: string;
  _groupValue?: string;
  _isGroupHeader?: boolean;
  [columnId: string]: string | boolean | undefined;
};

interface TableGridProps {
  tableId: string;
  groupByColumnId?: string | null;
  filterGroup?: FilterGroup;
  searchQuery?: string;
  hiddenFieldIds?: string[];
  sortConfig?: { columnId: string; direction: "asc" | "desc" } | null;
  onAddingRowChange?: (isPending: boolean) => void;
  bulkAddRef?: React.MutableRefObject<(() => Promise<void>) | null>;
}

export function TableGrid({ tableId, groupByColumnId, filterGroup, searchQuery = "", hiddenFieldIds = [], sortConfig = null, onAddingRowChange, bulkAddRef }: TableGridProps) {
  const utils = api.useUtils();

  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const { data: table, isLoading: isLoadingMeta } = api.table.getById.useQuery(
    { id: tableId },
  );
  const totalRowCount = table?._count?.rows ?? 0;

  const PAGE_SIZE = 500;
  const {
    data: rowsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingRows,
  } = api.table.getRows.useInfiniteQuery(
    {
      tableId,
      limit: PAGE_SIZE,
      filterGroup: filterGroup ?? createEmptyFilterGroup(),
      search: debouncedSearch,
    },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const invalidateAll = useCallback(() => {
    void utils.table.getRows.invalidate({ tableId });
    void utils.table.getById.invalidate({ id: tableId });
  }, [utils, tableId]);

  const [pendingEdits, setPendingEdits] = useState<Record<string, string>>({});

  const rowsQueryInput = useMemo(() => ({
    tableId,
    limit: PAGE_SIZE,
    filterGroup: filterGroup ?? createEmptyFilterGroup(),
    search: debouncedSearch,
  }), [tableId, filterGroup, debouncedSearch]);

  const updateCell = api.table.updateCell.useMutation({
    onMutate: async (variables) => {
      await utils.table.getRows.cancel(rowsQueryInput);
      const previousRows = utils.table.getRows.getInfiniteData(rowsQueryInput);
      utils.table.getRows.setInfiniteData(rowsQueryInput, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            rows: page.rows.map((row) =>
              row.id === variables.rowId
                ? {
                    ...row,
                    cells: row.cells.map((cell) =>
                      cell.columnId === variables.columnId
                        ? { ...cell, cellValue: variables.cellValue }
                        : cell,
                    ),
                  }
                : row,
            ),
          })),
        };
      });
      return { previousRows };
    },
    onSuccess: (_, variables) => {
      const key = `${variables.rowId}_${variables.columnId}`;
      setPendingEdits((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    onError: (_, variables, context) => {
      const key = `${variables.rowId}_${variables.columnId}`;
      setPendingEdits((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      if (context?.previousRows !== undefined) {
        utils.table.getRows.setInfiniteData(rowsQueryInput, context.previousRows);
      }
    },
    onSettled: () => {
      void utils.table.getRows.invalidate({ tableId });
    },
  });

  const addBulkRowsBatch = api.table.addBulkRowsBatch.useMutation();
  const [bulkProgress, setBulkProgress] = useState(0);
  const [isBulkAdding, setIsBulkAdding] = useState(false);
  const [bulkStartTime, setBulkStartTime] = useState<number | null>(null);
  const [bulkElapsed, setBulkElapsed] = useState<number>(0);
  const [bulkFinishTime, setBulkFinishTime] = useState<number | null>(null);
  const bulkTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Live elapsed time ticker
  useEffect(() => {
    if (bulkStartTime && isBulkAdding) {
      bulkTimerRef.current = setInterval(() => {
        setBulkElapsed(Date.now() - bulkStartTime);
      }, 100);
    }
    return () => {
      if (bulkTimerRef.current) clearInterval(bulkTimerRef.current);
    };
  }, [bulkStartTime, isBulkAdding]);
  // Only store a 2000-row pool; track the full 100k count separately
  const BULK_POOL_SIZE = 2000;
  const [bulkRowPool, setBulkRowPool] = useState<FlatRow[]>([]);
  const [bulkVirtualCount, setBulkVirtualCount] = useState(0);

  const addBulkRows = useCallback(async () => {
    if (isBulkAdding || !table) return;
    const TOTAL = 100_000;
    const BATCH_SIZE = 5000;
    const CONCURRENCY = 6;
    const cols = table.columns;

    const startTime = Date.now();
    setIsBulkAdding(true);
    setBulkProgress(0);
    setBulkFinishTime(null);
    setBulkStartTime(startTime);
    setBulkElapsed(0);

    // --- Step 1: Generate a small pool and set virtual count to 100k ---
    const firstNames = ["Alex", "Jordan", "Sam", "Riley", "Morgan", "Quinn", "Avery", "Blake", "Casey", "Drew", "Taylor", "Reese", "Jamie", "Dakota", "Hayden", "Emery", "Rowan", "Sage", "Finley", "Skyler"];
    const lastNames = ["Kim", "Lee", "Chen", "Park", "Xu", "Wu", "Li", "Cho", "Tan", "Ng", "Zhang", "Liu", "Wang", "Yang", "Huang", "Lin", "Sun", "Ma", "Zhao", "Zhou"];

    const makeFake = (ft: string) => {
      if (ft === "NUMBER") return String(Math.floor(Math.random() * 100000));
      if (ft === "CHECKBOX") return Math.random() > 0.5 ? "true" : "false";
      return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    };

    const pool: FlatRow[] = Array.from<FlatRow>({ length: BULK_POOL_SIZE });
    for (let i = 0; i < BULK_POOL_SIZE; i++) {
      const row: FlatRow = { _rowId: `local-${i}` };
      for (const col of cols) {
        row[col.id] = makeFake(col.fieldType);
      }
      pool[i] = row;
    }
    setBulkRowPool(pool);
    setBulkVirtualCount(TOTAL);

    // --- Step 2: Background sync to DB in batches ---
    const startOrder = totalRowCount ?? 0;
    const batches: { batchSize: number; startOrder: number }[] = [];
    for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
      batches.push({
        batchSize: Math.min(BATCH_SIZE, TOTAL - i),
        startOrder: startOrder + i,
      });
    }

    let completed = 0;
    const runBatch = async (batch: (typeof batches)[0]) => {
      await addBulkRowsBatch.mutateAsync({
        tableId,
        batchSize: batch.batchSize,
        startOrder: batch.startOrder,
      });
      completed += batch.batchSize;
      setBulkProgress(Math.round((completed / TOTAL) * 100));
    };

    const queue = [...batches];
    const workers = Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length > 0) {
        const batch = queue.shift()!;
        await runBatch(batch);
      }
    });

    try {
      await Promise.all(workers);
    } catch (err) {
      console.error("Bulk insert error:", err);
    }

    // --- Step 3: Swap local rows for real DB data ---
    if (bulkTimerRef.current) clearInterval(bulkTimerRef.current);
    setBulkElapsed(Date.now() - startTime);
    setBulkFinishTime(Date.now());
    setBulkProgress(100);

    // Wait for DB count to update before clearing bulk virtual rows
    // so the virtualizer count doesn't briefly drop to just the old DB count
    await utils.table.getById.invalidate({ id: tableId });
    await utils.table.getRows.invalidate({ tableId });

    setBulkRowPool([]);
    setBulkVirtualCount(0);
    setIsBulkAdding(false);
    setBulkStartTime(null);
  }, [isBulkAdding, table, tableId, totalRowCount, addBulkRowsBatch, invalidateAll, utils]);

  // Expose addBulkRows to parent via ref
  useEffect(() => {
    if (bulkAddRef) bulkAddRef.current = addBulkRows;
    return () => { if (bulkAddRef) bulkAddRef.current = null; };
  }, [bulkAddRef, addBulkRows]);

  const addRow = api.table.createRow.useMutation({
    onMutate: async () => {
      await utils.table.getRows.cancel(rowsQueryInput);
      const previousRows = utils.table.getRows.getInfiniteData(rowsQueryInput);
      const now = new Date();
      const tempId = `temp-${Date.now()}`;
      const tempRow = {
        id: tempId,
        tableId,
        displayOrder: 0,
        createdById: null as string | null,
        createdAt: now,
        updatedAt: now,
        cells: (table?.columns ?? []).map((col) => ({
          id: `temp-cell-${col.id}`,
          columnId: col.id,
          rowId: tempId,
          cellValue: null as string | null,
          createdAt: now,
          updatedAt: now,
        })),
      };
      utils.table.getRows.setInfiniteData(rowsQueryInput, (old) => {
        if (!old) return old;
        const lastPageIndex = old.pages.length - 1;
        return {
          ...old,
          pages: old.pages.map((page, i) =>
            i === lastPageIndex
              ? { ...page, rows: [...page.rows, tempRow] }
              : page,
          ),
        };
      });
      return { previousRows };
    },
    onSuccess: (newRow, _variables, context) => {
      if (!context) return;
      utils.table.getRows.setInfiniteData(rowsQueryInput, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            rows: page.rows.map((row) =>
              row.id.startsWith("temp-") ? newRow : row,
            ),
          })),
        };
      });
    },
    onError: (_err, _variables, context) => {
      if (context?.previousRows !== undefined) {
        utils.table.getRows.setInfiniteData(rowsQueryInput, context.previousRows);
      }
    },
    onSettled: () => {
      invalidateAll();
    },
  });

  useEffect(() => {
    onAddingRowChange?.(addRow.isPending);
  }, [addRow.isPending, onAddingRowChange]);

  const deleteRow = api.table.deleteRow.useMutation({
    onMutate: async (variables) => {
      await utils.table.getRows.cancel(rowsQueryInput);
      const previousRows = utils.table.getRows.getInfiniteData(rowsQueryInput);
      utils.table.getRows.setInfiniteData(rowsQueryInput, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            rows: page.rows.filter((row) => row.id !== variables.rowId),
          })),
        };
      });
      return { previousRows };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousRows !== undefined) {
        utils.table.getRows.setInfiniteData(rowsQueryInput, context.previousRows);
      }
    },
    onSettled: () => {
      invalidateAll();
    },
  });

  const addColumn = api.table.createColumn.useMutation({
    onMutate: async (variables) => {
      await utils.table.getById.cancel({ id: tableId });
      const previousTable = utils.table.getById.getData({ id: tableId });
      const now = new Date();
      utils.table.getById.setData({ id: tableId }, (old) => {
        if (!old) return old;
        return {
          ...old,
          columns: [
            ...old.columns,
            {
              id: `temp-${Date.now()}`,
              columnName: variables.columnName,
              fieldType: variables.fieldType as FieldType,
              tableId,
              createdAt: now,
              updatedAt: now,
              displayOrder: old.columns.length,
              createdById: null,
            },
          ],
        };
      });
      return { previousTable };
    },
    onError: (_err, _variables, context) => {
      utils.table.getById.setData({ id: tableId }, context?.previousTable);
    },
    onSettled: () => {
      invalidateAll();
    },
  });

  const deleteColumn = api.table.deleteColumn.useMutation({
    onMutate: async (variables) => {
      await utils.table.getById.cancel({ id: tableId });
      const previousTable = utils.table.getById.getData({ id: tableId });
      utils.table.getById.setData({ id: tableId }, (old) => {
        if (!old) return old;
        return {
          ...old,
          columns: old.columns.filter((col) => col.id !== variables.columnId),
        };
      });
      return { previousTable };
    },
    onError: (_err, _variables, context) => {
      utils.table.getById.setData({ id: tableId }, context?.previousTable);
    },
    onSettled: () => {
      invalidateAll();
    },
  });

  const renameColumn = api.table.renameColumn.useMutation({
    onMutate: async (variables) => {
      await utils.table.getById.cancel({ id: tableId });
      const previousTable = utils.table.getById.getData({ id: tableId });
      utils.table.getById.setData({ id: tableId }, (old) => {
        if (!old) return old;
        return {
          ...old,
          columns: old.columns.map((col) =>
            col.id === variables.columnId ? { ...col, columnName: variables.columnName } : col,
          ),
        };
      });
      return { previousTable };
    },
    onError: (_err, _variables, context) => {
      utils.table.getById.setData({ id: tableId }, context?.previousTable);
    },
    onSettled: () => {
      invalidateAll();
    },
    onSuccess: () => {
      setRenamingColumnId(null);
    },
  });

  const reorderRows = api.table.reorderRows.useMutation({
    onMutate: async (variables) => {
      await utils.table.getRows.cancel(rowsQueryInput);
      const previousRows = utils.table.getRows.getInfiniteData(rowsQueryInput);
      /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument */
      utils.table.getRows.setInfiniteData(rowsQueryInput, (old: any) => {
        if (!old) return old;
        const allPageRows: any[] = old.pages.flatMap((p: any) => p.rows);
        const rowMap = new Map(allPageRows.map((r: any) => [r.id, r]));
        const reordered: any[] = variables.rowIds
          .map((id) => rowMap.get(id))
          .filter(Boolean);
        const pageSizes = old.pages.map((p: any) => (p.rows as any[]).length);
        let offset = 0;
        return {
          ...old,
          pages: old.pages.map((page: any, i: number) => {
            const size = pageSizes[i] ?? 0;
            const pageRows = reordered.slice(offset, offset + size);
            offset += size;
            return { ...page, rows: pageRows };
          }),
        };
      });
      /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument */
      return { previousRows };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousRows) {
        utils.table.getRows.setInfiniteData(rowsQueryInput, context.previousRows);
      }
    },
    onSettled: () => { invalidateAll(); },
  });

  const reorderColumns = api.table.reorderColumns.useMutation({
    onMutate: async (variables) => {
      await utils.table.getById.cancel({ id: tableId });
      const previousTable = utils.table.getById.getData({ id: tableId });
      utils.table.getById.setData({ id: tableId }, (old) => {
        if (!old) return old;
        const colMap = new Map(old.columns.map((c) => [c.id, c]));
        const reordered = variables.columnIds
          .map((id) => colMap.get(id))
          .filter(Boolean) as typeof old.columns;
        return { ...old, columns: reordered };
      });
      return { previousTable };
    },
    onError: (_err, _variables, context) => {
      utils.table.getById.setData({ id: tableId }, context?.previousTable);
    },
    onSettled: () => { invalidateAll(); },
  });

  const [showColumnForm, setShowColumnForm] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [newFieldType, setNewFieldType] = useState<
    "TEXT" | "NUMBER" | "CHECKBOX"
  >("TEXT");
  const [columnMenuId, setColumnMenuId] = useState<string | null>(null);
  const [renamingColumnId, setRenamingColumnId] = useState<string | null>(null);
  const [focusedCell, setFocusedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [rowContextMenu, setRowContextMenu] = useState<{
    rowId: string;
    x: number;
    y: number;
  } | null>(null);
  const rowContextMenuRef = useRef<HTMLDivElement>(null);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  // Edit field modal (double-click column header)
  const [editFieldId, setEditFieldId] = useState<string | null>(null);
  const [editFieldName, setEditFieldName] = useState("");
  const [editFieldType, setEditFieldType] = useState<"TEXT" | "NUMBER" | "CHECKBOX">("TEXT");
  const [editFieldAnchor, setEditFieldAnchor] = useState<{ top: number; left: number } | null>(null);

  // Drag-and-drop row reordering
  const [dragRowId, setDragRowId] = useState<string | null>(null);
  const [dropRowTargetId, setDropRowTargetId] = useState<string | null>(null);

  // Drag-and-drop column reordering
  const [dragColId, setDragColId] = useState<string | null>(null);
  const [dropColTargetId, setDropColTargetId] = useState<string | null>(null);

  const parentRef = useRef<HTMLDivElement>(null);

  // Column widths (resizable)
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const resizingRef = useRef<{ colId: string; startX: number; startW: number } | null>(null);

  const getColWidth = useCallback(
    (colId: string) => columnWidths[colId] ?? DEFAULT_COL_WIDTH,
    [columnWidths],
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!resizingRef.current) return;
      const { colId, startX, startW } = resizingRef.current;
      const newW = Math.max(MIN_COL_WIDTH, startW + (e.clientX - startX));
      setColumnWidths((prev) => ({ ...prev, [colId]: newW }));
    };
    const onMouseUp = () => {
      if (resizingRef.current) {
        resizingRef.current = null;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  useEffect(() => {
    if (!rowContextMenu) return;
    const handler = (e: MouseEvent) => {
      if (rowContextMenuRef.current && !rowContextMenuRef.current.contains(e.target as Node)) {
        setRowContextMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [rowContextMenu]);

  // Global Esc closes all open menus / modals in this component
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setColumnMenuId(null);
      setRowContextMenu(null);
      setExpandedRowId(null);
      setEditFieldId(null);
      setEditFieldAnchor(null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const startResize = useCallback(
    (colId: string, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      resizingRef.current = {
        colId,
        startX: e.clientX,
        startW: getColWidth(colId),
      };
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    },
    [getColWidth],
  );

  const allDbColumns = useMemo(() => table?.columns ?? [], [table?.columns]);
  const dbColumns = useMemo(
    () => allDbColumns.filter((col) => !hiddenFieldIds.includes(col.id)),
    [allDbColumns, hiddenFieldIds],
  );

  const allRows = useMemo(
    () => rowsData?.pages.flatMap((page) => page.rows) ?? [],
    [rowsData],
  );

  const unsortedFlatData: FlatRow[] = useMemo(() => {
    type RowWithCells = { id: string; cells: { columnId: string; cellValue: string | null }[] };
    const rows = (allRows as RowWithCells[]).map((row) => {
      const flat: FlatRow = { _rowId: row.id };
      for (const cell of row.cells) {
        flat[cell.columnId] = cell.cellValue ?? "";
      }
      return flat;
    });

    if (!groupByColumnId) return rows;

    // Group rows by the selected column
    const groups = new Map<string, FlatRow[]>();
    for (const row of rows) {
      const groupValue = String(row[groupByColumnId] ?? "(empty)");
      if (!groups.has(groupValue)) {
        groups.set(groupValue, []);
      }
      groups.get(groupValue)!.push(row);
    }

    // Sort groups alphabetically and flatten with headers
    const sortedGroups = Array.from(groups.entries()).sort((a, b) =>
      a[0].localeCompare(b[0])
    );

    const result: FlatRow[] = [];
    for (const [groupValue, groupRows] of sortedGroups) {
      // Add group header row
      result.push({
        _rowId: `group-header-${groupValue}`,
        _isGroupHeader: true,
        _groupValue: groupValue,
      });
      // Add all rows in this group
      result.push(...groupRows.map(row => ({ ...row, _groupValue: groupValue })));
    }

    return result;
  }, [allRows, groupByColumnId]);

  const flatData = useMemo(() => {
    if (!sortConfig) return unsortedFlatData;
    const col = allDbColumns.find((c) => c.id === sortConfig.columnId);
    if (!col) return unsortedFlatData;

    return [...unsortedFlatData].sort((a, b) => {
      // Keep group header rows in place
      if (a._isGroupHeader || b._isGroupHeader) return 0;

      const aVal = String(a[sortConfig.columnId] ?? "");
      const bVal = String(b[sortConfig.columnId] ?? "");

      let cmp: number;
      if (col.fieldType === "NUMBER") {
        cmp = (parseFloat(aVal) || 0) - (parseFloat(bVal) || 0);
      } else {
        cmp = aVal.localeCompare(bVal, undefined, { sensitivity: "base" });
      }
      return sortConfig.direction === "asc" ? cmp : -cmp;
    });
  }, [unsortedFlatData, sortConfig, allDbColumns]);

  const navigateCell = useCallback(
    (direction: "up" | "down" | "left" | "right") => {
      setFocusedCell((prev) => {
        if (!prev) return { row: 0, col: 0 };

        const rowCount = flatData.length;
        const colCount = dbColumns.length;

        if (rowCount === 0 || colCount === 0) return prev;

        let { row, col } = prev;

        switch (direction) {
          case "up":
            row = Math.max(0, row - 1);
            break;
          case "down":
            row = Math.min(rowCount - 1, row + 1);
            break;
          case "left":
            if (col > 0) {
              col = col - 1;
            } else if (row > 0) {
              row = row - 1;
              col = colCount - 1;
            }
            break;
          case "right":
            if (col < colCount - 1) {
              col = col + 1;
            } else if (row < rowCount - 1) {
              row = row + 1;
              col = 0;
            }
            break;
        }

        return { row, col };
      });
    },
    [flatData.length, dbColumns.length],
  );

  const tanstackColumns: ColumnDef<FlatRow, string>[] = useMemo(() => {
    const helper = createColumnHelper<FlatRow>();

    return dbColumns.map((col, colIndex) =>
      helper.accessor((row) => row[col.id] ?? "", {
        id: col.id,
        header: () => (
          <div className="flex items-center justify-between group/header">
            {renamingColumnId === col.id ? (
              <ColumnRenameInput
                initialValue={col.columnName}
                onCommit={(name) => renameColumn.mutate({ columnId: col.id, columnName: name })}
                onCancel={() => setRenamingColumnId(null)}
              />
            ) : (
              <div className="flex items-center gap-1.5">
                {FIELD_TYPE_ICONS[col.fieldType]}
                <span className="truncate text-[13px] font-medium leading-[19.5px] text-airtable-text-primary">
                  {col.columnName}
                </span>
              </div>
            )}
            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setColumnMenuId(columnMenuId === col.id ? null : col.id);
                }}
                className="rounded p-0.5 opacity-0 hover:bg-gray-200 group-hover/header:opacity-100"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </button>
              {columnMenuId === col.id && (
                <ul
                  role="menu"
                  className="absolute left-0 top-full z-20 mt-1 bg-white"
                  style={{
                    width: 320,
                    borderRadius: 6,
                    boxShadow: "0px 0px 1px rgba(0,0,0,0.24), 0px 0px 2px rgba(0,0,0,0.16), 0px 3px 4px rgba(0,0,0,0.06), 0px 6px 8px rgba(0,0,0,0.06), 0px 12px 16px rgba(0,0,0,0.08), 0px 18px 32px rgba(0,0,0,0.06)",
                    fontFamily: "-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
                    fontSize: 13,
                    lineHeight: "18px",
                    fontWeight: 400,
                    color: "rgb(29, 31, 37)",
                    padding: "8px",
                  }}
                >
                  {/* Edit field → triggers rename */}
                  <li
                    role="menuitem"
                    onClick={(e) => { e.stopPropagation(); setRenamingColumnId(col.id); setColumnMenuId(null); }}
                    className="flex w-full cursor-pointer items-center gap-2 rounded-[3px] px-2 py-2 hover:bg-[rgba(0,0,0,0.05)]"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="flex-none" style={{ shapeRendering: "geometricPrecision" }}><path d="M11 2l3 3-8 8H3v-3L11 2z" /></svg>
                    <span className="flex-auto truncate select-none">Edit field</span>
                  </li>
                  {/* Duplicate field */}
                  <li role="menuitem" className="flex w-full cursor-pointer items-center gap-2 rounded-[3px] px-2 py-2 hover:bg-[rgba(0,0,0,0.05)]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="flex-none" style={{ shapeRendering: "geometricPrecision" }}><rect x="5" y="5" width="9" height="9" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M2 11V2h9" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                    <span className="flex-auto truncate select-none">Duplicate field</span>
                  </li>
                  {/* Insert left */}
                  <li
                    role="menuitem"
                    className={`flex w-full items-center gap-2 rounded-[3px] px-2 py-2 ${colIndex === 0 ? "cursor-default text-[rgb(151,154,160)]" : "cursor-pointer hover:bg-[rgba(0,0,0,0.05)]"}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="flex-none" style={{ shapeRendering: "geometricPrecision" }}><path d="M7 4H2m0 0l3-3M2 4l3 3M14 8H6M14 12H6" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                    <span className="flex-auto truncate select-none">Insert left</span>
                  </li>
                  {/* Insert right */}
                  <li role="menuitem" className="flex w-full cursor-pointer items-center gap-2 rounded-[3px] px-2 py-2 hover:bg-[rgba(0,0,0,0.05)]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="flex-none" style={{ shapeRendering: "geometricPrecision" }}><path d="M9 4h5m0 0l-3-3m3 3l-3 3M2 8h8M2 12h8" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                    <span className="flex-auto truncate select-none">Insert right</span>
                  </li>
                  {/* Change primary field */}
                  <li role="menuitem" className="flex w-full cursor-pointer items-center gap-2 rounded-[3px] px-2 py-2 hover:bg-[rgba(0,0,0,0.05)]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="flex-none" style={{ shapeRendering: "geometricPrecision" }}><path d="M2 8h12M9 4l5 4-5 4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                    <span className="flex-auto truncate select-none">Change primary field</span>
                  </li>

                  <li className="my-2 border-t" style={{ borderColor: "rgba(0,0,0,0.1)" }} />

                  {/* Copy field URL */}
                  <li role="menuitem" className="flex w-full cursor-pointer items-center gap-2 rounded-[3px] px-2 py-2 hover:bg-[rgba(0,0,0,0.05)]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="flex-none" style={{ shapeRendering: "geometricPrecision" }}><path d="M6.5 9.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5L7 4" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M9.5 6.5a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5L9 12" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                    <span className="flex-auto truncate select-none">Copy field URL</span>
                  </li>
                  {/* Edit field description */}
                  <li role="menuitem" className="flex w-full cursor-pointer items-center gap-2 rounded-[3px] px-2 py-2 hover:bg-[rgba(0,0,0,0.05)]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="flex-none" style={{ shapeRendering: "geometricPrecision" }}><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M8 7v4" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="8" cy="5" r="0.75" /></svg>
                    <span className="flex-auto truncate select-none">Edit field description</span>
                  </li>
                  {/* Edit field permissions */}
                  <li role="menuitem" className="flex w-full cursor-pointer items-center gap-2 rounded-[3px] px-2 py-2 hover:bg-[rgba(0,0,0,0.05)]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="flex-none" style={{ shapeRendering: "geometricPrecision" }}><rect x="3" y="7" width="10" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M5 7V5a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                    <span className="flex-auto truncate select-none">Edit field permissions</span>
                  </li>

                  <li className="my-2 border-t" style={{ borderColor: "rgba(0,0,0,0.1)" }} />

                  {/* Sort A → Z */}
                  <li role="menuitem" className="flex w-full cursor-pointer items-center gap-2 rounded-[3px] px-2 py-2 hover:bg-[rgba(0,0,0,0.05)]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="flex-none" style={{ shapeRendering: "geometricPrecision" }}><path d="M2 4h8M2 8h6M2 12h4M11 3v10M8 10l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                    <span className="flex-auto truncate select-none">Sort A → Z</span>
                  </li>
                  {/* Sort Z → A */}
                  <li role="menuitem" className="flex w-full cursor-pointer items-center gap-2 rounded-[3px] px-2 py-2 hover:bg-[rgba(0,0,0,0.05)]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="flex-none" style={{ shapeRendering: "geometricPrecision" }}><path d="M2 4h8M2 8h6M2 12h4M11 13V3M8 6l3-3 3 3" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                    <span className="flex-auto truncate select-none">Sort Z → A</span>
                  </li>

                  <li className="my-2 border-t" style={{ borderColor: "rgba(0,0,0,0.1)" }} />

                  {/* Filter by this field */}
                  <li role="menuitem" className="flex w-full cursor-pointer items-center gap-2 rounded-[3px] px-2 py-2 hover:bg-[rgba(0,0,0,0.05)]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="flex-none" style={{ shapeRendering: "geometricPrecision" }}><path d="M2 4h12M4 8h8M6 12h4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                    <span className="flex-auto truncate select-none">Filter by this field</span>
                  </li>
                  {/* Group by this field */}
                  <li role="menuitem" className="flex w-full cursor-pointer items-center gap-2 rounded-[3px] px-2 py-2 hover:bg-[rgba(0,0,0,0.05)]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="flex-none" style={{ shapeRendering: "geometricPrecision" }}><rect x="1" y="2" width="14" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" /><rect x="1" y="10" width="14" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                    <span className="flex-auto truncate select-none">Group by this field</span>
                  </li>
                  {/* Show dependencies */}
                  <li role="menuitem" className="flex w-full cursor-pointer items-center gap-2 rounded-[3px] px-2 py-2 hover:bg-[rgba(0,0,0,0.05)]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="flex-none" style={{ shapeRendering: "geometricPrecision" }}><rect x="1" y="2" width="5" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" /><rect x="10" y="9" width="5" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M6 4.5h2a2 2 0 0 1 2 2v2" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M9 7l1.5 1.5L9 10" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                    <span className="flex-auto truncate select-none">Show dependencies</span>
                  </li>

                  <li className="my-2 border-t" style={{ borderColor: "rgba(0,0,0,0.1)" }} />

                  {/* Hide field */}
                  <li
                    role="menuitem"
                    className={`flex w-full items-center gap-2 rounded-[3px] px-2 py-2 ${colIndex === 0 ? "cursor-default text-[rgb(151,154,160)]" : "cursor-pointer hover:bg-[rgba(0,0,0,0.05)]"}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="flex-none" style={{ shapeRendering: "geometricPrecision" }}><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" /><line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" /></svg>
                    <span className="flex-auto truncate select-none">Hide field</span>
                  </li>
                  {/* Delete field — functional */}
                  <li
                    role="menuitem"
                    onClick={(e) => { e.stopPropagation(); deleteColumn.mutate({ columnId: col.id }); setColumnMenuId(null); }}
                    className="flex w-full cursor-pointer items-center gap-2 rounded-[3px] px-2 py-2 hover:bg-[rgba(0,0,0,0.05)]"
                    style={{ color: "rgb(177, 15, 65)" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="flex-none" style={{ shapeRendering: "geometricPrecision" }}><path d="M2 4h12M5.5 4V2.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V4M6.5 7v5M9.5 7v5M3.5 4l.5 9.5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1L12.5 4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                    <span className="ml-1 flex-auto truncate select-none">Delete field</span>
                  </li>
                </ul>
              )}
            </div>
          </div>
        ),
        cell: (info) => info.getValue(),
      }),
    );
  }, [dbColumns, columnMenuId, deleteColumn, renamingColumnId, renameColumn]);

  const reactTable = useReactTable({
    data: flatData,
    columns: tanstackColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows: tableRows } = reactTable.getRowModel();

  // Virtualizer count: real DB total + any bulk virtual rows being inserted
  const virtualRowCount = totalRowCount + bulkVirtualCount;
  // How many rows we actually have loaded data for
  const loadedRowCount = tableRows.length;

  const rowVirtualizer = useVirtualizer({
    count: virtualRowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 20,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  // Auto-fetch next page when scrolling near the end of loaded data
  useEffect(() => {
    const lastItem = virtualRows.at(-1);
    if (!lastItem) return;

    if (
      lastItem.index >= loadedRowCount - 30 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      void fetchNextPage();
    }
  }, [virtualRows, loadedRowCount, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoadingMeta || isLoadingRows) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-airtable-text-muted">
        Loading table...
      </div>
    );
  }

  if (!table) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-airtable-text-muted">
        Table not found
      </div>
    );
  }

  const paddingTop =
    virtualRows.length > 0 ? virtualRows[0]!.start : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? rowVirtualizer.getTotalSize() - virtualRows.at(-1)!.end
      : 0;

  return (
    <div
      className="flex min-h-0 flex-1 flex-col"
      onClick={() => setColumnMenuId(null)}
    >
      <div
        ref={parentRef}
        className="min-h-0 flex-1 overflow-auto"
      >
        <div className="flex min-h-full flex-col">
        <table className="border-collapse" style={{ tableLayout: "fixed", width: "max-content", minWidth: "100%" }}>
          <thead className="sticky top-0 z-10">
            {reactTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {/* Row-number gutter header (checkbox) */}
                <th
                  className="sticky left-0 z-[3] border-b border-r border-airtable-border bg-white p-0"
                  style={{ width: ROW_NUM_WIDTH, minWidth: ROW_NUM_WIDTH, height: ROW_HEIGHT }}
                >
                  <div className="flex h-full items-center justify-center">
                    <input
                      type="checkbox"
                      className="h-[14px] w-[14px] cursor-pointer rounded-sm border-[#d0d5dd] text-airtable-blue focus:ring-airtable-blue focus:ring-offset-0"
                    />
                  </div>
                </th>
                {headerGroup.headers.map((header, hIdx) => {
                  const colId = header.column.id;
                  const isFrozen = hIdx === 0;
                  return (
                    <th
                      key={header.id}
                      onDoubleClick={(e) => {
                        const col = dbColumns.find((c) => c.id === colId);
                        if (!col) return;
                        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                        setEditFieldAnchor({ top: rect.bottom, left: rect.left });
                        setEditFieldName(col.columnName);
                        setEditFieldType(col.fieldType as "TEXT" | "NUMBER" | "CHECKBOX");
                        setEditFieldId(col.id);
                        setColumnMenuId(null);
                      }}
                      draggable={!isFrozen}
                      onDragStart={(e) => {
                        if (isFrozen) { e.preventDefault(); return; }
                        setDragColId(colId);
                        e.dataTransfer.effectAllowed = "move";
                        e.dataTransfer.setData("text/plain", colId);
                      }}
                      onDragEnd={() => {
                        setDragColId(null);
                        setDropColTargetId(null);
                      }}
                      onDragOver={(e) => {
                        if (!dragColId || colId === dragColId) return;
                        e.preventDefault();
                        setDropColTargetId(colId);
                      }}
                      onDragLeave={() => setDropColTargetId(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (!dragColId || dragColId === colId) {
                          setDragColId(null);
                          setDropColTargetId(null);
                          return;
                        }
                        // Reorder all columns (including hidden ones)
                        const ids = allDbColumns.map((c) => c.id);
                        const fromIdx = ids.indexOf(dragColId);
                        const toIdx = ids.indexOf(colId);
                        if (fromIdx === -1 || toIdx === -1) return;
                        ids.splice(fromIdx, 1);
                        ids.splice(toIdx, 0, dragColId);
                        reorderColumns.mutate({ tableId: table.id, columnIds: ids });
                        setDragColId(null);
                        setDropColTargetId(null);
                      }}
                      className={`group relative border-b border-r border-airtable-border bg-white px-2 text-left text-[13px] hover:bg-[#f8f8f8] ${
                        isFrozen ? "sticky z-[3]" : "cursor-grab"
                      } ${dragColId === colId ? "opacity-40" : ""} ${dropColTargetId === colId ? "border-l-2 border-l-airtable-blue" : ""}`}
                      style={{
                        height: ROW_HEIGHT,
                        width: getColWidth(colId),
                        minWidth: MIN_COL_WIDTH,
                        ...(isFrozen ? { left: ROW_NUM_WIDTH } : {}),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {/* Resize handle */}
                      <div
                        onMouseDown={(e) => startResize(colId, e)}
                        className="absolute right-0 top-0 z-[4] h-full w-[5px] cursor-col-resize hover:bg-airtable-blue/40"
                      />
                      {/* Freeze line — thick blue right-border on the frozen column */}
                      {isFrozen && (
                        <div className="pointer-events-none absolute right-0 top-0 h-full w-[2px] bg-[#c5c5c5]" />
                      )}
                    </th>
                  );
                })}
                {/* Add-column header */}
                <th className="w-[72px] min-w-[72px] border-b border-airtable-border bg-white p-0">
                  {showColumnForm ? (
                    <form
                      className="flex items-center gap-1 px-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!newColumnName.trim()) return;
                        addColumn.mutate({
                          tableId: table.id,
                          columnName: newColumnName.trim(),
                          fieldType: newFieldType,
                        });
                        setNewColumnName("");
                        setShowColumnForm(false);
                      }}
                    >
                      <input
                        autoFocus
                        type="text"
                        placeholder="Field name"
                        className="w-20 rounded border border-gray-300 px-2 py-1 text-[12px] outline-none focus:border-airtable-blue"
                        value={newColumnName}
                        onChange={(e) => setNewColumnName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") setShowColumnForm(false);
                        }}
                      />
                      <select
                        className="rounded border border-gray-300 px-1 py-1 text-[11px] outline-none"
                        value={newFieldType}
                        onChange={(e) =>
                          setNewFieldType(
                            e.target.value as typeof newFieldType,
                          )
                        }
                      >
                        <option value="TEXT">Text</option>
                        <option value="NUMBER">Number</option>
                        <option value="CHECKBOX">Checkbox</option>
                      </select>
                    </form>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <button
                        onClick={() => setShowColumnForm(true)}
                        className="text-[#d0d5dd] hover:text-airtable-blue"
                        title="Add field"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <line x1="8" y1="3" x2="8" y2="13" />
                          <line x1="3" y1="8" x2="13" y2="8" />
                        </svg>
                      </button>
                    </div>
                  )}
                </th>
              </tr>
            ))}
          </thead>
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {(() => {
              let dataRowNum = 0;
              const poolLen = bulkRowPool.length;
              return virtualRows.map((virtualRow) => {
                const idx = virtualRow.index;

                // --- CASE 1: Beyond loaded DB data → bulk pool or skeleton ---
                if (idx >= loadedRowCount) {
                  const bulkOffset = idx - loadedRowCount;

                  // If bulk pool exists, cycle through it
                  if (poolLen > 0) {
                    const poolRow = bulkRowPool[bulkOffset % poolLen]!;
                    return (
                      <tr
                        key={`bulk-${idx}`}
                        data-index={idx}
                        ref={rowVirtualizer.measureElement}
                        style={{ height: `${ROW_HEIGHT}px` }}
                      >
                        <td
                          className="sticky left-0 z-[1] border-b border-r border-airtable-border bg-white p-0 text-center text-[11px] text-airtable-text-secondary"
                          style={{ width: ROW_NUM_WIDTH, minWidth: ROW_NUM_WIDTH }}
                        >
                          {idx + 1}
                        </td>
                        {dbColumns.map((col) => (
                          <td
                            key={col.id}
                            className="border-b border-r border-airtable-border p-0"
                            style={{ width: getColWidth(col.id), minWidth: MIN_COL_WIDTH, height: ROW_HEIGHT }}
                          >
                            <div className="flex h-full items-center text-[13px] leading-[19.5px] text-airtable-text-primary" style={{ padding: "0 6px" }}>
                              <span className="truncate">{String(poolRow[col.id] ?? "")}</span>
                            </div>
                          </td>
                        ))}
                        <td className="border-b border-airtable-border" />
                      </tr>
                    );
                  }

                  // Otherwise skeleton placeholder
                  return (
                    <tr
                      key={`skeleton-${idx}`}
                      data-index={idx}
                      ref={rowVirtualizer.measureElement}
                      style={{ height: `${ROW_HEIGHT}px` }}
                    >
                      <td
                        className="sticky left-0 z-[1] border-b border-r border-airtable-border bg-white p-0 text-center text-[11px] text-airtable-text-secondary"
                        style={{ width: ROW_NUM_WIDTH, minWidth: ROW_NUM_WIDTH }}
                      >
                        {idx + 1}
                      </td>
                      {dbColumns.map((col) => (
                        <td
                          key={col.id}
                          className="border-b border-r border-airtable-border p-0"
                          style={{ width: getColWidth(col.id), minWidth: MIN_COL_WIDTH, height: ROW_HEIGHT }}
                        >
                          <div className="mx-1.5 my-2 h-3 animate-pulse rounded bg-gray-100" />
                        </td>
                      ))}
                      <td className="border-b border-airtable-border" />
                    </tr>
                  );
                }

                // --- CASE 2: Loaded DB data row ---
                const row = tableRows[idx]!;
                const isGroupHeader = row.original._isGroupHeader;

                // Render group header row
                if (isGroupHeader) {
                  const groupValue = row.original._groupValue ?? "(empty)";
                  const groupRowCount = flatData.filter(
                    (r) => !r._isGroupHeader && r._groupValue === groupValue
                  ).length;

                  return (
                    <tr
                      key={row.id}
                      data-index={virtualRow.index}
                      ref={rowVirtualizer.measureElement}
                      className="bg-purple-50"
                      style={{ height: `${ROW_HEIGHT}px` }}
                    >
                      <td
                        colSpan={dbColumns.length + 2}
                        className="border-b border-airtable-border px-3 py-1"
                      >
                        <div className="flex items-center gap-2">
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-600">
                            <rect x="1" y="2" width="6" height="5" rx="1" />
                            <rect x="1" y="9" width="6" height="5" rx="1" />
                            <path d="M9 4.5h5M9 11.5h5" />
                          </svg>
                          <span className="text-[13px] font-medium text-purple-700">
                            {groupValue}
                          </span>
                          <span className="text-[12px] text-purple-500">
                            ({groupRowCount} record{groupRowCount !== 1 ? "s" : ""})
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                }

                dataRowNum++;
                const displayRowNum = dataRowNum;
                const rowIdx = virtualRow.index;

                return (
                  <tr
                    key={row.id}
                    data-index={virtualRow.index}
                    ref={rowVirtualizer.measureElement}
                    className={`group ${dragRowId === row.original._rowId ? "opacity-40" : ""} ${dropRowTargetId === row.original._rowId ? "border-t-2 border-t-airtable-blue" : ""}`}
                    style={{ height: `${ROW_HEIGHT}px` }}
                    onDragOver={(e) => {
                      if (!dragRowId || row.original._isGroupHeader) return;
                      e.preventDefault();
                      setDropRowTargetId(row.original._rowId);
                    }}
                    onDragLeave={() => setDropRowTargetId(null)}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (!dragRowId || dragRowId === row.original._rowId) {
                        setDragRowId(null);
                        setDropRowTargetId(null);
                        return;
                      }
                      const nonGroupRows = flatData.filter((r) => !r._isGroupHeader);
                      const ids = nonGroupRows.map((r) => r._rowId);
                      const fromIdx = ids.indexOf(dragRowId);
                      const toIdx = ids.indexOf(row.original._rowId);
                      if (fromIdx === -1 || toIdx === -1) return;
                      ids.splice(fromIdx, 1);
                      ids.splice(toIdx, 0, dragRowId);
                      reorderRows.mutate({ tableId: table.id, rowIds: ids });
                      setDragRowId(null);
                      setDropRowTargetId(null);
                    }}
                  >
                    {/* Row number / drag + checkbox + expand gutter */}
                    <td
                      className="sticky left-0 z-[1] border-b border-r border-airtable-border bg-white p-0 text-center text-[11px] text-airtable-text-secondary"
                      style={{ width: ROW_NUM_WIDTH, minWidth: ROW_NUM_WIDTH }}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setRowContextMenu({
                          rowId: row.original._rowId,
                          x: e.clientX,
                          y: e.clientY,
                        });
                      }}
                    >
                      <div className="relative flex h-full items-center justify-center">
                        {/* Row number — hidden on hover */}
                        <span className="group-hover:hidden">{displayRowNum}</span>
                        {/* Hover icons: drag handle, checkbox, expand */}
                        <div className="hidden h-full w-full items-center justify-center gap-0.5 group-hover:flex">
                          {/* Drag handle */}
                          <button
                            type="button"
                            title="Drag to reorder"
                            draggable
                            onDragStart={(e) => {
                              setDragRowId(row.original._rowId);
                              e.dataTransfer.effectAllowed = "move";
                              e.dataTransfer.setData("text/plain", row.original._rowId);
                            }}
                            onDragEnd={() => {
                              setDragRowId(null);
                              setDropRowTargetId(null);
                            }}
                            className="flex cursor-grab items-center justify-center rounded p-0.5 text-[#c0c0c0] hover:bg-gray-100 hover:text-gray-500 active:cursor-grabbing"
                          >
                            <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor">
                              <circle cx="3" cy="3" r="1.2" />
                              <circle cx="7" cy="3" r="1.2" />
                              <circle cx="3" cy="7" r="1.2" />
                              <circle cx="7" cy="7" r="1.2" />
                              <circle cx="3" cy="11" r="1.2" />
                              <circle cx="7" cy="11" r="1.2" />
                            </svg>
                          </button>
                          {/* Checkbox */}
                          <div className="flex items-center justify-center">
                            <input
                              type="checkbox"
                              className="h-[14px] w-[14px] cursor-pointer rounded-sm border-[#d0d5dd] text-airtable-blue focus:ring-airtable-blue focus:ring-offset-0"
                            />
                          </div>
                          {/* Expand record */}
                          <button
                            type="button"
                            title="Expand record"
                            onClick={() => setExpandedRowId(row.original._rowId)}
                            className="flex items-center justify-center rounded p-0.5 text-[#c0c0c0] hover:bg-gray-100 hover:text-gray-500"
                          >
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M10 2h4v4M6 14H2v-4M14 2l-5 5M2 14l5-5" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </td>
                    {row.getVisibleCells().map((cell, colIdx) => {
                      const col = dbColumns[colIdx];
                      if (!col) return null;
                      const rowId = row.original._rowId;
                      const editKey = `${rowId}_${col.id}`;
                      const cellValue = pendingEdits[editKey] ?? String(row.original[col.id] ?? "");
                      const isFrozen = colIdx === 0;
                      return (
                        <td
                          key={cell.id}
                          className={`relative h-[32px] border-b border-r border-airtable-border p-0 ${
                            isFrozen ? "sticky z-[1] bg-white" : ""
                          }`}
                          style={{
                            width: getColWidth(col.id),
                            minWidth: MIN_COL_WIDTH,
                            ...(isFrozen ? { left: ROW_NUM_WIDTH } : {}),
                          }}
                        >
                          <CellInput
                            cellValue={cellValue}
                            fieldType={col.fieldType}
                            isFocused={
                              focusedCell?.row === rowIdx &&
                              focusedCell?.col === colIdx
                            }
                            onNavigate={navigateCell}
                            onFocus={() =>
                              setFocusedCell({ row: rowIdx, col: colIdx })
                            }
                            onSave={(val) => {
                              setPendingEdits((prev) => ({ ...prev, [editKey]: val }));
                              updateCell.mutate({
                                rowId,
                                columnId: col.id,
                                cellValue: val,
                              });
                            }}
                          />
                          {/* Freeze line on data cells */}
                          {isFrozen && (
                            <div className="pointer-events-none absolute right-0 top-0 h-full w-[2px] bg-[#c5c5c5]" />
                          )}
                        </td>
                      );
                    })}
                    <td className="border-b border-airtable-border" />
                  </tr>
                );
              });
            })()}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>
        {/* Add row — inline "+" row matching Airtable */}
        <div className="flex h-8 items-center border-b border-airtable-border">
          <button
            onClick={() => addRow.mutate({ tableId: table.id })}
            disabled={addRow.isPending}
            className="sticky left-0 z-[1] flex h-full items-center justify-center border-airtable-border bg-white text-airtable-text-secondary hover:text-airtable-blue"
            style={{ width: ROW_NUM_WIDTH, minWidth: ROW_NUM_WIDTH }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="8" y1="3" x2="8" y2="13" />
              <line x1="3" y1="8" x2="13" y2="8" />
            </svg>
          </button>
        </div>
        {/* Left gutter extending below data */}
        <div className="flex min-h-[200px] flex-1">
          <div
            className="sticky left-0 z-[1] shrink-0 border-airtable-border bg-white"
            style={{ width: ROW_NUM_WIDTH, minWidth: ROW_NUM_WIDTH }}
          />
          <div className="flex-1" />
        </div>
        </div>
      </div>
      {/* Footer - record count + add buttons */}
      <div className="flex shrink-0 items-center border-t border-airtable-border bg-white" style={{ height: 32 }}>
        <div className="flex items-center gap-0.5 px-1">
          <button
            onClick={() => addRow.mutate({ tableId: table.id })}
            className="flex h-6 w-6 items-center justify-center rounded text-airtable-text-secondary hover:bg-[#f2f4f8] hover:text-airtable-blue"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="3" x2="8" y2="13" />
              <line x1="3" y1="8" x2="13" y2="8" />
            </svg>
          </button>
          <button
            onClick={() => { setBulkFinishTime(null); void addBulkRows(); }}
            disabled={isBulkAdding}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-0.5 text-[11px] text-airtable-text-secondary shadow-sm hover:bg-[#f2f4f8] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isBulkAdding ? (
              <>
                <svg className="size-3 animate-spin" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="8" strokeLinecap="round" />
                </svg>
                {bulkProgress}% — {(bulkElapsed / 1000).toFixed(1)}s
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                  <path d="M2 4h12M2 8h12M2 12h8" />
                </svg>
                Add 100k rows
              </>
            )}
          </button>
          {bulkFinishTime && !isBulkAdding && (
            <span className="flex items-center gap-1 text-[11px] text-green-600">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
                <path d="M3 8.5l3 3 7-7" />
              </svg>
              100k rows in {(bulkElapsed / 1000).toFixed(1)}s
            </span>
          )}
        </div>
        <div className="ml-2 text-[11px] text-airtable-text-secondary">
          {totalRowCount + bulkVirtualCount} record{(totalRowCount + bulkVirtualCount) !== 1 ? "s" : ""}{bulkVirtualCount > 0 && ` (syncing ${bulkProgress}%)`}
        </div>
      </div>

      {/* Edit field modal (double-click column header) */}
      {editFieldId && editFieldAnchor && (() => {
        const col = allDbColumns.find((c) => c.id === editFieldId);
        if (!col) return null;
        return (
          <div
            className="fixed inset-0 z-[150]"
            onClick={() => setEditFieldId(null)}
          >
            <div
              className="absolute w-[340px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl"
              style={{ top: editFieldAnchor.top, left: editFieldAnchor.left }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Field name input */}
              <div className="px-4 pt-4 pb-3">
                <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-gray-500">
                  Field name
                </label>
                <input
                  autoFocus
                  value={editFieldName}
                  onChange={(e) => setEditFieldName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Escape") setEditFieldId(null); }}
                  className="w-full rounded border-2 border-airtable-blue bg-[#eef3ff] px-3 py-1.5 text-[14px] text-gray-900 outline-none"
                  style={{ caretColor: "#166ce3" }}
                />
              </div>

              {/* Field type selector */}
              <div className="px-4 pb-3">
                <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-gray-500">
                  Field type
                </label>
                <div className="relative">
                  <select
                    value={editFieldType}
                    onChange={(e) => setEditFieldType(e.target.value as "TEXT" | "NUMBER" | "CHECKBOX")}
                    className="w-full appearance-none rounded border border-gray-200 bg-white px-3 py-2 text-[13px] text-gray-900 outline-none focus:border-airtable-blue"
                  >
                    <option value="TEXT">Text</option>
                    <option value="NUMBER">Number</option>
                    <option value="CHECKBOX">Checkbox</option>
                  </select>
                  <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6l4 4 4-4"/></svg>
                </div>
              </div>

              <div className="mx-4 border-t border-gray-100" />

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-3">
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700"
                  onClick={() => setEditFieldId(null)}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="8" y1="3" x2="8" y2="13"/><line x1="3" y1="8" x2="13" y2="8"/></svg>
                  Add description
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditFieldId(null)}
                    className="rounded px-3 py-1.5 text-[13px] font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!editFieldName.trim()) return;
                      if (editFieldName.trim() !== col.columnName) {
                        renameColumn.mutate({ columnId: editFieldId, columnName: editFieldName.trim() });
                      }
                      setEditFieldId(null);
                    }}
                    className="rounded bg-airtable-blue px-3 py-1.5 text-[13px] font-medium text-white hover:bg-airtable-blue/90"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Expand record modal */}
      {expandedRowId && (() => {
        const rowData = flatData.find((r) => r._rowId === expandedRowId);
        if (!rowData) return null;
        const nonGroupRows = flatData.filter((r) => !r._isGroupHeader);
        const currentIdx = nonGroupRows.findIndex((r) => r._rowId === expandedRowId);
        return (
          <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/50 pt-[40px]" onClick={() => setExpandedRowId(null)}>
            <div
              className="flex h-[calc(100vh-80px)] w-full max-w-[960px] overflow-hidden rounded-md bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main form area */}
              <div className="flex flex-1 flex-col overflow-hidden">
                {/* Modal header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-1 py-1">
                  <div className="flex items-center gap-0.5">
                    {/* Navigate up */}
                    <button
                      type="button"
                      title="Previous record"
                      onClick={() => {
                        if (currentIdx > 0) setExpandedRowId(nonGroupRows[currentIdx - 1]!._rowId);
                      }}
                      disabled={currentIdx <= 0}
                      className="flex h-7 w-7 items-center justify-center rounded text-gray-500 hover:bg-gray-100 disabled:opacity-30"
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 10l4-4 4 4"/></svg>
                    </button>
                    {/* Navigate down */}
                    <button
                      type="button"
                      title="Next record"
                      onClick={() => {
                        if (currentIdx < nonGroupRows.length - 1) setExpandedRowId(nonGroupRows[currentIdx + 1]!._rowId);
                      }}
                      disabled={currentIdx >= nonGroupRows.length - 1}
                      className="flex h-7 w-7 items-center justify-center rounded text-gray-500 hover:bg-gray-100 disabled:opacity-30"
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6l4 4 4-4"/></svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    {/* More menu */}
                    <button type="button" className="flex h-7 w-7 items-center justify-center rounded text-gray-500 hover:bg-gray-100">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="3" cy="8" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="13" cy="8" r="1.5"/></svg>
                    </button>
                    {/* Copy link */}
                    <button type="button" className="flex h-7 w-7 items-center justify-center rounded text-gray-500 hover:bg-gray-100">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6.5 9.5a3 3 0 0 0 4.2.3l2-2a3 3 0 0 0-4.2-4.3l-1.1 1.1"/><path d="M9.5 6.5a3 3 0 0 0-4.2-.3l-2 2a3 3 0 0 0 4.2 4.3l1.1-1.1"/></svg>
                    </button>
                    {/* Comments */}
                    <button type="button" className="flex h-7 w-7 items-center justify-center rounded text-gray-500 hover:bg-gray-100">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H5l-3 3V4a1 1 0 0 1 1-1z"/></svg>
                    </button>
                    {/* Separator */}
                    <div className="mx-0.5 h-5 w-px bg-gray-200" />
                    {/* Close */}
                    <button
                      type="button"
                      title="Close"
                      onClick={() => setExpandedRowId(null)}
                      className="flex h-7 w-7 items-center justify-center rounded text-gray-500 hover:bg-gray-100"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>
                    </button>
                  </div>
                </div>
                {/* Form body */}
                <div className="flex-1 overflow-y-auto px-12 py-6">
                  {allDbColumns.map((col, idx) => {
                    const cellKey = `${expandedRowId}_${col.id}`;
                    const cellValue = pendingEdits[cellKey] ?? String(rowData[col.id] ?? "");
                    const isFirstField = idx === 0;
                    return (
                      <div key={col.id} className={isFirstField ? "mb-6" : "mb-5 flex items-start gap-6"}>
                        {isFirstField ? (
                          <>
                            {/* Primary field label */}
                            <div className="mb-1 flex items-center gap-1.5 text-[11px] text-gray-500">
                              {FIELD_TYPE_ICONS[col.fieldType] ?? FIELD_TYPE_ICONS.TEXT}
                              <span>{col.columnName}</span>
                            </div>
                            {/* Primary field input — large */}
                            <input
                              type="text"
                              placeholder="Start typing..."
                              value={cellValue}
                              onChange={(e) => {
                                const val = e.target.value;
                                setPendingEdits((prev) => ({ ...prev, [cellKey]: val }));
                                updateCell.mutate({ rowId: expandedRowId, columnId: col.id, cellValue: val });
                              }}
                              className="w-full border-b border-gray-200 pb-2 text-[22px] font-normal text-gray-900 placeholder:text-gray-300 focus:border-airtable-blue focus:outline-none"
                            />
                          </>
                        ) : (
                          <>
                            {/* Field label */}
                            <div className="flex w-[140px] shrink-0 items-center gap-1.5 pt-2 text-[13px] text-gray-700">
                              {FIELD_TYPE_ICONS[col.fieldType] ?? FIELD_TYPE_ICONS.TEXT}
                              <span>{col.columnName}</span>
                            </div>
                            {/* Field input */}
                            <div className="flex-1">
                              {col.fieldType === "CHECKBOX" ? (
                                <div className="pt-2">
                                  <input
                                    type="checkbox"
                                    checked={cellValue === "true"}
                                    onChange={(e) => {
                                      const val = e.target.checked ? "true" : "false";
                                      setPendingEdits((prev) => ({ ...prev, [cellKey]: val }));
                                      updateCell.mutate({ rowId: expandedRowId, columnId: col.id, cellValue: val });
                                    }}
                                    className="h-4 w-4 cursor-pointer rounded border-gray-300 text-airtable-blue focus:ring-airtable-blue"
                                  />
                                </div>
                              ) : col.fieldType === "NUMBER" ? (
                                <input
                                  type="text"
                                  value={cellValue}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setPendingEdits((prev) => ({ ...prev, [cellKey]: val }));
                                    updateCell.mutate({ rowId: expandedRowId, columnId: col.id, cellValue: val });
                                  }}
                                  className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-[13px] text-gray-900 focus:border-airtable-blue focus:outline-none focus:ring-1 focus:ring-airtable-blue"
                                />
                              ) : (
                                <textarea
                                  value={cellValue}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setPendingEdits((prev) => ({ ...prev, [cellKey]: val }));
                                    updateCell.mutate({ rowId: expandedRowId, columnId: col.id, cellValue: val });
                                  }}
                                  rows={3}
                                  className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-[13px] text-gray-900 focus:border-airtable-blue focus:outline-none focus:ring-1 focus:ring-airtable-blue"
                                />
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                  {/* Add new field link */}
                  <button className="mt-4 flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="8" y1="3" x2="8" y2="13"/><line x1="3" y1="8" x2="13" y2="8"/></svg>
                    Add new field to this table
                  </button>
                </div>
              </div>

              {/* Right sidebar — comments */}
              <div className="flex w-[320px] shrink-0 flex-col border-l border-gray-200 bg-white">
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
                  <div className="flex items-center gap-1 text-[13px] font-medium text-gray-700">
                    All comments
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6l4 4 4-4"/></svg>
                  </div>
                  <div className="flex items-center gap-1">
                    <button type="button" className="flex h-6 w-6 items-center justify-center rounded text-gray-400 hover:bg-gray-100">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4h12M2 8h8M2 12h10"/></svg>
                    </button>
                    <button type="button" className="flex h-6 w-6 items-center justify-center rounded text-gray-400 hover:bg-gray-100">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6l4 4 4-4"/></svg>
                    </button>
                  </div>
                </div>
                {/* Empty state */}
                <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-3 text-gray-300">
                    <path d="M8 10h32a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H14l-6 6V12a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="17" cy="22" r="2" fill="currentColor"/>
                    <circle cx="24" cy="22" r="2" fill="currentColor"/>
                    <circle cx="31" cy="22" r="2" fill="currentColor"/>
                  </svg>
                  <p className="text-[14px] font-semibold text-gray-800">Start a conversation</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-gray-500">
                    Ask questions, keep track of status updates, and collaborate with your team — directly in Airtable.
                  </p>
                  <button className="mt-4 rounded-full border border-gray-300 px-4 py-1.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50">
                    Invite collaborators
                  </button>
                </div>
                {/* Comment input */}
                <div className="border-t border-gray-200 px-4 py-3">
                  <input
                    type="text"
                    placeholder="Leave a comment"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-[13px] text-gray-500 placeholder:text-gray-400 focus:border-airtable-blue focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Row right-click context menu */}
      {rowContextMenu && (
        <div
          ref={rowContextMenuRef}
          className="fixed z-50 w-56 rounded-lg border border-gray-200 bg-white py-1.5 shadow-lg"
          style={{ top: rowContextMenu.y, left: rowContextMenu.x }}
        >
          {/* Ask Omni */}
          <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
              <circle cx="8" cy="8" r="2" />
              <circle cx="8" cy="2" r="1" />
              <circle cx="8" cy="14" r="1" />
              <circle cx="2" cy="8" r="1" />
              <circle cx="14" cy="8" r="1" />
            </svg>
            Ask Omni
          </button>

          <div className="my-1.5 border-t border-gray-100" />

          {/* Insert record above */}
          <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
              <path d="M8 12V4M5 7l3-3 3 3" />
            </svg>
            Insert record above
          </button>

          {/* Insert record below */}
          <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
              <path d="M8 4v8M5 9l3 3 3-3" />
            </svg>
            Insert record below
          </button>

          <div className="my-1.5 border-t border-gray-100" />

          {/* Duplicate record */}
          <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
              <rect x="5" y="5" width="9" height="9" rx="1" />
              <path d="M2 11V2h9" />
            </svg>
            Duplicate record
          </button>

          {/* Apply template */}
          <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
              <path d="M3 2h7l3 3v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
              <path d="M10 2v3h3" />
              <path d="M5 8h6M5 11h4" />
            </svg>
            Apply template
          </button>

          {/* Expand record */}
          <button
            onClick={() => {
              setExpandedRowId(rowContextMenu.rowId);
              setRowContextMenu(null);
            }}
            className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gray-500">
              <path d="M10 2h4v4M6 14H2v-4M14 2l-5 5M2 14l5-5" />
            </svg>
            Expand record
          </button>

          {/* Run field agent */}
          <button className="flex w-full items-center justify-between px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
            <span className="flex items-center gap-2.5">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
                <circle cx="8" cy="8" r="5" />
                <circle cx="8" cy="8" r="1.5" fill="currentColor" />
              </svg>
              Run field agent
            </span>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-400">
              <path d="M6 4l4 4-4 4" />
            </svg>
          </button>

          <div className="my-1.5 border-t border-gray-100" />

          {/* Add comment */}
          <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
              <path d="M2 3h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H5l-3 3V4a1 1 0 0 1 1-1z" />
            </svg>
            Add comment
          </button>

          {/* Copy record URL */}
          <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
              <path d="M6.5 9.5a3 3 0 0 0 4.2.3l2-2a3 3 0 0 0-4.2-4.3l-1.1 1.1" />
              <path d="M9.5 6.5a3 3 0 0 0-4.2-.3l-2 2a3 3 0 0 0 4.2 4.3l1.1-1.1" />
            </svg>
            Copy record URL
          </button>

          {/* Send record */}
          <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
              <rect x="1" y="3" width="14" height="10" rx="1.5" />
              <path d="M1 4.5l7 4.5 7-4.5" />
            </svg>
            Send record
          </button>

          <div className="my-1.5 border-t border-gray-100" />

          {/* Delete record — functional */}
          <button
            onClick={() => {
              deleteRow.mutate({ rowId: rowContextMenu.rowId });
              setRowContextMenu(null);
            }}
            className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-red-700 hover:bg-red-50"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
              <path d="M2 4h12" />
              <path d="M5 4V2h6v2" />
              <path d="M6 7v5M10 7v5" />
              <path d="M3 4l1 9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-9" />
            </svg>
            Delete record
          </button>
        </div>
      )}
    </div>
  );
}
