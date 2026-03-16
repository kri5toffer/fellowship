"use client";

import { useEffect, useRef, useState } from "react";

type ColumnDef = {
  id: string;
  columnName: string;
  fieldType: string;
};

const FIELD_TYPE_ICONS: Record<string, React.ReactNode> = {
  TEXT: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="shrink-0 text-gray-500">
      <path d="M2.5 3.5A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H8.5v9a.5.5 0 0 1-1 0V4H3a.5.5 0 0 1-.5-.5z" />
    </svg>
  ),
  NUMBER: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="shrink-0 text-orange-500">
      <path d="M4 3h3v4H4V3zm5 0h3v4H9V3zM4 9h3v4H4V9zm5 0h3v4H9V9z" fillOpacity="0.8" />
    </svg>
  ),
  CHECKBOX: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-purple-500">
      <rect x="2" y="2" width="12" height="12" rx="2" />
      <path d="M4.5 8l2.5 2.5 4.5-4.5" />
    </svg>
  ),
  DATE: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="shrink-0 text-cyan-600">
      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
    </svg>
  ),
};

export function HideFieldsPanel({
  columns,
  hiddenFieldIds,
  onChange,
}: {
  columns: ColumnDef[];
  hiddenFieldIds: string[];
  onChange: (hiddenFieldIds: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const hiddenCount = hiddenFieldIds.length;

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  function toggle(colId: string) {
    if (hiddenFieldIds.includes(colId)) {
      onChange(hiddenFieldIds.filter((id) => id !== colId));
    } else {
      onChange([...hiddenFieldIds, colId]);
    }
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 rounded-sm px-2 py-1 text-[13px] transition-colors ${
          hiddenCount > 0
            ? "bg-blue-100 text-blue-700"
            : "text-airtable-text-secondary hover:bg-gray-100"
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" />
          <circle cx="8" cy="8" r="2" />
        </svg>
        Hide fields
        {hiddenCount > 0 && (
          <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
            {hiddenCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-30 mt-1 w-64 rounded-lg border border-airtable-border bg-white shadow-lg">
          <div className="border-b border-airtable-border-light px-4 py-3">
            <h3 className="text-[13px] font-semibold text-airtable-text-primary">Hide fields</h3>
            <p className="text-[12px] text-airtable-text-muted">Toggle fields to show or hide them</p>
          </div>

          <div className="max-h-[300px] overflow-auto py-2">
            {columns.map((col) => {
              const isHidden = hiddenFieldIds.includes(col.id);
              return (
                <div
                  key={col.id}
                  onClick={() => toggle(col.id)}
                  className="flex cursor-pointer items-center gap-3 px-4 py-1.5 hover:bg-gray-50"
                >
                  {/* Toggle switch */}
                  <div
                    className={`relative h-4 w-7 shrink-0 rounded-full transition-colors ${
                      isHidden ? "bg-gray-300" : "bg-airtable-blue"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition-transform ${
                        isHidden ? "left-0.5" : "left-3.5"
                      }`}
                    />
                  </div>
                  {FIELD_TYPE_ICONS[col.fieldType] ?? FIELD_TYPE_ICONS.TEXT}
                  <span className="truncate text-[13px] text-airtable-text-primary">{col.columnName}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between border-t border-airtable-border-light px-4 py-2.5">
            <button
              onClick={() => onChange(columns.map((c) => c.id))}
              className="text-[13px] text-airtable-text-secondary hover:text-airtable-text-primary"
            >
              Hide all
            </button>
            <button
              onClick={() => onChange([])}
              className="text-[13px] text-airtable-text-secondary hover:text-airtable-text-primary"
            >
              Show all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
