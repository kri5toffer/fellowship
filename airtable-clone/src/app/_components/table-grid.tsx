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
const ROW_NUM_WIDTH = 36; // Width of the row-number/checkbox gutter
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
        className={`flex h-full cursor-cell items-center px-2 text-[13px] text-airtable-text-primary outline-none ${
          isFocused ? "ring-2 ring-inset ring-airtable-blue" : ""
        }`}
        onClick={() => {
          onFocus();
          setEditing(true);
        }}
        onFocus={onFocus}
        onKeyDown={handleKeyDown}
      >
        {cellValue || ""}
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
}

export function TableGrid({ tableId, groupByColumnId, filterGroup, searchQuery = "", hiddenFieldIds = [], sortConfig = null, onAddingRowChange }: TableGridProps) {
  const utils = api.useUtils();

  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const { data: table, isLoading: isLoadingMeta } = api.table.getById.useQuery(
    { id: tableId },
  );

  const {
    data: rowsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingRows,
  } = api.table.getRows.useInfiniteQuery(
    {
      tableId,
      limit: 100,
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

  const updateCell = api.table.updateCell.useMutation({
    onMutate: async (variables) => {
      const queryInput = {
        tableId,
        limit: 100,
        filterGroup: filterGroup ?? createEmptyFilterGroup(),
        search: debouncedSearch,
      };
      await utils.table.getRows.cancel({ tableId });
      const previousRows = utils.table.getRows.getInfiniteData(queryInput);
      utils.table.getRows.setInfiniteData(queryInput, (old) => {
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
      return { previousRows, queryInput };
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
        utils.table.getRows.setInfiniteData(context.queryInput, context.previousRows);
      }
    },
    onSettled: () => {
      void utils.table.getRows.invalidate({ tableId });
    },
  });

  const addBulkRows = api.table.addBulkRows.useMutation({
    onSuccess: () => {
      invalidateAll();
    },
  });

  const addRow = api.table.createRow.useMutation({
    onMutate: async () => {
      const queryInput = {
        tableId,
        limit: 100,
        filterGroup: filterGroup ?? createEmptyFilterGroup(),
        search: debouncedSearch,
      };
      await utils.table.getRows.cancel({ tableId });
      const previousRows = utils.table.getRows.getInfiniteData(queryInput);
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
      utils.table.getRows.setInfiniteData(queryInput, (old) => {
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
      return { previousRows, queryInput };
    },
    onSuccess: (newRow, _variables, context) => {
      if (!context) return;
      // Replace the temp row with the real row so subsequent cell edits use the real rowId
      utils.table.getRows.setInfiniteData(context.queryInput, (old) => {
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
        utils.table.getRows.setInfiniteData(context.queryInput, context.previousRows);
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
      const queryInput = {
        tableId,
        limit: 100,
        filterGroup: filterGroup ?? createEmptyFilterGroup(),
        search: debouncedSearch,
      };
      await utils.table.getRows.cancel({ tableId });
      const previousRows = utils.table.getRows.getInfiniteData(queryInput);
      utils.table.getRows.setInfiniteData(queryInput, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            rows: page.rows.filter(
              (row: { id: string }) => row.id !== variables.rowId,
            ),
          })),
        };
      });
      return { previousRows, queryInput };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousRows !== undefined) {
        utils.table.getRows.setInfiniteData(context.queryInput, context.previousRows);
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
  const totalRowCount = table?._count?.rows ?? 0;

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
              <div className="flex items-center gap-2">
                {FIELD_TYPE_ICONS[col.fieldType]}
                <span className="truncate font-semibold text-airtable-text-primary">
                  {col.columnName}
                </span>
              </div>
            )}
            <div className="relative">
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

  const rowVirtualizer = useVirtualizer({
    count: tableRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 20,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const lastItem = virtualRows.at(-1);
    if (!lastItem) return;

    if (
      lastItem.index >= flatData.length - 30 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      void fetchNextPage();
    }
  }, [virtualRows, flatData.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10">
            {reactTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {/* Row-number gutter header (checkbox) */}
                <th
                  className="sticky left-0 z-[3] border-b border-r border-airtable-border bg-white p-0"
                  style={{ width: ROW_NUM_WIDTH, minWidth: ROW_NUM_WIDTH }}
                >
                  <div className="flex h-full items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#d0d5dd]">
                      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                </th>
                {headerGroup.headers.map((header, hIdx) => {
                  const colId = header.column.id;
                  const isFrozen = hIdx === 0;
                  return (
                    <th
                      key={header.id}
                      className={`group relative border-b border-r border-airtable-border bg-white px-3 py-2 text-left text-[13px] ${
                        isFrozen ? "sticky z-[3]" : ""
                      }`}
                      style={{
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
              let dataRowNum = 0; // Counter for data rows only (not group headers)
              return virtualRows.map((virtualRow) => {
                const row = tableRows[virtualRow.index]!;
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
                    className="group"
                    style={{ height: `${ROW_HEIGHT}px` }}
                  >
                    {/* Row number / checkbox / expand gutter */}
                    <td
                      className="sticky left-0 z-[1] border-b border-r border-airtable-border bg-white p-0 text-center text-[11px] text-[#aaaaaa]"
                      style={{ width: ROW_NUM_WIDTH, minWidth: ROW_NUM_WIDTH }}
                    >
                      <div className="relative flex h-full items-center justify-center">
                        {/* Row number — hidden on hover */}
                        <span className="group-hover:hidden">{displayRowNum}</span>
                        {/* Checkbox — shown on hover */}
                        <div className="hidden items-center justify-center group-hover:flex">
                          <input
                            type="checkbox"
                            className="h-[14px] w-[14px] cursor-pointer rounded-sm border-[#d0d5dd] text-airtable-blue focus:ring-airtable-blue focus:ring-offset-0"
                          />
                        </div>
                        {/* Expand button — appears on hover, right side */}
                        <button
                          type="button"
                          title="Expand row"
                          className="absolute right-0.5 hidden items-center justify-center rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 group-hover:flex"
                        >
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10 2h4v4M6 14H2v-4M14 2l-5 5M2 14l5-5" />
                          </svg>
                        </button>
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
            className="sticky left-0 z-[1] flex h-full items-center justify-center border-r border-airtable-border bg-white text-[#aaaaaa] hover:text-airtable-blue"
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
            className="sticky left-0 z-[1] shrink-0 border-r border-airtable-border bg-white"
            style={{ width: ROW_NUM_WIDTH, minWidth: ROW_NUM_WIDTH }}
          />
          <div className="flex-1" />
        </div>
        </div>
      </div>
      {/* Footer - record count + add buttons */}
      <div className="shrink-0 border-t border-airtable-border bg-white px-1.5 py-1.5">
        <div className="flex items-center gap-1">
          <button
            onClick={() => addRow.mutate({ tableId: table.id })}
            className="flex h-7 w-7 items-center justify-center rounded text-airtable-text-muted hover:bg-gray-100 hover:text-airtable-blue"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="3" x2="8" y2="13" />
              <line x1="3" y1="8" x2="13" y2="8" />
            </svg>
          </button>
          <button className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-[12px] text-airtable-text-muted shadow-sm hover:bg-gray-50">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
              <path d="M2 4h12M2 8h12M2 12h8" />
            </svg>
            Add...
          </button>
        </div>
        <div className="px-1 pt-1 text-[11px] text-airtable-text-muted">
          {totalRowCount} record{totalRowCount !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}
