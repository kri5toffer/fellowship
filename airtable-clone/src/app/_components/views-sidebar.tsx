"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import type { FilterCondition } from "./filter-bar";

type ViewRecord = {
  id: string;
  viewName: string;
  filters: unknown;
  groupByColumnId: string | null;
};

export function ViewsSidebar({
  tableId,
  activeViewId,
  filters,
  groupByColumnId,
  onSelectView,
}: {
  tableId: string;
  activeViewId: string | null;
  filters: FilterCondition[];
  groupByColumnId: string | null;
  onSelectView: (view: {
    id: string | null;
    filters: FilterCondition[];
    groupByColumnId: string | null;
  }) => void;
}) {
  const utils = api.useUtils();
  const { data: views = [], isLoading } = api.view.getByTable.useQuery(
    { tableId },
    { enabled: !!tableId },
  );

  const [showSaveForm, setShowSaveForm] = useState(false);
  const [newViewName, setNewViewName] = useState("");
  const [menuViewId, setMenuViewId] = useState<string | null>(null);

  const createView = api.view.create.useMutation({
    onSuccess: (view) => {
      void utils.view.getByTable.invalidate({ tableId });
      setShowSaveForm(false);
      setNewViewName("");
      onSelectView({
        id: view.id,
        filters: view.filters as FilterCondition[],
        groupByColumnId: view.groupByColumnId,
      });
    },
  });

  const deleteView = api.view.delete.useMutation({
    onSuccess: () => {
      void utils.view.getByTable.invalidate({ tableId });
      setMenuViewId(null);
      if (activeViewId === menuViewId) {
        onSelectView({ id: null, filters: [], groupByColumnId: null });
      }
    },
  });

  const handleSaveNewView = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newViewName.trim()) return;
    createView.mutate({
      tableId,
      viewName: newViewName.trim(),
      filters,
      groupByColumnId,
    });
  };

  if (!tableId) return null;

  return (
    <div className="flex w-52 shrink-0 flex-col border-r border-airtable-border bg-airtable-sidebar-bg">
      <div className="border-b border-airtable-border px-3 py-2">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-airtable-text-muted">
          Views
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto py-1">
        {/* All records (default) */}
        <button
          onClick={() =>
            onSelectView({ id: null, filters: [], groupByColumnId: null })
          }
          className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] ${
            activeViewId === null
              ? "bg-airtable-blue/10 font-medium text-airtable-blue"
              : "text-airtable-text-primary hover:bg-airtable-row-hover"
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="shrink-0"
          >
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v1h14V2a1 1 0 0 0-1-1H2zM1 5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5H1z" />
          </svg>
          All records
        </button>

        {isLoading ? (
          <div className="px-3 py-2 text-[12px] text-airtable-text-muted">
            Loading views...
          </div>
        ) : (
          views.map((view: ViewRecord) => (
            <div
              key={view.id}
              className="group relative flex items-center"
              onClick={() => setMenuViewId(null)}
            >
              <button
                onClick={() =>
                  onSelectView({
                    id: view.id,
                    filters: (view.filters as FilterCondition[]) ?? [],
                    groupByColumnId: view.groupByColumnId,
                  })
                }
                className={`flex flex-1 items-center gap-2 px-3 py-1.5 text-left text-[13px] ${
                  activeViewId === view.id
                    ? "bg-airtable-blue/10 font-medium text-airtable-blue"
                    : "text-airtable-text-primary hover:bg-airtable-row-hover"
                }`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="shrink-0"
                >
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v1h14V2a1 1 0 0 0-1-1H2zM1 5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5H1z" />
                </svg>
                <span className="min-w-0 truncate">{view.viewName}</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuViewId(menuViewId === view.id ? null : view.id);
                }}
                className="rounded p-0.5 opacity-70 hover:opacity-100 hover:bg-gray-200"
                title="View options"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="text-gray-400"
                >
                  <path d="M8 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                </svg>
              </button>
              {menuViewId === view.id && (
                <div
                  className="absolute left-full top-0 z-20 ml-1 w-36 rounded-md border border-gray-200 bg-white py-1 shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => {
                      deleteView.mutate({ id: view.id });
                    }}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] text-red-600 hover:bg-red-50"
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
                    Delete view
                  </button>
                </div>
              )}
            </div>
          ))
        )}

        {showSaveForm ? (
          <form
            className="px-2 py-1"
            onSubmit={handleSaveNewView}
          >
            <input
              autoFocus
              type="text"
              placeholder="View name"
              className="w-full rounded border border-airtable-border px-2 py-1 text-[13px] outline-none focus:border-airtable-blue"
              value={newViewName}
              onChange={(e) => setNewViewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setShowSaveForm(false);
                  setNewViewName("");
                }
              }}
            />
            <div className="mt-1 flex gap-1">
              <button
                type="submit"
                disabled={createView.isPending || !newViewName.trim()}
                className="rounded bg-airtable-blue px-2 py-1 text-[12px] font-medium text-white hover:bg-airtable-blue/90 disabled:opacity-50"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSaveForm(false);
                  setNewViewName("");
                }}
                className="rounded px-2 py-1 text-[12px] text-airtable-text-muted hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowSaveForm(true)}
            className="mx-2 mt-1 flex items-center gap-2 rounded px-2 py-1.5 text-[13px] text-airtable-text-muted hover:bg-airtable-row-hover hover:text-airtable-blue"
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
            New view
          </button>
        )}
      </div>

      {filters.length > 0 && !showSaveForm && (
        <div className="border-t border-airtable-border px-3 py-2">
          <p className="text-[11px] text-airtable-text-muted">
            {filters.length} filter{filters.length !== 1 ? "s" : ""} active
          </p>
          <button
            onClick={() => setShowSaveForm(true)}
            className="mt-1 text-[12px] font-medium text-airtable-blue hover:underline"
          >
            Save current view
          </button>
        </div>
      )}
    </div>
  );
}
