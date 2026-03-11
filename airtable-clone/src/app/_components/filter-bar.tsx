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
    { value: "not_equals", label: "≠" },
    { value: "gt", label: ">" },
    { value: "lt", label: "<" },
    { value: "gte", label: "≥" },
    { value: "lte", label: "≤" },
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
    <div className="relative">
      <button
        onClick={() => {
          if (filters.length === 0) {
            addFilter();
          } else {
            setIsOpen(!isOpen);
          }
        }}
        className={`flex items-center gap-1.5 rounded-sm px-2 py-1 text-[13px] transition-colors ${
          activeCount > 0
            ? "bg-green-100 text-green-700"
            : "text-airtable-text-secondary hover:bg-gray-100"
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 2h14l-5 6v5l-4 2V8L1 2z" />
        </svg>
        Filter
        {activeCount > 0 && (
          <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-green-600 px-1 text-[10px] font-bold text-white">
            {activeCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-30 mt-1 w-[500px] rounded-lg border border-airtable-border bg-white shadow-lg">
          <div className="border-b border-airtable-border-light px-4 py-3">
            <h3 className="text-[13px] font-semibold text-airtable-text-primary">
              Filter conditions
            </h3>
            <p className="text-[12px] text-airtable-text-muted">
              Records that match all conditions will be shown
            </p>
          </div>

          <div className="max-h-[300px] overflow-auto px-4 py-3">
            <div className="flex flex-col gap-2">
              {filters.map((filter, idx) => {
                const col = columns.find((c) => c.id === filter.columnId);
                const ops = OPERATORS_BY_TYPE[col?.fieldType ?? "TEXT"] ?? OPERATORS_BY_TYPE.TEXT!;
                const needsValue = !NO_VALUE_OPERATORS.has(filter.operator);

                return (
                  <div key={filter.id} className="flex items-center gap-2">
                    <span className="w-14 text-right text-[12px] text-airtable-text-muted">
                      {idx === 0 ? "Where" : "and"}
                    </span>

                    <select
                      className="flex-1 rounded-md border border-airtable-border bg-white px-2.5 py-1.5 text-[13px] text-airtable-text-primary outline-none focus:border-airtable-blue focus:ring-1 focus:ring-airtable-blue"
                      value={filter.columnId}
                      onChange={(e) => updateFilter(filter.id, { columnId: e.target.value })}
                    >
                      {columns.map((c) => (
                        <option key={c.id} value={c.id}>{c.columnName}</option>
                      ))}
                    </select>

                    <select
                      className="rounded-md border border-airtable-border bg-white px-2.5 py-1.5 text-[13px] text-airtable-text-primary outline-none focus:border-airtable-blue focus:ring-1 focus:ring-airtable-blue"
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
                        placeholder="Enter value"
                        className="w-32 rounded-md border border-airtable-border bg-white px-2.5 py-1.5 text-[13px] text-airtable-text-primary outline-none placeholder:text-airtable-text-muted focus:border-airtable-blue focus:ring-1 focus:ring-airtable-blue"
                        value={filter.value}
                        onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
                      />
                    )}

                    <button
                      onClick={() => removeFilter(filter.id)}
                      className="rounded p-1 text-airtable-text-muted hover:bg-gray-100 hover:text-airtable-text-secondary"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <line x1="4" y1="4" x2="12" y2="12" />
                        <line x1="12" y1="4" x2="4" y2="12" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-airtable-border-light px-4 py-3">
            <button
              onClick={addFilter}
              className="flex items-center gap-1 text-[13px] font-medium text-airtable-blue hover:text-airtable-blue/80"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="3" x2="8" y2="13" />
                <line x1="3" y1="8" x2="13" y2="8" />
              </svg>
              Add condition
            </button>
            
            <div className="flex items-center gap-2">
              {filters.length > 0 && (
                <button
                  onClick={() => { onChange([]); setIsOpen(false); }}
                  className="rounded px-3 py-1.5 text-[13px] text-airtable-text-secondary hover:bg-gray-100"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="rounded bg-airtable-blue px-3 py-1.5 text-[13px] font-medium text-white hover:bg-airtable-blue/90"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

