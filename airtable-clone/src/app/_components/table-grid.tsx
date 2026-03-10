"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type ColumnDef,
} from "@tanstack/react-table";
import { api } from "~/trpc/react";
import { type FilterCondition, applyFilters } from "./filter-bar";

const FIELD_TYPE_ICONS: Record<string, React.ReactNode> = {
  TEXT: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
      <path d="M3 4h10M5 4v8M11 4v8M3 8h10" />
    </svg>
  ),
  NUMBER: (
    <span className="text-[11px] font-bold text-blue-500">#</span>
  ),
  CHECKBOX: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-500">
      <rect x="2.5" y="2.5" width="11" height="11" rx="2" />
      <path d="M5 8l2 2 4-4" />
    </svg>
  ),
  DATE: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal-500">
      <rect x="2" y="3" width="12" height="11" rx="1.5" />
      <line x1="2" y1="7" x2="14" y2="7" />
      <line x1="5" y1="1.5" x2="5" y2="4.5" />
      <line x1="11" y1="1.5" x2="11" y2="4.5" />
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
          className="h-[14px] w-[14px] cursor-pointer rounded-sm border-gray-300 accent-airtable-blue"
        />
      </div>
    );
  }

  if (!editing) {
    return (
      <div
        className="flex h-full cursor-text items-center truncate px-2 text-[13px] text-gray-800"
        onDoubleClick={() => setEditing(true)}
      >
        {fieldType === "DATE" && cellValue
          ? new Date(cellValue).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
          : cellValue || "\u00A0"}
      </div>
    );
  }

  return (
    <input
      ref={inputRef}
      type={fieldType === "DATE" ? "date" : fieldType === "NUMBER" ? "number" : "text"}
      className="h-full w-full border-2 border-airtable-blue bg-white px-2 text-[13px] text-gray-800 outline-none"
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

  const addColumn = api.table.createColumn.useMutation({
    onSuccess: () => utils.table.getById.invalidate({ id: tableId }),
  });

  const [showColumnForm, setShowColumnForm] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [newFieldType, setNewFieldType] = useState<"TEXT" | "NUMBER" | "CHECKBOX" | "DATE">("TEXT");
  const [sorting, setSorting] = useState<SortingState>([]);

  const dbColumns = table?.columns ?? [];
  const allRows = table?.rows ?? [];

  const preFilteredRows = useMemo(
    () => applyFilters(allRows, filters, dbColumns),
    [allRows, filters, dbColumns],
  );

  // Transform EAV rows into flat objects for TanStack Table
  const flatData: FlatRow[] = useMemo(() => {
    return preFilteredRows.map((row) => {
      const flat: FlatRow = { _rowId: row.id };
      for (const cell of row.cells) {
        flat[cell.columnId] = cell.cellValue ?? "";
      }
      return flat;
    });
  }, [preFilteredRows]);

  // Build TanStack column definitions dynamically from our Column model
  const tanstackColumns: ColumnDef<FlatRow, string>[] = useMemo(() => {
    const helper = createColumnHelper<FlatRow>();

    return dbColumns.map((col) =>
      helper.accessor((row) => row[col.id] ?? "", {
        id: col.id,
        header: () => (
          <div className="flex items-center gap-1.5">
            {FIELD_TYPE_ICONS[col.fieldType]}
            <span className="text-[13px] font-normal text-gray-700">{col.columnName}</span>
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
  }, [dbColumns, updateCell]);

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
      <div className="flex h-64 items-center justify-center text-sm text-gray-400">
        Loading table...
      </div>
    );
  }

  if (!table) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-400">
        Table not found
      </div>
    );
  }

  return (
    <div className="overflow-auto">
      {filters.length > 0 && (
        <div className="border-b border-airtable-border bg-blue-50/50 px-3 py-1 text-[12px] text-gray-500">
          Showing {preFilteredRows.length} of {allRows.length} rows
        </div>
      )}
      <table className="w-full border-collapse text-[13px]">
        <thead className="sticky top-0 z-10">
          {reactTable.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-airtable-header-bg">
              {/* Row number header */}
              <th className="w-[66px] min-w-[66px] border-b border-r border-airtable-border bg-airtable-header-bg px-2 py-[6px] text-center">
                <input type="checkbox" className="h-3.5 w-3.5 rounded-sm border-gray-300 accent-airtable-blue" />
              </th>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="min-w-[180px] border-b border-r border-airtable-border bg-airtable-header-bg px-3 py-[6px] text-left"
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: header.column.getCanSort() ? "pointer" : "default" }}
                >
                  <div className="flex items-center gap-1">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: <span className="ml-auto text-[10px] text-airtable-blue">&#9650;</span>,
                      desc: <span className="ml-auto text-[10px] text-airtable-blue">&#9660;</span>,
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </th>
              ))}
              {/* Add column button */}
              <th className="w-[100px] border-b border-airtable-border bg-airtable-header-bg px-2 py-[6px]">
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
                      placeholder="Name"
                      className="w-20 rounded border border-gray-300 px-1.5 py-0.5 text-[12px] font-normal outline-none focus:border-airtable-blue"
                      value={newColumnName}
                      onChange={(e) => setNewColumnName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") setShowColumnForm(false);
                      }}
                    />
                    <select
                      className="rounded border border-gray-300 px-1 py-0.5 text-[11px] font-normal outline-none"
                      value={newFieldType}
                      onChange={(e) => setNewFieldType(e.target.value as typeof newFieldType)}
                    >
                      <option value="TEXT">Text</option>
                      <option value="NUMBER">Number</option>
                      <option value="CHECKBOX">Check</option>
                      <option value="DATE">Date</option>
                    </select>
                    <button
                      type="submit"
                      className="rounded bg-airtable-blue px-1.5 py-0.5 text-[11px] font-medium text-white hover:bg-airtable-blue/90"
                    >
                      +
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setShowColumnForm(true)}
                    className="text-lg font-light text-gray-300 hover:text-airtable-blue"
                    title="Add column"
                  >
                    +
                  </button>
                )}
              </th>
            </tr>
          ))}
        </thead>
        <tbody>
          {reactTable.getRowModel().rows.map((row, idx) => (
            <tr key={row.id} className="group hover:bg-airtable-row-hover">
              {/* Row number */}
              <td className="border-b border-r border-airtable-border px-2 py-0 text-center text-[12px] text-gray-400">
                {idx + 1}
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

      <button
        onClick={() => addRow.mutate({ tableId: table.id })}
        disabled={addRow.isPending}
        className="flex w-full items-center gap-1.5 border-b border-airtable-border px-3 py-1.5 text-[13px] text-gray-400 hover:bg-airtable-row-hover hover:text-airtable-blue"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="8" y1="3" x2="8" y2="13" />
          <line x1="3" y1="8" x2="13" y2="8" />
        </svg>
        {addRow.isPending ? "Adding..." : "Add row"}
      </button>
    </div>
  );
}
