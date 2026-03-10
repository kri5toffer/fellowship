"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type ColumnDef,
} from "@tanstack/react-table";
import { api } from "~/trpc/react";
import { type FilterCondition, applyFilters } from "./filter-bar";

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

function CellInput({
  cellValue,
  fieldType,
  onSave,
}: {
  cellValue: string;
  fieldType: string;
  onSave: (val: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(cellValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(cellValue);
  }, [cellValue]);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  if (fieldType === "CHECKBOX") {
    return (
      <div className="flex h-full items-center justify-center">
        <input
          type="checkbox"
          checked={cellValue === "true"}
          onChange={(e) => onSave(e.target.checked ? "true" : "false")}
          className="h-4 w-4 cursor-pointer rounded border-gray-300 text-airtable-blue focus:ring-airtable-blue focus:ring-offset-0"
        />
      </div>
    );
  }

  if (!editing) {
    return (
      <div
        className="flex h-full cursor-cell items-center px-2 text-[13px] text-airtable-text-primary"
        onClick={() => setEditing(true)}
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
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setEditing(false);
          if (draft !== cellValue) onSave(draft);
        }
        if (e.key === "Escape") {
          setEditing(false);
          setDraft(cellValue);
        }
      }}
    />
  );
}

type FlatRow = {
  _rowId: string;
  [columnId: string]: string;
};

export function TableGrid({ tableId, filters }: { tableId: string; filters: FilterCondition[] }) {
  const utils = api.useUtils();
  const { data: table, isLoading } = api.table.getById.useQuery({ id: tableId });

  const updateCell = api.table.updateCell.useMutation({
    onSuccess: () => utils.table.getById.invalidate({ id: tableId }),
  });

  const addRow = api.table.createRow.useMutation({
    onSuccess: () => utils.table.getById.invalidate({ id: tableId }),
  });

  const deleteRow = api.table.deleteRow.useMutation({
    onSuccess: () => utils.table.getById.invalidate({ id: tableId }),
  });

  const addColumn = api.table.createColumn.useMutation({
    onSuccess: () => utils.table.getById.invalidate({ id: tableId }),
  });

  const deleteColumn = api.table.deleteColumn.useMutation({
    onSuccess: () => utils.table.getById.invalidate({ id: tableId }),
  });

  const [showColumnForm, setShowColumnForm] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [newFieldType, setNewFieldType] = useState<"TEXT" | "NUMBER" | "CHECKBOX" | "DATE">("TEXT");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnMenuId, setColumnMenuId] = useState<string | null>(null);

  const dbColumns = useMemo(() => table?.columns ?? [], [table?.columns]);
  const allRows = useMemo(() => table?.rows ?? [], [table?.rows]);

  const preFilteredRows = useMemo(
    () => applyFilters(allRows, filters, dbColumns),
    [allRows, filters, dbColumns],
  );

  const flatData: FlatRow[] = useMemo(() => {
    return preFilteredRows.map((row) => {
      const flat: FlatRow = { _rowId: row.id };
      for (const cell of row.cells) {
        flat[cell.columnId] = cell.cellValue ?? "";
      }
      return flat;
    });
  }, [preFilteredRows]);

  const tanstackColumns: ColumnDef<FlatRow, string>[] = useMemo(() => {
    const helper = createColumnHelper<FlatRow>();

    return dbColumns.map((col) =>
      helper.accessor((row) => row[col.id] ?? "", {
        id: col.id,
        header: () => (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {FIELD_TYPE_ICONS[col.fieldType]}
              <span className="truncate font-medium text-airtable-text-primary">{col.columnName}</span>
            </div>
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setColumnMenuId(columnMenuId === col.id ? null : col.id);
                }}
                className="rounded p-0.5 opacity-0 hover:bg-gray-200 group-hover:opacity-100"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="text-gray-400">
                  <path d="M8 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                </svg>
              </button>
              {columnMenuId === col.id && (
                <div className="absolute right-0 top-full z-20 mt-1 w-40 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete column "${col.columnName}"? This will delete all data in this column.`)) {
                        deleteColumn.mutate({ columnId: col.id });
                      }
                      setColumnMenuId(null);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] text-red-600 hover:bg-red-50"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2 4h12M5.5 4V2.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V4M6.5 7v5M9.5 7v5M3.5 4l.5 9.5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1L12.5 4"/>
                    </svg>
                    Delete field
                  </button>
                </div>
              )}
            </div>
          </div>
        ),
        cell: (info) => (
          <CellInput
            cellValue={info.getValue()}
            fieldType={col.fieldType}
            onSave={(val) =>
              updateCell.mutate({
                rowId: info.row.original._rowId,
                columnId: col.id,
                cellValue: val,
              })
            }
          />
        ),
        sortingFn: col.fieldType === "NUMBER"
          ? (a, b, columnId) => Number(a.getValue(columnId)) - Number(b.getValue(columnId))
          : "alphanumeric",
      }),
    );
  }, [dbColumns, updateCell, columnMenuId, deleteColumn]);

  const reactTable = useReactTable({
    data: flatData,
    columns: tanstackColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) {
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

  return (
    <div className="flex flex-col" onClick={() => setColumnMenuId(null)}>
      {filters.length > 0 && (
        <div className="border-b border-airtable-border bg-blue-50 px-4 py-1.5 text-[12px] text-airtable-blue">
          {preFilteredRows.length} of {allRows.length} records match filters
        </div>
      )}
      
      <div className="overflow-auto">
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
                    className="group min-w-[180px] cursor-pointer border-b border-r border-airtable-border bg-airtable-header-bg px-3 py-2 text-left text-[13px] hover:bg-gray-100"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center justify-between">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <span className="ml-2 text-airtable-text-muted">
                        {{
                          asc: "↑",
                          desc: "↓",
                        }[header.column.getIsSorted() as string] ?? ""}
                      </span>
                    </div>
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
                        onChange={(e) => setNewFieldType(e.target.value as typeof newFieldType)}
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
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
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
            {reactTable.getRowModel().rows.map((row, idx) => (
              <tr 
                key={row.id} 
                className="group transition-colors hover:bg-airtable-row-hover"
              >
                <td className="border-b border-r border-airtable-border bg-airtable-header-bg px-1 py-0 text-center text-[12px] text-airtable-text-muted group-hover:bg-gray-100">
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="w-5 group-hover:hidden">{idx + 1}</span>
                    <button
                      onClick={() => {
                        if (confirm("Delete this row?")) {
                          deleteRow.mutate({ rowId: row.original._rowId });
                        }
                      }}
                      className="hidden rounded p-0.5 text-gray-400 hover:bg-red-100 hover:text-red-600 group-hover:block"
                      title="Delete row"
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M2 4h12M5.5 4V2.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V4M6.5 7v5M9.5 7v5M3.5 4l.5 9.5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1L12.5 4"/>
                      </svg>
                    </button>
                  </div>
                </td>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="h-[32px] border-b border-r border-airtable-border p-0"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="border-b border-airtable-border" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => addRow.mutate({ tableId: table.id })}
        disabled={addRow.isPending}
        className="flex w-full items-center gap-2 border-b border-airtable-border px-4 py-2 text-[13px] text-airtable-text-muted hover:bg-airtable-row-hover hover:text-airtable-blue"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="8" y1="3" x2="8" y2="13" />
          <line x1="3" y1="8" x2="13" y2="8" />
        </svg>
        {addRow.isPending ? "Adding..." : "Add record"}
      </button>
    </div>
  );
}
