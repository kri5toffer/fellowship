"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowDownUp,
  Calendar,
  Check,
  CheckSquare,
  ChevronDown,
  Hash,
  Palette,
  Plus,
  Search,
  SquareArrowOutUpRight,
  SquareSplitHorizontal,
  Type,
  X,
} from "lucide-react";
import { api } from "~/trpc/react";
import { TableGrid } from "./table-grid";
import { FilterBar, type FilterCondition } from "./filter-bar";
import { HideFieldsPanel } from "./hide-fields-panel";
import { ViewsSidebar } from "./views-sidebar";
import { Button } from "~/components/ui/button";

const FIELD_TYPE_ICONS: Record<string, React.ReactNode> = {
  TEXT: <Type className="size-3.5 text-gray-500" />,
  NUMBER: <Hash className="size-3.5 text-orange-500" />,
  CHECKBOX: <CheckSquare className="size-3.5 text-purple-500" />,
  DATE: <Calendar className="size-3.5 text-cyan-600" />,
};

export function TableTabs({ baseId }: { baseId: string }) {
  const { data: tables, isLoading } = api.table.getAll.useQuery({ baseId });
  const utils = api.useUtils();
  const [activeTableId, setActiveTableId] = useState<string | null>(null);
  const [creatingTable, setCreatingTable] = useState(false);
  const [newTableName, setNewTableName] = useState("");
  const [groupByColumnId, setGroupByColumnId] = useState<string | null>(null);
  const [showGroupMenu, setShowGroupMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortSearchQuery, setSortSearchQuery] = useState("");
  const sortMenuRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<FilterCondition[]>([]);
  const [activeViewId, setActiveViewId] = useState<string | null>(null);
  const [hiddenFieldIds, setHiddenFieldIds] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ columnId: string; direction: "asc" | "desc" } | null>(null);
  const [tableMenuId, setTableMenuId] = useState<string | null>(null);
  const [renamingTableId, setRenamingTableId] = useState<string | null>(null);
  const [renameTableValue, setRenameTableValue] = useState("");
  const tableMenuRef = useRef<HTMLDivElement>(null);

  const tableList = tables ?? [];
  const selectedId = activeTableId ?? tableList[0]?.id ?? null;

  const { data: activeTable } = api.table.getById.useQuery(
    { id: selectedId ?? "" },
    { enabled: !!selectedId }
  );

  useEffect(() => {
    setActiveTableId(null);
    setGroupByColumnId(null);
    setFilters([]);
    setActiveViewId(null);
    setShowSearch(false);
    setSearchQuery("");
    setSortConfig(null);
  }, [baseId]);

  useEffect(() => {
    setGroupByColumnId(null);
    setFilters([]);
    setActiveViewId(null);
    setShowSearch(false);
    setSearchQuery("");
    setSortConfig(null);
  }, [selectedId]);

  useEffect(() => {
    if (!showSortMenu) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(e.target as Node)) {
        setShowSortMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSortMenu]);

  useEffect(() => {
    if (!tableMenuId) return;
    const handler = (e: MouseEvent) => {
      if (tableMenuRef.current && !tableMenuRef.current.contains(e.target as Node)) {
        setTableMenuId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [tableMenuId]);

  const handleSelectView = (view: {
    id: string | null;
    filters: FilterCondition[];
    groupByColumnId: string | null;
  }) => {
    setActiveViewId(view.id);
    setFilters(view.filters);
    setGroupByColumnId(view.groupByColumnId);
  };

  const createTable = api.table.create.useMutation({
    onMutate: async (variables) => {
      await utils.table.getAll.cancel({ baseId });
      const previousTables = utils.table.getAll.getData({ baseId });
      utils.table.getAll.setData({ baseId }, (old) => [
        ...(old ?? []),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { id: `temp-${Date.now()}`, tableName: variables.tableName, baseId: variables.baseId } as any,
      ]);
      return { previousTables };
    },
    onError: (_err, _variables, context) => {
      utils.table.getAll.setData({ baseId }, context?.previousTables);
    },
    onSettled: () => {
      void utils.table.getAll.invalidate({ baseId });
    },
    onSuccess: (newTable) => {
      setActiveTableId(newTable.id);
      setCreatingTable(false);
      setNewTableName("");
    },
  });

  const deleteTable = api.table.deleteTable.useMutation({
    onMutate: async (variables) => {
      await utils.table.getAll.cancel({ baseId });
      const previousTables = utils.table.getAll.getData({ baseId });
      utils.table.getAll.setData({ baseId }, (old) => (old ?? []).filter((t) => t.id !== variables.tableId));
      return { previousTables };
    },
    onError: (_err, _variables, context) => {
      utils.table.getAll.setData({ baseId }, context?.previousTables);
    },
    onSettled: () => { void utils.table.getAll.invalidate({ baseId }); },
    onSuccess: (_data, variables) => {
      if (selectedId === variables.tableId) setActiveTableId(null);
    },
  });

  const renameTable = api.table.renameTable.useMutation({
    onMutate: async (variables) => {
      await utils.table.getAll.cancel({ baseId });
      const previousTables = utils.table.getAll.getData({ baseId });
      utils.table.getAll.setData({ baseId }, (old) =>
        (old ?? []).map((t) => t.id === variables.tableId ? { ...t, tableName: variables.tableName } : t),
      );
      return { previousTables };
    },
    onError: (_err, _variables, context) => {
      utils.table.getAll.setData({ baseId }, context?.previousTables);
    },
    onSettled: () => { void utils.table.getAll.invalidate({ baseId }); },
    onSuccess: () => { setRenamingTableId(null); setRenameTableValue(""); },
  });

  const updateView = api.view.update.useMutation({
    onMutate: async (variables) => {
      const tableId = selectedId ?? "";
      await utils.view.getByTable.cancel({ tableId });
      const previousViews = utils.view.getByTable.getData({ tableId });
      utils.view.getByTable.setData({ tableId }, (old) =>
        (old ?? []).map((v) =>
          v.id === variables.id
            ? {
                ...v,
                filters: variables.filters ?? v.filters,
                groupByColumnId:
                  variables.groupByColumnId !== undefined
                    ? variables.groupByColumnId
                    : v.groupByColumnId,
              }
            : v,
        ),
      );
      return { previousViews, tableId };
    },
    onError: (_err, _variables, context) => {
      if (context) {
        utils.view.getByTable.setData({ tableId: context.tableId }, context.previousViews);
      }
    },
    onSettled: () => {
      void utils.view.getByTable.invalidate({ tableId: selectedId ?? "" });
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
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Table tabs bar */}
      <nav
        aria-label="Tables"
        className="flex flex-none items-center border-b border-gray-200 bg-white px-2"
        style={{ height: 40 }}
      >
        <div className="flex min-w-0 flex-1 items-center">
          {tableList.map((t, idx) => (
            <div key={t.id} className="relative flex items-center">
              {idx > 0 && (
                <span className="select-none px-0.5 text-[13px] text-gray-300">|</span>
              )}

              {renamingTableId === t.id ? (
                <form
                  className="flex items-center"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (renameTableValue.trim()) renameTable.mutate({ tableId: t.id, tableName: renameTableValue.trim() });
                  }}
                >
                  <input
                    autoFocus
                    value={renameTableValue}
                    onChange={(e) => setRenameTableValue(e.target.value)}
                    onBlur={() => {
                      if (renameTableValue.trim()) renameTable.mutate({ tableId: t.id, tableName: renameTableValue.trim() });
                      else { setRenamingTableId(null); setRenameTableValue(""); }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") { setRenamingTableId(null); setRenameTableValue(""); }
                    }}
                    className="rounded border border-airtable-blue bg-white px-2 py-0.5 text-[13px] text-gray-900 outline-none"
                  />
                </form>
              ) : (
                <button
                  onClick={() => handleTableSwitch(t.id)}
                  className={`flex items-center gap-1 rounded px-2.5 py-1 text-[13px] transition-colors ${
                    t.id === selectedId
                      ? "font-semibold text-gray-900"
                      : "font-normal text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <span className="truncate max-w-[140px]">{t.tableName}</span>
                  {t.id === selectedId && (
                    <span
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTableMenuId(tableMenuId === t.id ? null : t.id);
                      }}
                      className="flex items-center"
                    >
                      <ChevronDown className="size-3.5 shrink-0 text-gray-500" />
                    </span>
                  )}
                </button>
              )}

              {tableMenuId === t.id && (
                <div
                  ref={tableMenuRef}
                  className="absolute left-0 top-full z-40 mt-0.5 w-44 rounded-md border border-gray-200 bg-white py-1 shadow-lg"
                >
                  <button
                    onClick={() => { setRenamingTableId(t.id); setRenameTableValue(t.tableName); setTableMenuId(null); }}
                    className="flex w-full items-center px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50"
                  >
                    Rename table
                  </button>
                  <button
                    onClick={() => { deleteTable.mutate({ tableId: t.id }); setTableMenuId(null); }}
                    className="flex w-full items-center px-3 py-1.5 text-left text-[13px] text-red-600 hover:bg-red-50"
                  >
                    Delete table
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Add or import */}
          {creatingTable ? (
            <form
              className="flex items-center gap-1.5 px-2"
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
                className="rounded border border-gray-300 px-2 py-0.5 text-[13px] text-gray-900 outline-none focus:border-airtable-blue"
                value={newTableName}
                onChange={(e) => setNewTableName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") { setCreatingTable(false); setNewTableName(""); }
                }}
              />
              <button
                type="submit"
                className="rounded bg-airtable-blue px-2.5 py-0.5 text-[13px] font-medium text-white hover:bg-airtable-blue/90"
                disabled={createTable.isPending}
              >
                Create
              </button>
            </form>
          ) : (
            <button
              onClick={() => setCreatingTable(true)}
              className="ml-1 flex items-center gap-1 rounded px-2 py-1 text-[13px] text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              title="Add table"
            >
              <Plus className="size-3.5 shrink-0" />
            </button>
          )}
        </div>

        {/* Overflow chevron - far right */}
        <button
          type="button"
          className="ml-1 flex items-center rounded px-1.5 py-1 text-gray-500 hover:bg-gray-100"
          title="More tables"
        >
          <ChevronDown className="size-4" />
        </button>
      </nav>

      {selectedId && (
        <div className="flex items-center gap-1 border-b border-airtable-border bg-white px-3 py-1.5">
          {/* Spacer - pushes tools to the right */}
          <div className="flex-1" />

          {/* Tools - right-aligned, order: Hide, Filter, Group, Sort, Color, Share and sync, Search */}
          <HideFieldsPanel
            columns={activeTable?.columns ?? []}
            hiddenFieldIds={hiddenFieldIds}
            onChange={setHiddenFieldIds}
          />

          <FilterBar
            columns={activeTable?.columns ?? []}
            filters={filters}
            onChange={(f) => {
              setFilters(f);
              if (activeViewId) {
                updateView.mutate({
                  id: activeViewId,
                  filters: f,
                  groupByColumnId: groupByColumnId ?? undefined,
                });
              }
            }}
          />

          {/* Sort button */}
          <div ref={sortMenuRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setShowSortMenu(!showSortMenu);
                setShowGroupMenu(false);
              }}
              className={`flex items-center gap-1.5 rounded-sm px-2 py-1 text-[13px] transition-colors ${
                sortConfig
                  ? "bg-orange-100 font-medium text-orange-700"
                  : "text-airtable-text-secondary hover:bg-gray-100"
              }`}
            >
              <ArrowDownUp className="size-3.5" />
              Sort
              {sortConfig && (
                <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                  1
                </span>
              )}
            </button>

            {showSortMenu && (
              <div
                className="absolute left-0 top-full z-30 mt-1 w-72 rounded-lg border border-gray-200 bg-white shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="border-b border-gray-100 px-4 py-3">
                  <h3 className="text-[13px] font-semibold text-airtable-text-primary">Sort by</h3>
                  <p className="text-[12px] text-airtable-text-muted">Click a field to sort by it</p>
                </div>

                {/* Active sort */}
                {sortConfig && (() => {
                  const activeCol = activeTable?.columns.find((c) => c.id === sortConfig.columnId);
                  const isNumber = activeCol?.fieldType === "NUMBER";
                  return (
                    <div className="border-b border-gray-100 px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="shrink-0">{FIELD_TYPE_ICONS[activeCol?.fieldType ?? "TEXT"] ?? FIELD_TYPE_ICONS.TEXT}</span>
                        <span className="flex-1 truncate text-[13px] font-medium text-airtable-text-primary">
                          {activeCol?.columnName}
                        </span>
                        <div className="flex rounded-md border border-gray-200 text-[12px]">
                          <button
                            onClick={() => setSortConfig({ ...sortConfig, direction: "asc" })}
                            className={`rounded-l-md px-2 py-1 transition-colors ${
                              sortConfig.direction === "asc"
                                ? "bg-orange-500 text-white"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            {isNumber ? "1→9" : "A→Z"}
                          </button>
                          <button
                            onClick={() => setSortConfig({ ...sortConfig, direction: "desc" })}
                            className={`rounded-r-md border-l border-gray-200 px-2 py-1 transition-colors ${
                              sortConfig.direction === "desc"
                                ? "bg-orange-500 text-white"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            {isNumber ? "9→1" : "Z→A"}
                          </button>
                        </div>
                        <button
                          onClick={() => setSortConfig(null)}
                          className="rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                          title="Remove sort"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })()}

                {/* Column picker */}
                <div className="p-2">
                  <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1.5">
                    <Search className="size-3.5 shrink-0 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Find a field"
                      value={sortSearchQuery}
                      onChange={(e) => setSortSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent text-[13px] text-airtable-text-primary outline-none placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div className="max-h-[200px] overflow-y-auto py-1">
                  {activeTable?.columns
                    .filter(
                      (col) =>
                        !sortSearchQuery ||
                        col.columnName.toLowerCase().includes(sortSearchQuery.toLowerCase()),
                    )
                    .map((col) => {
                      const isActive = sortConfig?.columnId === col.id;
                      const isNumber = col.fieldType === "NUMBER";
                      return (
                        <button
                          key={col.id}
                          type="button"
                          onClick={() => {
                            setSortConfig(
                              isActive
                                ? { columnId: col.id, direction: sortConfig!.direction === "asc" ? "desc" : "asc" }
                                : { columnId: col.id, direction: "asc" },
                            );
                          }}
                          className={`flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] hover:bg-gray-50 ${
                            isActive ? "bg-orange-50 text-orange-700" : "text-airtable-text-primary"
                          }`}
                        >
                          <span className="shrink-0">{FIELD_TYPE_ICONS[col.fieldType] ?? FIELD_TYPE_ICONS.TEXT}</span>
                          <span className="flex-1 truncate">{col.columnName}</span>
                          {isActive && (
                            <span className="shrink-0 text-[11px] font-medium text-orange-600">
                              {sortConfig.direction === "asc" ? (isNumber ? "1→9" : "A→Z") : (isNumber ? "9→1" : "Z→A")}
                            </span>
                          )}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}
          </div>

          {/* Group button - purple when active */}
          <div className="relative">
            <button
              onClick={() => {
                setShowGroupMenu(!showGroupMenu);
                setShowSortMenu(false);
              }}
              className={`flex items-center gap-1.5 rounded-sm px-2 py-1 text-[13px] ${
                groupByColumnId
                  ? "bg-airtable-purple/15 font-medium text-airtable-purple"
                  : "text-airtable-text-secondary hover:bg-gray-100"
              }`}
            >
              <SquareSplitHorizontal className="size-3.5 shrink-0" />
              {groupByColumnId ? "Grouped by 1 field" : "Group"}
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
                      const newGroupBy = col.id === groupByColumnId ? null : col.id;
                      setGroupByColumnId(newGroupBy);
                      if (activeViewId) {
                        updateView.mutate({
                          id: activeViewId,
                          filters,
                          groupByColumnId: newGroupBy ?? undefined,
                        });
                      }
                      setShowGroupMenu(false);
                    }}
                    className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] hover:bg-gray-50 ${
                      col.id === groupByColumnId ? "bg-purple-50 text-purple-700" : "text-airtable-text-primary"
                    }`}
                  >
                    {FIELD_TYPE_ICONS[col.fieldType]}
                    {col.columnName}
                    {col.id === groupByColumnId && (
                      <Check className="ml-auto size-3.5" />
                    )}
                  </button>
                ))}
                {groupByColumnId && (
                  <>
                    <div className="my-1 border-t border-gray-100" />
                    <button
                      onClick={() => {
                        setGroupByColumnId(null);
                        if (activeViewId) {
                          updateView.mutate({
                            id: activeViewId,
                            filters,
                            groupByColumnId: null,
                          });
                        }
                        setShowGroupMenu(false);
                      }}
                      className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] text-red-600 hover:bg-red-50"
                    >
                      <X className="size-3.5" />
                      Remove grouping
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Color */}
          <Button
            variant="ghost"
            size="sm"
            className="h-auto gap-1.5 px-2 py-1 text-[13px] text-airtable-text-secondary hover:bg-gray-100"
          >
            <Palette className="size-3.5 shrink-0" />
            Color
          </Button>

          {/* Share and sync */}
          <Button
            variant="ghost"
            size="sm"
            className="h-auto gap-1.5 px-2 py-1 text-[13px] text-airtable-text-secondary hover:bg-gray-100"
          >
            <SquareArrowOutUpRight className="size-3.5 shrink-0" />
            Share and sync
          </Button>

          {/* Search */}
          {showSearch ? (
            <div className="flex items-center gap-1 rounded border border-airtable-blue bg-white px-2 py-0.5">
              <Search className="size-3.5 shrink-0 text-airtable-text-muted" />
              <input
                autoFocus
                type="text"
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setShowSearch(false);
                    setSearchQuery("");
                  }
                }}
                className="w-40 bg-transparent text-[13px] text-airtable-text-primary outline-none placeholder:text-airtable-text-muted"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-airtable-text-muted hover:text-airtable-text-primary"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSearch(true)}
              className="h-auto gap-1.5 px-2 py-1 text-[13px] text-airtable-text-secondary hover:bg-gray-100"
            >
              <Search className="size-3.5 shrink-0" />
              Search
            </Button>
          )}
        </div>
      )}

      <div className="flex min-h-0 flex-1 overflow-hidden bg-white">
        {selectedId ? (
          <>
            <ViewsSidebar
              tableId={selectedId}
              activeViewId={activeViewId}
              filters={filters}
              groupByColumnId={groupByColumnId}
              onSelectView={handleSelectView}
            />
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <TableGrid
                tableId={selectedId}
                groupByColumnId={groupByColumnId}
                filters={filters}
                searchQuery={searchQuery}
                hiddenFieldIds={hiddenFieldIds}
                sortConfig={sortConfig}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-airtable-text-muted">
            Create a table to get started
          </div>
        )}
      </div>
    </div>
  );
}
