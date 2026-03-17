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

const ROW_HEIGHT = 32;

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
  DATE: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-cyan-600">
      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
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
    setDraft(cellValue);
  }, [cellValue]);

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
        {fieldType === "DATE" && cellValue
          ? new Date(cellValue).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
          : cellValue || ""}
      </div>
    );
  }

  return (
    <input
      ref={inputRef}
      type={fieldType === "DATE" ? "date" : fieldType === "NUMBER" ? "number" : "text"}
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
  filters?: { id: string; columnId: string; operator: string; value: string }[];
  searchQuery?: string;
  hiddenFieldIds?: string[];
  sortConfig?: { columnId: string; direction: "asc" | "desc" } | null;
}

export function TableGrid({ tableId, groupByColumnId, filters = [], searchQuery = "", hiddenFieldIds = [], sortConfig = null }: TableGridProps) {
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
      filters: filters.map(({ id, columnId, operator, value }) => ({
        id,
        columnId,
        operator,
        value,
      })),
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
        filters: filters.map(({ id, columnId, operator, value }) => ({
          id,
          columnId,
          operator,
          value,
        })),
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
      invalidateAll();
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
        filters: filters.map(({ id, columnId, operator, value }) => ({
          id,
          columnId,
          operator,
          value,
        })),
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
    onError: (_err, _variables, context) => {
      if (context?.previousRows !== undefined) {
        utils.table.getRows.setInfiniteData(context.queryInput, context.previousRows);
      }
    },
    onSettled: () => {
      invalidateAll();
    },
  });

  const deleteRow = api.table.deleteRow.useMutation({
    onMutate: async (variables) => {
      const queryInput = {
        tableId,
        limit: 100,
        filters: filters.map(({ id, columnId, operator, value }) => ({
          id,
          columnId,
          operator,
          value,
        })),
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
      utils.table.getById.setData({ id: tableId }, (old) => {
        if (!old) return old;
        return {
          ...old,
          columns: [
            ...old.columns,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { id: `temp-${Date.now()}`, columnName: variables.columnName, fieldType: variables.fieldType, tableId } as any,
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
    "TEXT" | "NUMBER" | "CHECKBOX" | "DATE"
  >("TEXT");
  const [columnMenuId, setColumnMenuId] = useState<string | null>(null);
  const [renamingColumnId, setRenamingColumnId] = useState<string | null>(null);
  const [focusedCell, setFocusedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const parentRef = useRef<HTMLDivElement>(null);

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

    return dbColumns.map((col) =>
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
                <span className="truncate font-medium text-airtable-text-primary">
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
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="text-gray-400">
                  <path d="M8 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                </svg>
              </button>
              {columnMenuId === col.id && (
                <div className="absolute right-0 top-full z-20 mt-1 w-44 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setRenamingColumnId(col.id);
                      setColumnMenuId(null);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M11 2l3 3-8 8H3v-3L11 2z" />
                    </svg>
                    Rename field
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteColumn.mutate({ columnId: col.id });
                      setColumnMenuId(null);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] text-red-600 hover:bg-red-50"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2 4h12M5.5 4V2.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V4M6.5 7v5M9.5 7v5M3.5 4l.5 9.5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1L12.5 4" />
                    </svg>
                    Delete field
                  </button>
                </div>
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
      <div className="flex shrink-0 items-center justify-between border-b border-airtable-border bg-gray-50/50 px-4 py-1">
        <span className="text-[12px] text-airtable-text-muted">
          {allRows.length.toLocaleString()} of {totalRowCount.toLocaleString()} rows loaded
          {isFetchingNextPage && " · Loading more..."}
        </span>
        <button
          onClick={() => addBulkRows.mutate({ tableId: table.id, count: 100_000 })}
          disabled={addBulkRows.isPending}
          className="rounded-md bg-airtable-blue px-3 py-1 text-[12px] font-medium text-white hover:bg-airtable-blue/90 disabled:opacity-60"
        >
          {addBulkRows.isPending ? "Adding rows…" : "+ 100k rows"}
        </button>
      </div>

      <div
        ref={parentRef}
        className="min-h-0 flex-1 overflow-auto"
      >
        <div>
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10">
            {reactTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <th className="w-[70px] min-w-[70px] border-b border-r border-airtable-border bg-airtable-header-bg px-2 py-2 text-center text-[11px] text-gray-400">
                  #
                </th>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="group min-w-[180px] border-b border-r border-airtable-border bg-airtable-header-bg px-3 py-2 text-left text-[13px]"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
                <th className="w-[120px] border-b border-airtable-border bg-airtable-header-bg px-2 py-2">
                  {showColumnForm ? (
                    <form
                      className="flex items-center gap-1"
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
                        <option value="DATE">Date</option>
                      </select>
                    </form>
                  ) : (
                    <button
                      onClick={() => setShowColumnForm(true)}
                      className="flex items-center gap-1 text-[13px] font-medium text-airtable-text-muted hover:text-airtable-blue"
                      title="Add field"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="8" y1="3" x2="8" y2="13" />
                        <line x1="3" y1="8" x2="13" y2="8" />
                      </svg>
                    </button>
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
            {virtualRows.map((virtualRow) => {
              const row = tableRows[virtualRow.index]!;
              const rowIdx = virtualRow.index;
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

              return (
                <tr
                  key={row.id}
                  data-index={virtualRow.index}
                  ref={rowVirtualizer.measureElement}
                  className="group transition-colors hover:bg-airtable-row-hover"
                  style={{ height: `${ROW_HEIGHT}px` }}
                >
                  <td className="border-b border-r border-airtable-border bg-airtable-header-bg px-1 py-0 text-center text-[12px] text-airtable-text-muted group-hover:bg-gray-100">
                    <div className="flex items-center justify-center gap-0.5">
                      <span className="w-5 group-hover:hidden">
                        {rowIdx + 1}
                      </span>
                      <button
                        onClick={() => {
                          deleteRow.mutate({
                            rowId: row.original._rowId,
                          });
                        }}
                        className="hidden rounded p-0.5 text-gray-400 hover:bg-red-100 hover:text-red-600 group-hover:block"
                        title="Delete row"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M2 4h12M5.5 4V2.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V4M6.5 7v5M9.5 7v5M3.5 4l.5 9.5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1L12.5 4" />
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
                    return (
                      <td
                        key={cell.id}
                        className="h-[32px] border-b border-r border-airtable-border p-0"
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
                      </td>
                    );
                  })}
                  <td className="border-b border-airtable-border" />
                </tr>
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>
        <button
          onClick={() => addRow.mutate({ tableId: table.id })}
          disabled={addRow.isPending}
          className="flex w-full items-center gap-2 border-b border-airtable-border px-4 py-2 text-[13px] text-airtable-text-muted hover:bg-airtable-row-hover hover:text-airtable-blue"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="8" y1="3" x2="8" y2="13" />
            <line x1="3" y1="8" x2="13" y2="8" />
          </svg>
          {addRow.isPending ? "Adding..." : "Add record"}
        </button>
        </div>
      </div>
    </div>
  );
}
