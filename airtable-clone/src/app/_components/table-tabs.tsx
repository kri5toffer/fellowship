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

  // Derive selected table ID (must be before hooks that depend on it)
  const tableList = tables ?? [];
  const selectedId = activeTableId ?? tableList[0]?.id ?? null;

  // This hook must be called unconditionally (before any early returns)
  const { data: activeTable } = api.table.getById.useQuery(
    { id: selectedId ?? "" },
    { enabled: !!selectedId },
  );

  // Reset active table when base changes
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
      <div className="flex h-64 items-center justify-center text-gray-400">
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
      {/* Toolbar with filter */}
      {selectedId && activeTable && (
        <div className="relative flex items-center gap-2 border-b border-airtable-border bg-white px-4 py-1.5">
          <FilterBar
            columnName={activeTable.columnName}
            filters={filters}
            onChange={setFilters}
          />
        </div>
      )}

      {/* Airtable-style tab bar */}
      <div className="flex items-end gap-0 bg-airtable-teal/80 px-3 pt-1">
        {tableList.map((t) => (
          <button
            key={t.id}
            onClick={() => handleTableSwitch(t.id)}
            className={`relative rounded-t-sm px-4 py-1.5 text-[13px] font-medium transition-all ${
              t.id === selectedId
                ? "bg-white text-gray-800 shadow-sm"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`}
          >
            {t.tableName}
          </button>
        ))}

        {creatingTable ? (
          <form
            className="flex items-center gap-1.5 px-2 pb-1.5"
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
              className="rounded border-none bg-white/90 px-2 py-1 text-[13px] text-gray-800 outline-none placeholder:text-gray-400"
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
              className="rounded bg-white px-2.5 py-1 text-[13px] font-medium text-airtable-teal hover:bg-white/90"
              disabled={createTable.isPending}
            >
              Add
            </button>
          </form>
        ) : (
          <button
            onClick={() => setCreatingTable(true)}
            className="mb-0.5 ml-0.5 rounded px-2.5 py-1 text-[13px] text-white/60 hover:bg-white/10 hover:text-white"
          >
            +
          </button>
        )}
      </div>

      {/* Grid area */}
      <div className="flex-1 overflow-auto bg-white">
        {selectedId ? (
          <TableGrid tableId={selectedId} filters={filters} />
        ) : (
          <div className="flex h-64 items-center justify-center text-gray-400">
            Create a table to get started
          </div>
        )}
      </div>
    </div>
  );
}
