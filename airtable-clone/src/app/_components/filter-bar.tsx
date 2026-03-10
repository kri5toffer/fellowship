"use client";

import { useState } from "react";

export type FilterCondition = {
  id: string;
  columnId: string;
  operator: string;
  value: string;
};

type ColumnDef = {
  id: string;
  columnName: string;
  fieldType: string;
};

const OPERATORS_BY_TYPE: Record<string, { value: string; label: string }[]> = {
  TEXT: [
    { value: "contains", label: "contains" },
    { value: "not_contains", label: "does not contain" },
    { value: "equals", label: "is" },
    { value: "not_equals", label: "is not" },
    { value: "empty", label: "is empty" },
    { value: "not_empty", label: "is not empty" },
  ],
  NUMBER: [
    { value: "equals", label: "=" },
    { value: "not_equals", label: "\u2260" },
    { value: "gt", label: ">" },
    { value: "lt", label: "<" },
    { value: "gte", label: "\u2265" },
    { value: "lte", label: "\u2264" },
    { value: "empty", label: "is empty" },
    { value: "not_empty", label: "is not empty" },
  ],
  CHECKBOX: [
    { value: "is_checked", label: "is checked" },
    { value: "is_unchecked", label: "is unchecked" },
  ],
  DATE: [
    { value: "equals", label: "is" },
    { value: "before", label: "is before" },
    { value: "after", label: "is after" },
    { value: "empty", label: "is empty" },
    { value: "not_empty", label: "is not empty" },
  ],
};

const NO_VALUE_OPERATORS = new Set(["empty", "not_empty", "is_checked", "is_unchecked"]);

let nextFilterId = 0;

export function FilterBar({
  columns,
  filters,
  onChange,
}: {
  columns: ColumnDef[];
  filters: FilterCondition[];
  onChange: (filters: FilterCondition[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const activeCount = filters.length;

  function addFilter() {
    const firstCol = columns[0];
    if (!firstCol) return;
    const ops = OPERATORS_BY_TYPE[firstCol.fieldType] ?? OPERATORS_BY_TYPE.TEXT!;
    onChange([
      ...filters,
      {
        id: `f_${++nextFilterId}`,
        columnId: firstCol.id,
        operator: ops[0]!.value,
        value: "",
      },
    ]);
    setIsOpen(true);
  }

  function updateFilter(id: string, updates: Partial<FilterCondition>) {
    onChange(
      filters.map((f) => {
        if (f.id !== id) return f;
        const updated = { ...f, ...updates };
        if (updates.columnId && updates.columnId !== f.columnId) {
          const newCol = columns.find((c) => c.id === updates.columnId);
          const ops = OPERATORS_BY_TYPE[newCol?.fieldType ?? "TEXT"] ?? OPERATORS_BY_TYPE.TEXT!;
          updated.operator = ops[0]!.value;
          updated.value = "";
        }
        return updated;
      }),
    );
  }

  function removeFilter(id: string) {
    const updated = filters.filter((f) => f.id !== id);
    onChange(updated);
    if (updated.length === 0) setIsOpen(false);
  }

  return (
    <div>
      <button
        onClick={() => {
          if (filters.length === 0) {
            addFilter();
          } else {
            setIsOpen(!isOpen);
          }
        }}
        className={`flex items-center gap-1.5 rounded-sm px-2 py-1 text-xs font-medium transition-colors ${
          activeCount > 0
            ? "bg-airtable-blue/10 text-airtable-blue"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 3h12M4 6h8M6 9h4M7 12h2" />
        </svg>
        Filter
        {activeCount > 0 && (
          <span className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-airtable-blue text-[10px] font-bold text-white">
            {activeCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-20 border-b border-airtable-border bg-white px-5 py-3 shadow-sm">
          <div className="flex flex-col gap-2">
            {filters.map((filter, idx) => {
              const col = columns.find((c) => c.id === filter.columnId);
              const ops = OPERATORS_BY_TYPE[col?.fieldType ?? "TEXT"] ?? OPERATORS_BY_TYPE.TEXT!;
              const needsValue = !NO_VALUE_OPERATORS.has(filter.operator);

              return (
                <div key={filter.id} className="flex items-center gap-2">
                  <span className="w-12 text-right text-[12px] text-gray-400">
                    {idx === 0 ? "Where" : "and"}
                  </span>

                  <select
                    className="rounded border border-gray-200 bg-gray-50 px-2 py-1 text-[13px] text-gray-700 outline-none focus:border-airtable-blue"
                    value={filter.columnId}
                    onChange={(e) => updateFilter(filter.id, { columnId: e.target.value })}
                  >
                    {columns.map((c) => (
                      <option key={c.id} value={c.id}>{c.columnName}</option>
                    ))}
                  </select>

                  <select
                    className="rounded border border-gray-200 bg-gray-50 px-2 py-1 text-[13px] text-gray-700 outline-none focus:border-airtable-blue"
                    value={filter.operator}
                    onChange={(e) => updateFilter(filter.id, { operator: e.target.value })}
                  >
                    {ops.map((op) => (
                      <option key={op.value} value={op.value}>{op.label}</option>
                    ))}
                  </select>

                  {needsValue && (
                    <input
                      type={col?.fieldType === "NUMBER" ? "number" : col?.fieldType === "DATE" ? "date" : "text"}
                      placeholder="Enter a value"
                      className="w-40 rounded border border-gray-200 bg-white px-2 py-1 text-[13px] text-gray-700 outline-none placeholder:text-gray-300 focus:border-airtable-blue"
                      value={filter.value}
                      onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
                    />
                  )}

                  <button
                    onClick={() => removeFilter(filter.id)}
                    className="rounded p-0.5 text-gray-300 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="4" y1="4" x2="12" y2="12" />
                      <line x1="12" y1="4" x2="4" y2="12" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={addFilter}
              className="text-[12px] font-medium text-airtable-blue hover:text-airtable-blue/80"
            >
              + Add condition
            </button>
            {filters.length > 0 && (
              <button
                onClick={() => { onChange([]); setIsOpen(false); }}
                className="text-[12px] text-gray-400 hover:text-gray-600"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function applyFilters(
  rows: { id: string; cells: { columnId: string; cellValue: string | null }[] }[],
  filters: FilterCondition[],
  columns: ColumnDef[],
) {
  if (filters.length === 0) return rows;

  return rows.filter((row) => {
    return filters.every((filter) => {
      const cell = row.cells.find((c) => c.columnId === filter.columnId);
      const val = cell?.cellValue ?? "";
      const col = columns.find((c) => c.id === filter.columnId);
      const type = col?.fieldType ?? "TEXT";

      switch (filter.operator) {
        case "contains":
          return val.toLowerCase().includes(filter.value.toLowerCase());
        case "not_contains":
          return !val.toLowerCase().includes(filter.value.toLowerCase());
        case "equals":
          if (type === "NUMBER") return Number(val) === Number(filter.value);
          return val === filter.value;
        case "not_equals":
          if (type === "NUMBER") return Number(val) !== Number(filter.value);
          return val !== filter.value;
        case "gt":
          return Number(val) > Number(filter.value);
        case "lt":
          return Number(val) < Number(filter.value);
        case "gte":
          return Number(val) >= Number(filter.value);
        case "lte":
          return Number(val) <= Number(filter.value);
        case "before":
          return val < filter.value;
        case "after":
          return val > filter.value;
        case "empty":
          return val === "" || val === null;
        case "not_empty":
          return val !== "" && val !== null;
        case "is_checked":
          return val === "true";
        case "is_unchecked":
          return val !== "true";
        default:
          return true;
      }
    });
  });
}
