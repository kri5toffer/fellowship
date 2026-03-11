"use client";

import { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import { TableGrid } from "./table-grid";

const FIELD_TYPE_ICONS: Record<string, React.ReactNode> = {
  TEXT: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="text-gray-500">
      <path d="M2.5 3.5A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H8.5v9a.5.5 0 0 1-1 0V4H3a.5.5 0 0 1-.5-.5z"/>
    </svg>
  ),
  NUMBER: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="text-orange-500">
      <path d="M4 3h3v4H4V3zm5 0h3v4H9V3zM4 9h3v4H4V9zm5 0h3v4H9V9z" fillOpacity="0.8"/>
    </svg>
  ),
  CHECKBOX: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-500">
      <rect x="2" y="2" width="12" height="12" rx="2" />
      <path d="M4.5 8l2.5 2.5 4.5-4.5" />
    </svg>
  ),
  DATE: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="text-cyan-600">
      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
    </svg>
  ),
};

export function TableTabs({ baseId }: { baseId: string }) {
  const { data: tables, isLoading } = api.table.getAll.useQuery({ baseId });
  const utils = api.useUtils();
  const [activeTableId, setActiveTableId] = useState<string | null>(null);
  const [creatingTable, setCreatingTable] = useState(false);
  const [newTableName, setNewTableName] = useState("");
  const [groupByColumnId, setGroupByColumnId] = useState<string | null>(null);
  const [showGroupMenu, setShowGroupMenu] = useState(false);

  const tableList = tables ?? [];
  const selectedId = activeTableId ?? tableList[0]?.id ?? null;

  const { data: activeTable } = api.table.getById.useQuery(
    { id: selectedId ?? "" },
    { enabled: !!selectedId }
  );

  useEffect(() => {
    setActiveTableId(null);
    setGroupByColumnId(null);
  }, [baseId]);

  useEffect(() => {
    setGroupByColumnId(null);
  }, [selectedId]);

  const createTable = api.table.create.useMutation({
    onSuccess: (newTable) => {
      void utils.table.getAll.invalidate({ baseId });
      setActiveTableId(newTable.id);
      setCreatingTable(false);
      setNewTableName("");
    },
  });

  const addBulkRows = api.table.addBulkRows.useMutation({
    onSuccess: () => {
      if (selectedId) {
        void utils.table.getRows.invalidate({ tableId: selectedId });
        void utils.table.getById.invalidate({ id: selectedId });
      }
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-airtable-text-muted">
        Loading...
      </div>
    );
  }

  const handleTableSwitch = (id: string) => {
    setActiveTableId(id);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-end gap-0.5 bg-airtable-teal px-2 pt-2">
        {tableList.map((t) => (
          <button
            key={t.id}
            onClick={() => handleTableSwitch(t.id)}
            className={`flex items-center gap-2 rounded-t-[3px] px-4 py-2 text-[13px] font-medium transition-all ${
              t.id === selectedId
                ? "bg-white text-airtable-text-primary shadow-sm"
                : "bg-transparent text-white/90 hover:bg-white/10"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={t.id === selectedId ? "text-airtable-blue" : "text-white/70"}>
              <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v1h14V2a1 1 0 0 0-1-1H2zM1 5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5H1z"/>
            </svg>
            {t.tableName}
          </button>
        ))}

        {creatingTable ? (
          <form
            className="flex items-center gap-1.5 px-2 pb-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!newTableName.trim()) return;
              createTable.mutate({ baseId, tableName: newTableName.trim() });
            }}
          >
            <input
              autoFocus
              type="text"
              placeholder="Table name"
              className="rounded border-none bg-white px-3 py-1.5 text-[13px] text-airtable-text-primary outline-none placeholder:text-gray-400"
              value={newTableName}
              onChange={(e) => setNewTableName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setCreatingTable(false);
                  setNewTableName("");
                }
              }}
            />
            <button
              type="submit"
              className="rounded bg-white px-3 py-1.5 text-[13px] font-medium text-airtable-teal hover:bg-white/90"
              disabled={createTable.isPending}
            >
              Create
            </button>
          </form>
        ) : (
          <button
            onClick={() => setCreatingTable(true)}
            className="mb-0.5 flex items-center gap-1 rounded px-3 py-1.5 text-[13px] text-white/70 hover:bg-white/10 hover:text-white"
            title="Add table"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="4" x2="8" y2="12" />
              <line x1="4" y1="8" x2="12" y2="8" />
            </svg>
            <span className="hidden sm:inline">Add table</span>
          </button>
        )}
      </div>

      {selectedId && (
        <div className="flex items-center gap-1 border-b border-airtable-border bg-white px-3 py-1.5">
          <div className="flex items-center gap-1.5 rounded-sm bg-airtable-blue/10 px-2.5 py-1">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="text-airtable-blue">
              <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v1h14V2a1 1 0 0 0-1-1H2zM1 5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5H1z"/>
            </svg>
            <span className="text-[13px] font-medium text-airtable-blue">Grid view</span>
          </div>

          <div className="mx-2 h-4 w-px bg-airtable-border" />

          <button className="flex items-center gap-1.5 rounded-sm px-2 py-1 text-[13px] text-airtable-text-secondary hover:bg-gray-100">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 3.5c-3.5 0-6 4.5-6 4.5s2.5 4.5 6 4.5 6-4.5 6-4.5-2.5-4.5-6-4.5z" />
              <circle cx="8" cy="8" r="2" />
            </svg>
            Hide fields
          </button>

          <button className="flex items-center gap-1.5 rounded-sm px-2 py-1 text-[13px] text-airtable-text-secondary hover:bg-gray-100">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 2h14l-5 6v5l-4 2V8L1 2z" />
            </svg>
            Filter
          </button>

          <button className="flex items-center gap-1.5 rounded-sm px-2 py-1 text-[13px] text-airtable-text-secondary hover:bg-gray-100">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 4h12M4 8h8M6 12h4" />
            </svg>
            Sort
          </button>

          {/* Group button */}
          <div className="relative">
            <button
              onClick={() => setShowGroupMenu(!showGroupMenu)}
              className={`flex items-center gap-1.5 rounded-sm px-2 py-1 text-[13px] ${
                groupByColumnId
                  ? "bg-purple-50 text-purple-700"
                  : "text-airtable-text-secondary hover:bg-gray-100"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="2" width="6" height="5" rx="1" />
                <rect x="1" y="9" width="6" height="5" rx="1" />
                <path d="M9 4.5h5M9 11.5h5" />
              </svg>
              {groupByColumnId ? (
                <>
                  Group: {activeTable?.columns.find((c) => c.id === groupByColumnId)?.columnName}
                </>
              ) : (
                "Group"
              )}
            </button>

            {showGroupMenu && (
              <div className="absolute left-0 top-full z-30 mt-1 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
                <div className="px-3 py-1.5 text-[11px] font-medium uppercase text-gray-400">
                  Group by field
                </div>
                {activeTable?.columns.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => {
                      setGroupByColumnId(col.id === groupByColumnId ? null : col.id);
                      setShowGroupMenu(false);
                    }}
                    className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] hover:bg-gray-50 ${
                      col.id === groupByColumnId ? "bg-purple-50 text-purple-700" : "text-airtable-text-primary"
                    }`}
                  >
                    {FIELD_TYPE_ICONS[col.fieldType]}
                    {col.columnName}
                    {col.id === groupByColumnId && (
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="ml-auto">
                        <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                      </svg>
                    )}
                  </button>
                ))}
                {groupByColumnId && (
                  <>
                    <div className="my-1 border-t border-gray-100" />
                    <button
                      onClick={() => {
                        setGroupByColumnId(null);
                        setShowGroupMenu(false);
                      }}
                      className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] text-red-600 hover:bg-red-50"
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 4l8 8M4 12l8-8" />
                      </svg>
                      Remove grouping
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex-1" />

          <button className="flex items-center gap-1.5 rounded-sm px-2 py-1 text-[13px] text-airtable-text-secondary hover:bg-gray-100">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="7" cy="7" r="4" />
              <path d="M10 10l3 3" />
            </svg>
            Search
          </button>

          <div className="mx-2 h-4 w-px bg-airtable-border" />

          <button
            onClick={() => {
              if (selectedId && !addBulkRows.isPending) {
                addBulkRows.mutate({ tableId: selectedId, count: 100_000 });
              }
            }}
            disabled={addBulkRows.isPending}
            className="flex items-center gap-1.5 rounded-sm bg-amber-50 px-2.5 py-1 text-[13px] font-medium text-amber-700 hover:bg-amber-100 disabled:opacity-50"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 2v12M2 8h12" />
            </svg>
            {addBulkRows.isPending ? "Inserting rows..." : "Add 100k rows"}
          </button>
        </div>
      )}

      <div className="flex-1 overflow-hidden bg-white">
        {selectedId ? (
          <TableGrid tableId={selectedId} groupByColumnId={groupByColumnId} />
        ) : (
          <div className="flex h-64 items-center justify-center text-airtable-text-muted">
            Create a table to get started
          </div>
        )}
      </div>
    </div>
  );
}
