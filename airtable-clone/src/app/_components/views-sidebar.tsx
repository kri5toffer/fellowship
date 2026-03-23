"use client";

import { useState, useEffect } from "react";
import {
  Columns,
  GripVertical,
  LayoutGrid,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Settings,
  Star,
  Trash2,
} from "lucide-react";
import { api } from "~/trpc/react";
import { type FilterGroup, countConditions } from "./filter-bar";
import type { Prisma } from "../../../generated/prisma";

type ViewRecord = {
  id: string;
  viewName: string;
  filters: Prisma.JsonValue;
  groupByColumnId: string | null;
  sortConfig: Prisma.JsonValue;
  hiddenFieldIds: Prisma.JsonValue;
  color: string | null;
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
  return <LayoutGrid className={`${className} text-[#166ee1]`} />;
}

export function ViewsSidebar({
  tableId,
  activeViewId,
  filterGroup,
  groupByColumnId,
  sortConfig,
  hiddenFieldIds,
  color,
  onSelectView,
}: {
  tableId: string;
  activeViewId: string | null;
  filterGroup: FilterGroup;
  groupByColumnId: string | null;
  sortConfig: { columnId: string; direction: "asc" | "desc" } | null;
  hiddenFieldIds: string[];
  color: string | null;
  onSelectView: (view: {
    id: string | null;
    filters: unknown;
    groupByColumnId: string | null;
    sortConfig: { columnId: string; direction: "asc" | "desc" } | null;
    hiddenFieldIds: string[];
    color: string | null;
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
  const [renamingViewId, setRenamingViewId] = useState<string | null>(null);
  const [renameViewName, setRenameViewName] = useState("");
  const [defaultViewLabel, setDefaultViewLabel] = useState("Grid view");
  const [renamingDefault, setRenamingDefault] = useState(false);
  const [menuDefaultOpen, setMenuDefaultOpen] = useState(false);
  const [dragViewId, setDragViewId] = useState<string | null>(null);
  const [dropViewTargetId, setDropViewTargetId] = useState<string | null>(null);

  const createView = api.view.create.useMutation({
    onMutate: async (variables) => {
      await utils.view.getByTable.cancel({ tableId });
      const previousViews = utils.view.getByTable.getData({ tableId });
      const now = new Date();
      const tempView: ViewRecord = {
        id: `temp-${Date.now()}`,
        viewName: variables.viewName,
        filters: variables.filters as unknown as Prisma.JsonValue,
        groupByColumnId: variables.groupByColumnId ?? null,
        sortConfig: (variables.sortConfig ?? null) as unknown as Prisma.JsonValue,
        hiddenFieldIds: (variables.hiddenFieldIds ?? []) as unknown as Prisma.JsonValue,
        color: variables.color ?? null,
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
        filters: view.filters,
        groupByColumnId: view.groupByColumnId,
        sortConfig: view.sortConfig as { columnId: string; direction: "asc" | "desc" } | null,
        hiddenFieldIds: (view.hiddenFieldIds as string[]) ?? [],
        color: view.color ?? null,
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
        onSelectView({ id: null, filters: [], groupByColumnId: null, sortConfig: null, hiddenFieldIds: [], color: null });
      }
    },
  });

  const renameView = api.view.update.useMutation({
    onMutate: async (variables) => {
      await utils.view.getByTable.cancel({ tableId });
      const previousViews = utils.view.getByTable.getData({ tableId });
      utils.view.getByTable.setData({ tableId }, (old) =>
        (old ?? []).map((v) =>
          v.id === variables.id ? { ...v, viewName: variables.viewName ?? v.viewName } : v,
        ),
      );
      return { previousViews };
    },
    onError: (_err, _variables, context) => {
      utils.view.getByTable.setData({ tableId }, context?.previousViews);
    },
    onSettled: () => {
      void utils.view.getByTable.invalidate({ tableId });
    },
    onSuccess: () => {
      setRenamingViewId(null);
      setMenuViewId(null);
    },
  });

  const reorderViews = api.view.reorder.useMutation({
    onMutate: async (variables) => {
      await utils.view.getByTable.cancel({ tableId });
      const previousViews = utils.view.getByTable.getData({ tableId });
      utils.view.getByTable.setData({ tableId }, (old) => {
        if (!old) return old;
        const viewMap = new Map(old.map((v) => [v.id, v]));
        return variables.viewIds
          .map((id) => viewMap.get(id))
          .filter((v): v is typeof old[0] => !!v);
      });
      return { previousViews };
    },
    onError: (_err, _variables, context) => {
      utils.view.getByTable.setData({ tableId }, context?.previousViews);
    },
    onSettled: () => {
      void utils.view.getByTable.invalidate({ tableId });
    },
  });

  // Global Esc closes all open menus / forms in this sidebar
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuViewId(null);
      setMenuDefaultOpen(false);
      setShowSaveForm(false);
      setNewViewName("");
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleSaveNewView = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newViewName.trim()) return;
    createView.mutate({
      tableId,
      viewName: newViewName.trim(),
      filters: filterGroup as unknown as Record<string, unknown>,
      groupByColumnId,
      sortConfig: sortConfig ?? null,
      hiddenFieldIds,
      color: color ?? undefined,
    });
  };

  const filteredViews = views.filter((v) =>
    v.viewName.toLowerCase().includes(viewSearch.toLowerCase())
  );

  if (!tableId) return null;

  return (
    <div className="flex w-[280px] shrink-0 flex-col border-r border-airtable-border bg-white">
      {/* Create new... button */}
      <div style={{ padding: "10px 8px 0" }}>
        <button
          type="button"
          onClick={() => setShowSaveForm(true)}
          className="flex w-full cursor-pointer items-center rounded-md border-none bg-transparent text-left text-[13px] leading-[22px] text-airtable-text-primary hover:bg-[#f2f4f8]"
          style={{ height: 32, paddingLeft: 12, paddingRight: 12 }}
        >
          <Plus className="mr-2 size-4 shrink-0 text-airtable-text-primary" />
          <span className="truncate">Create new...</span>
        </button>
      </div>

      {/* Find a view search bar */}
      <div style={{ padding: "4px 8px 8px" }}>
        <div className="relative">
          <div className="flex w-full items-center">
            <input
              type="text"
              placeholder="Find a view"
              value={viewSearch}
              onChange={(e) => setViewSearch(e.target.value)}
              className="w-full rounded border border-transparent bg-transparent py-1.5 pr-8 pl-7 text-[13px] leading-[18px] text-airtable-text-secondary outline-none placeholder:text-airtable-text-muted focus:border-airtable-blue"
            />
            <Search className="absolute left-2 size-3.5 shrink-0 text-airtable-text-secondary" />
            <button
              type="button"
              className="absolute right-1 flex items-center justify-center rounded p-1 text-airtable-text-primary hover:bg-[#f2f4f8]"
              title="View options"
            >
              <Settings className="size-4" />
            </button>
          </div>
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
            <div
              className={`group relative flex items-center rounded ${
                activeViewId === null ? "bg-[#e8eaf0]" : "hover:bg-[#f2f4f8]"
              }`}
              style={{ height: 36, margin: "0 4px", padding: "0 8px" }}
              onClick={() => setMenuDefaultOpen(false)}
            >
              {renamingDefault ? (
                <form
                  className="flex flex-1 items-center px-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (renameViewName.trim()) setDefaultViewLabel(renameViewName.trim());
                    setRenamingDefault(false);
                  }}
                >
                  <input
                    autoFocus
                    value={renameViewName}
                    onChange={(e) => setRenameViewName(e.target.value)}
                    onBlur={() => {
                      if (renameViewName.trim()) setDefaultViewLabel(renameViewName.trim());
                      setRenamingDefault(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setRenamingDefault(false);
                    }}
                    className="w-full rounded border border-airtable-blue bg-white px-1.5 py-0.5 text-[13px] outline-none"
                  />
                </form>
              ) : (
                <button
                  onClick={() =>
                    onSelectView({ id: null, filters: [], groupByColumnId: null, sortConfig: null, hiddenFieldIds: [], color: null })
                  }
                  className="flex flex-1 items-center gap-2 text-left text-[13px] text-airtable-text-primary"
                  style={{ height: "100%" }}
                >
                  <LayoutGrid className="size-4 shrink-0 text-[#166ee1]" />
                  <span className="min-w-0 flex-1 truncate font-medium leading-[16.25px]">{defaultViewLabel}</span>
                </button>
              )}
              {!renamingDefault && (
                <div className="flex shrink-0 items-center gap-0.5 pr-1 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuDefaultOpen((v) => !v);
                      setMenuViewId(null);
                    }}
                    className="flex h-6 w-6 items-center justify-center rounded hover:bg-gray-200"
                    title="View options"
                  >
                    <MoreHorizontal className="size-3.5 text-gray-500" />
                  </button>
                  <button
                    type="button"
                    className="flex h-6 w-6 cursor-grab items-center justify-center rounded hover:bg-gray-200"
                    title="Drag to reorder"
                  >
                    <GripVertical className="size-3.5 text-gray-500" />
                  </button>
                </div>
              )}
              {menuDefaultOpen && (
                <div
                  className="absolute left-0 top-full z-30 w-56 rounded-md border border-gray-200 bg-white py-1 shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Add to My favorites — visual only */}
                  <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
                    <Star className="size-3.5 text-gray-500" />
                    Add to &apos;My favorites&apos;
                  </button>
                  <div className="my-1 border-t border-gray-100" />
                  {/* Rename — functional */}
                  <button
                    onClick={() => {
                      setRenameViewName(defaultViewLabel);
                      setRenamingDefault(true);
                      setMenuDefaultOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50"
                  >
                    <Pencil className="size-3.5 text-gray-500" />
                    Rename view
                  </button>
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="px-3 py-2 text-[12px] text-airtable-text-muted">
                Loading views...
              </div>
            ) : (
              filteredViews.map((view: ViewRecord) => (
                <div
                  key={view.id}
                  className={`group relative flex items-center rounded ${
                    dragViewId === view.id ? "opacity-40" : ""
                  } ${dropViewTargetId === view.id ? "border-t-2 border-t-airtable-blue" : ""} ${
                    activeViewId === view.id ? "bg-[#e8eaf0]" : "hover:bg-[#f2f4f8]"
                  }`}
                  style={{ height: 36, margin: "0 4px", padding: "0 8px" }}
                  onClick={() => setMenuViewId(null)}
                  onDragOver={(e) => {
                    if (!dragViewId || dragViewId === view.id) return;
                    e.preventDefault();
                    setDropViewTargetId(view.id);
                  }}
                  onDragLeave={() => setDropViewTargetId(null)}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (!dragViewId || dragViewId === view.id) {
                      setDragViewId(null);
                      setDropViewTargetId(null);
                      return;
                    }
                    const ids = filteredViews.map((v) => v.id);
                    const fromIdx = ids.indexOf(dragViewId);
                    const toIdx = ids.indexOf(view.id);
                    if (fromIdx === -1 || toIdx === -1) return;
                    ids.splice(fromIdx, 1);
                    ids.splice(toIdx, 0, dragViewId);
                    reorderViews.mutate({ tableId, viewIds: ids });
                    setDragViewId(null);
                    setDropViewTargetId(null);
                  }}
                >
                  {renamingViewId === view.id ? (
                    <form
                      className="flex flex-1 items-center px-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (renameViewName.trim()) {
                          renameView.mutate({ id: view.id, viewName: renameViewName.trim() });
                        }
                      }}
                    >
                      <input
                        autoFocus
                        value={renameViewName}
                        onChange={(e) => setRenameViewName(e.target.value)}
                        onBlur={() => {
                          if (renameViewName.trim()) {
                            renameView.mutate({ id: view.id, viewName: renameViewName.trim() });
                          } else {
                            setRenamingViewId(null);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") setRenamingViewId(null);
                        }}
                        className="w-full rounded border border-airtable-blue bg-white px-1.5 py-0.5 text-[13px] outline-none"
                      />
                    </form>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          onSelectView({
                            id: view.id,
                            filters: view.filters,
                            groupByColumnId: view.groupByColumnId,
                            sortConfig: view.sortConfig as { columnId: string; direction: "asc" | "desc" } | null,
                            hiddenFieldIds: (view.hiddenFieldIds as string[]) ?? [],
                            color: view.color ?? null,
                          })
                        }
                        className="flex flex-1 items-center gap-2 px-3 text-left text-[13px] text-airtable-text-primary"
                        style={{ height: 32 }}
                      >
                        <ViewIcon viewName={view.viewName} />
                        <span className="min-w-0 flex-1 truncate">{view.viewName}</span>
                      </button>
                      <div className="flex shrink-0 items-center gap-0.5 pr-1 opacity-0 group-hover:opacity-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setMenuViewId(menuViewId === view.id ? null : view.id);
                            setMenuDefaultOpen(false);
                          }}
                          className="flex h-6 w-6 items-center justify-center rounded hover:bg-gray-200"
                          title="View options"
                        >
                          <MoreHorizontal className="size-3.5 text-gray-500" />
                        </button>
                        <button
                          type="button"
                          draggable
                          onDragStart={(e) => {
                            setDragViewId(view.id);
                            e.dataTransfer.effectAllowed = "move";
                            e.dataTransfer.setData("text/plain", view.id);
                          }}
                          onDragEnd={() => {
                            setDragViewId(null);
                            setDropViewTargetId(null);
                          }}
                          className="flex h-6 w-6 cursor-grab items-center justify-center rounded hover:bg-gray-200 active:cursor-grabbing"
                          title="Drag to reorder"
                        >
                          <GripVertical className="size-3.5 text-gray-500" />
                        </button>
                      </div>
                    </>
                  )}
                  {menuViewId === view.id && (
                    <div
                      className="absolute left-0 top-full z-30 w-56 rounded-md border border-gray-200 bg-white py-1 shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Add to favorites — visual only */}
                      <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
                        <Star className="size-3.5 text-gray-500" />
                        Add to &apos;My favorites&apos;
                      </button>
                      <div className="my-1 border-t border-gray-100" />
                      {/* Rename — functional */}
                      <button
                        onClick={() => {
                          setRenameViewName(view.viewName);
                          setRenamingViewId(view.id);
                          setMenuViewId(null);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50"
                      >
                        <Pencil className="size-3.5 text-gray-500" />
                        Rename view
                      </button>
                      {/* Delete — functional */}
                      <button
                        onClick={() => deleteView.mutate({ id: view.id })}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-red-600 hover:bg-red-50"
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

      {countConditions(filterGroup) > 0 && !showSaveForm && (() => {
        const count = countConditions(filterGroup);
        return (
          <div className="border-t border-airtable-border px-3 py-2">
            <p className="text-[11px] text-airtable-text-muted">
              {count} filter{count !== 1 ? "s" : ""} active
            </p>
            <button
              onClick={() => setShowSaveForm(true)}
              className="mt-1 text-[12px] font-medium text-airtable-blue hover:underline"
            >
              Save current view
            </button>
          </div>
        );
      })()}
    </div>
  );
}
