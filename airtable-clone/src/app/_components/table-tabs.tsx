"use client";

import { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import { TableGrid } from "./table-grid";
import { FilterBar, type FilterCondition } from "./filter-bar";

export function TableTabs({ baseId }: { baseId: string }) {
  const { data: tables, isLoading } = api.table.getAll.useQuery({ baseId });
  const utils = api.useUtils();
  const [activeTableId, setActiveTableId] = useState<string | null>(null);
  const [creatingTable, setCreatingTable] = useState(false);
  const [newTableName, setNewTableName] = useState("");
  const [filters, setFilters] = useState<FilterCondition[]>([]);

  const tableList = tables ?? [];
  const selectedId = activeTableId ?? tableList[0]?.id ?? null;

  const { data: activeTable } = api.table.getById.useQuery(
    { id: selectedId ?? "" },
    { enabled: !!selectedId },
  );

  useEffect(() => {
    setActiveTableId(null);
    setFilters([]);
  }, [baseId]);

  const createTable = api.table.create.useMutation({
    onSuccess: (newTable) => {
      void utils.table.getAll.invalidate({ baseId });
      setActiveTableId(newTable.id);
      setCreatingTable(false);
      setNewTableName("");
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
    setFilters([]);
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* Table tabs bar - Airtable style with colored background */}
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

      {/* View toolbar - Grid view, Filter, Sort, etc. */}
      {selectedId && activeTable && (
        <div className="flex items-center gap-1 border-b border-airtable-border bg-white px-3 py-1.5">
          {/* View selector */}
          <div className="flex items-center gap-1.5 rounded-sm bg-airtable-blue/10 px-2.5 py-1">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="text-airtable-blue">
              <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v1h14V2a1 1 0 0 0-1-1H2zM1 5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5H1z"/>
            </svg>
            <span className="text-[13px] font-medium text-airtable-blue">Grid view</span>
          </div>

          <div className="mx-2 h-4 w-px bg-airtable-border" />

          {/* Hide fields button */}
          <button className="flex items-center gap-1.5 rounded-sm px-2 py-1 text-[13px] text-airtable-text-secondary hover:bg-gray-100">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 3.5c-3.5 0-6 4.5-6 4.5s2.5 4.5 6 4.5 6-4.5 6-4.5-2.5-4.5-6-4.5z" />
              <circle cx="8" cy="8" r="2" />
            </svg>
            Hide fields
          </button>

          {/* Filter */}
          <FilterBar
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            columns={activeTable.columns}
            filters={filters}
            onChange={setFilters}
          />

          {/* Group button */}
          <button className="flex items-center gap-1.5 rounded-sm px-2 py-1 text-[13px] text-airtable-text-secondary hover:bg-gray-100">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="4" height="4" rx="1" />
              <rect x="2" y="10" width="4" height="4" rx="1" />
              <rect x="10" y="2" width="4" height="4" rx="1" />
              <rect x="10" y="10" width="4" height="4" rx="1" />
            </svg>
            Group
          </button>

          {/* Sort button */}
          <button className="flex items-center gap-1.5 rounded-sm px-2 py-1 text-[13px] text-airtable-text-secondary hover:bg-gray-100">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 4h12M4 8h8M6 12h4" />
            </svg>
            Sort
          </button>

          {/* Color button */}
          <button className="flex items-center gap-1.5 rounded-sm px-2 py-1 text-[13px] text-airtable-text-secondary hover:bg-gray-100">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="text-airtable-yellow">
              <circle cx="8" cy="8" r="6" />
            </svg>
            Color
          </button>

          <div className="flex-1" />

          {/* Search */}
          <button className="flex items-center gap-1.5 rounded-sm px-2 py-1 text-[13px] text-airtable-text-secondary hover:bg-gray-100">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="7" cy="7" r="4" />
              <path d="M10 10l3 3" />
            </svg>
            Search
          </button>
        </div>
      )}

      {/* Grid area */}
      <div className="flex-1 overflow-auto bg-white">
        {selectedId ? (
          <TableGrid tableId={selectedId} filters={filters} />
        ) : (
          <div className="flex h-64 items-center justify-center text-airtable-text-muted">
            Create a table to get started
          </div>
        )}
      </div>
    </div>
  );
}
