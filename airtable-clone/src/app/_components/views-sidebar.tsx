"use client";

import { useState } from "react";
import {
  ChevronDown,
  Columns,
  LayoutGrid,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Trash2,
} from "lucide-react";
import { api } from "~/trpc/react";
import type { FilterCondition } from "./filter-bar";

type ViewRecord = {
  id: string;
  viewName: string;
  filters: unknown;
  groupByColumnId: string | null;
  createdAt: Date;
  updatedAt: Date;
  displayOrder: number;
  tableId: string;
};

/** Icon for view type - Kanban uses green columns, others use grid */
function ViewIcon({
  viewName,
  className = "size-3.5 shrink-0",
}: {
  viewName: string;
  className?: string;
}) {
  const isKanban = viewName.toLowerCase().includes("kanban");
  if (isKanban) {
    return <Columns className={className} style={{ color: "#20c933" }} />;
  }
  return <LayoutGrid className={`${className} text-airtable-text-secondary`} />;
}

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
  const [viewSearch, setViewSearch] = useState("");

  const createView = api.view.create.useMutation({
    onMutate: async (variables) => {
      await utils.view.getByTable.cancel({ tableId });
      const previousViews = utils.view.getByTable.getData({ tableId });
      const now = new Date();
      const tempView: ViewRecord = {
        id: `temp-${Date.now()}`,
        viewName: variables.viewName,
        filters: variables.filters,
        groupByColumnId: variables.groupByColumnId ?? null,
        createdAt: now,
        updatedAt: now,
        displayOrder: 0,
        tableId,
      };
      utils.view.getByTable.setData({ tableId }, (old) => [...(old ?? []), tempView]);
      return { previousViews };
    },
    onError: (_err, _variables, context) => {
      utils.view.getByTable.setData({ tableId }, context?.previousViews);
    },
    onSettled: () => {
      void utils.view.getByTable.invalidate({ tableId });
    },
    onSuccess: (view) => {
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
    onMutate: async (variables) => {
      await utils.view.getByTable.cancel({ tableId });
      const previousViews = utils.view.getByTable.getData({ tableId });
      utils.view.getByTable.setData({ tableId }, (old) =>
        (old ?? []).filter((v) => v.id !== variables.id),
      );
      return { previousViews };
    },
    onError: (_err, _variables, context) => {
      utils.view.getByTable.setData({ tableId }, context?.previousViews);
    },
    onSettled: () => {
      void utils.view.getByTable.invalidate({ tableId });
    },
    onSuccess: (_data, variables) => {
      setMenuViewId(null);
      if (activeViewId === variables.id) {
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

  const filteredViews = views.filter((v) =>
    v.viewName.toLowerCase().includes(viewSearch.toLowerCase())
  );

  if (!tableId) return null;

  return (
    <div className="flex w-52 shrink-0 flex-col border-r border-airtable-border bg-white">
      {/* Grid view header - hamburger, grid icon, "Grid view", chevron */}
      <div className="flex items-center gap-2 border-b border-airtable-border px-3 py-2.5">
        <button
          type="button"
          className="rounded p-1 text-airtable-text-muted hover:bg-gray-100 hover:text-airtable-text-primary"
          title="Menu"
        >
          <Menu className="size-4" />
        </button>
        <LayoutGrid className="size-4 shrink-0 text-airtable-text-secondary" />
        <span className="flex-1 text-[13px] font-medium text-airtable-text-primary">
          Grid view
        </span>
        <button
          type="button"
          className="rounded p-0.5 text-airtable-text-muted hover:bg-gray-100"
        >
          <ChevronDown className="size-4" />
        </button>
      </div>

      {/* Create new... button */}
      <div className="border-b border-airtable-border px-3 py-2">
        <button
          onClick={() => setShowSaveForm(true)}
          className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-airtable-row-hover"
        >
          <Plus className="size-4 shrink-0 text-airtable-text-secondary" />
          Create new...
        </button>
      </div>

      {/* Find a view search bar */}
      <div className="border-b border-airtable-border px-2 py-2">
        <div className="flex items-center gap-2 rounded-md border border-airtable-border bg-white px-2.5 py-1.5">
          <Search className="size-3.5 shrink-0 text-airtable-text-muted" />
          <input
            type="text"
            placeholder="Find a view"
            value={viewSearch}
            onChange={(e) => setViewSearch(e.target.value)}
            className="flex-1 bg-transparent text-[13px] text-airtable-text-primary outline-none placeholder:text-airtable-text-muted"
          />
          <button
            type="button"
            className="rounded p-0.5 text-airtable-text-muted hover:bg-gray-100"
            title="View options"
          >
            <Settings className="size-3.5" />
          </button>
        </div>
      </div>

      {/* View list */}
      <div className="flex-1 overflow-y-auto py-1">
        {showSaveForm ? (
          <form className="px-2 py-1" onSubmit={handleSaveNewView}>
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
          <>
            {/* Grid view (default / All records) */}
            <button
              onClick={() =>
                onSelectView({ id: null, filters: [], groupByColumnId: null })
              }
              className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] ${
                activeViewId === null
                  ? "bg-gray-100 font-medium text-airtable-text-primary"
                  : "text-airtable-text-primary hover:bg-airtable-row-hover"
              }`}
            >
              <LayoutGrid className="size-3.5 shrink-0 text-airtable-text-secondary" />
              Grid view
            </button>

            {isLoading ? (
              <div className="px-3 py-2 text-[12px] text-airtable-text-muted">
                Loading views...
              </div>
            ) : (
              filteredViews.map((view: ViewRecord) => (
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
                        ? "bg-gray-100 font-medium text-airtable-text-primary"
                        : "text-airtable-text-primary hover:bg-airtable-row-hover"
                    }`}
                  >
                    <ViewIcon viewName={view.viewName} />
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
                    <MoreHorizontal className="size-3 text-gray-400" />
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
                        <Trash2 className="size-3.5" />
                        Delete view
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </>
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
