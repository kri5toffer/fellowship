"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowDownUp,
  Check,
  CheckSquare,
  ChevronDown,
  Hash,
  LayoutGrid,
  Menu,
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
import { FilterBar, type FilterGroup, createEmptyFilterGroup, migrateFilters } from "./filter-bar";
import { HideFieldsPanel } from "./hide-fields-panel";
import { ViewsSidebar } from "./views-sidebar";
import { Button } from "~/components/ui/button";

const FIELD_TYPE_ICONS: Record<string, React.ReactNode> = {
  TEXT: <Type className="size-3.5 text-gray-500" />,
  NUMBER: <Hash className="size-3.5 text-orange-500" />,
  CHECKBOX: <CheckSquare className="size-3.5 text-purple-500" />,
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
  const [filterGroup, setFilterGroup] = useState<FilterGroup>(createEmptyFilterGroup());
  const [activeViewId, setActiveViewId] = useState<string | null>(null);
  const [hiddenFieldIds, setHiddenFieldIds] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ columnId: string; direction: "asc" | "desc" } | null>(null);
  const [viewColor, setViewColor] = useState<string | null>(null);
  const [tableMenuId, setTableMenuId] = useState<string | null>(null);
  const [renamingTableId, setRenamingTableId] = useState<string | null>(null);
  const [renameTableValue, setRenameTableValue] = useState("");
  const [recordTypeName, setRecordTypeName] = useState("Record");
  const [isAddingRow, setIsAddingRow] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
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
    setFilterGroup(createEmptyFilterGroup());
    setActiveViewId(null);
    setShowSearch(false);
    setSearchQuery("");
    setSortConfig(null);
    setHiddenFieldIds([]);
    setViewColor(null);
  }, [baseId]);

  useEffect(() => {
    setGroupByColumnId(null);
    setFilterGroup(createEmptyFilterGroup());
    setActiveViewId(null);
    setShowSearch(false);
    setSearchQuery("");
    setSortConfig(null);
    setHiddenFieldIds([]);
    setViewColor(null);
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
    filters: unknown;
    groupByColumnId: string | null;
    sortConfig: { columnId: string; direction: "asc" | "desc" } | null;
    hiddenFieldIds: string[];
    color: string | null;
  }) => {
    setActiveViewId(view.id);
    setFilterGroup(migrateFilters(view.filters));
    setGroupByColumnId(view.groupByColumnId);
    setSortConfig(view.sortConfig);
    setHiddenFieldIds(view.hiddenFieldIds);
    setViewColor(view.color);
  };

  const createTable = api.table.create.useMutation({
    onMutate: async (variables) => {
      await utils.table.getAll.cancel({ baseId });
      const previousTables = utils.table.getAll.getData({ baseId });
      utils.table.getAll.setData({ baseId }, (old) => [
        ...(old ?? []),
        { id: `temp-${Date.now()}`, tableName: variables.tableName, baseId: variables.baseId } as unknown as NonNullable<typeof previousTables>[number],
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
    onSuccess: () => { /* form already closed optimistically */ },
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
                filters: (variables.filters as typeof v.filters) ?? v.filters,
                groupByColumnId: variables.groupByColumnId !== undefined ? variables.groupByColumnId : v.groupByColumnId,
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
        className="scrollbar-hidden flex flex-none items-center overflow-auto"
        style={{
          height: 32,
          backgroundColor: "#f4f6f9",
          paddingLeft: 4,
          fontSize: 13,
        }}
      >
        <div className="flex min-w-0 flex-1 items-center">
          {tableList.map((t) => {
            const isActive = t.id === selectedId;

            return (
              <div
                key={t.id}
                className="relative flex items-center"
                style={
                  isActive
                    ? {
                        backgroundColor: "#d9e2f5",
                        borderRadius: 6,
                        height: 24,
                        position: "relative",
                      }
                    : {
                        height: 24,
                      }
                }
              >
                <button
                  onClick={() => handleTableSwitch(t.id)}
                  className="flex h-full flex-auto select-none items-center transition-colors"
                  style={{
                    maxWidth: "32rem",
                    paddingLeft: 12,
                    paddingRight: isActive ? 24 : 12,
                    outlineOffset: -5,
                    color: isActive ? "rgb(29, 31, 37)" : "rgb(97, 102, 112)",
                    fontWeight: isActive ? 500 : 400,
                    borderRadius: 6,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
                      e.currentTarget.style.borderRadius = "6px";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <span className="truncate whitespace-pre">{t.tableName}</span>
                  {isActive && (
                    <ChevronDown className="ml-1 size-3 shrink-0 text-[rgb(97,102,112)]" />
                  )}
                </button>

              {tableMenuId === t.id && (
                <div
                  ref={tableMenuRef}
                  className="absolute left-0 top-full z-40 mt-0.5 w-60 rounded-lg border border-gray-200 bg-white py-1.5 shadow-lg"
                >
                  {/* Import data */}
                  <button className="flex w-full items-center justify-between px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
                    <span className="flex items-center gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
                        <path d="M8 2v8M5 7l3 3 3-3" />
                        <path d="M2 11v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2" />
                      </svg>
                      Import data
                    </span>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-400">
                      <path d="M6 4l4 4-4 4" />
                    </svg>
                  </button>

                  <div className="my-1.5 border-t border-gray-100" />

                  {/* Rename table */}
                  <button
                    onClick={() => { setRenamingTableId(t.id); setRenameTableValue(t.tableName); setTableMenuId(null); }}
                    className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
                      <path d="M11 2.5l2.5 2.5-8 8H3V10.5l8-8z" />
                    </svg>
                    Rename table
                  </button>

                  {/* Hide table */}
                  <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
                      <path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" />
                      <circle cx="8" cy="8" r="2" />
                      <line x1="2" y1="2" x2="14" y2="14" />
                    </svg>
                    Hide table
                  </button>

                  {/* Manage fields */}
                  <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
                      <line x1="1" y1="4" x2="15" y2="4" />
                      <line x1="1" y1="8" x2="15" y2="8" />
                      <line x1="1" y1="12" x2="15" y2="12" />
                      <circle cx="5" cy="4" r="1.5" fill="white" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="10" cy="12" r="1.5" fill="white" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    Manage fields
                  </button>

                  {/* Duplicate table */}
                  <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
                      <rect x="5" y="5" width="9" height="9" rx="1" />
                      <path d="M2 11V2h9" />
                    </svg>
                    Duplicate table
                  </button>

                  <div className="my-1.5 border-t border-gray-100" />

                  {/* Configure date dependencies */}
                  <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
                      <rect x="1" y="2" width="5" height="5" rx="1" />
                      <rect x="10" y="9" width="5" height="5" rx="1" />
                      <path d="M6 4.5h2a2 2 0 0 1 2 2v2" />
                      <path d="M9 7l1.5 1.5L9 10" />
                    </svg>
                    Configure date dependencies
                  </button>

                  <div className="my-1.5 border-t border-gray-100" />

                  {/* Edit table description */}
                  <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
                      <circle cx="8" cy="8" r="6" />
                      <path d="M8 7v4" />
                      <circle cx="8" cy="5" r="0.5" fill="currentColor" />
                    </svg>
                    Edit table description
                  </button>

                  {/* Edit table permissions */}
                  <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
                      <rect x="3" y="7" width="10" height="7" rx="1" />
                      <path d="M5 7V5a3 3 0 0 1 6 0v2" />
                    </svg>
                    Edit table permissions
                  </button>

                  <div className="my-1.5 border-t border-gray-100" />

                  {/* Clear data */}
                  <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
                      <line x1="4" y1="4" x2="12" y2="12" />
                      <line x1="12" y1="4" x2="4" y2="12" />
                    </svg>
                    Clear data
                  </button>

                  {/* Delete table */}
                  <button
                    onClick={() => { deleteTable.mutate({ tableId: t.id }); setTableMenuId(null); }}
                    className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-red-600 hover:bg-red-50"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
                      <path d="M2 4h12" />
                      <path d="M5 4V2h6v2" />
                      <path d="M6 7v5M10 7v5" />
                      <path d="M3 4l1 9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-9" />
                    </svg>
                    Delete table
                  </button>
                </div>
              )}
            </div>
            );
          })}

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
              className="mb-px ml-1 flex items-center gap-1.5 self-center rounded px-2 py-1 text-[13px] font-normal transition-colors"
              style={{
                color: "rgb(97, 102, 112)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
                e.currentTarget.style.color = "rgb(29, 31, 37)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "rgb(97, 102, 112)";
              }}
              title="Add or import"
            >
              <Plus className="size-3.5 shrink-0" />
              <span>Add or import</span>
            </button>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />
        
        {/* Tools dropdown */}
        <button
          type="button"
          className="flex items-center gap-1 self-center rounded px-2 py-1 text-[13px] font-normal transition-colors"
          style={{
            height: 24,
            marginRight: 8,
            color: "rgb(97, 102, 112)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          title="Tools"
        >
          <span>Tools</span>
          <ChevronDown className="size-3 shrink-0" />
        </button>
      </nav>

      {selectedId && (
        <div
          id="viewBar"
          role="region"
          aria-label="View configuration"
          className="flex flex-none items-center overflow-hidden border-b"
          style={{
            height: 48,
            minWidth: 600,
            borderColor: "rgba(0,0,0,0.1)",
          }}
        >
          {/* Left side: hamburger toggle + Grid view label */}
          <div className="flex flex-auto items-center" style={{ paddingLeft: 6, paddingRight: 4 }}>
            <button
              type="button"
              onClick={() => setShowSidebar((v) => !v)}
              className="mr-0.5 flex items-center justify-center rounded text-[rgb(97,102,112)] hover:bg-[rgba(0,0,0,0.05)]"
              style={{ width: 28, height: 28 }}
              title={showSidebar ? "Close sidebar" : "Open sidebar"}
              aria-label={showSidebar ? "Close sidebar" : "Open sidebar"}
            >
              <Menu className="size-4" />
            </button>
            <h2 className="flex items-center">
              <div
                className="flex cursor-pointer items-center rounded px-1 hover:bg-[rgba(0,0,0,0.05)]"
                style={{ height: 26, maxWidth: "fit-content" }}
              >
                <div className="flex min-w-0 items-center">
                  <span className="inline-flex flex-none items-center">
                    <LayoutGrid className="size-4 flex-none text-[rgb(22,110,225)]" />
                  </span>
                  <span
                    className="ml-1 mr-1 flex-auto truncate text-[13px] font-semibold text-[rgb(29,31,37)]"
                    style={{ maxWidth: 200 }}
                  >
                    Grid view
                  </span>
                  <ChevronDown className="mt-px size-4 flex-none text-[rgb(29,31,37)]" />
                </div>
              </div>
            </h2>

            {/* Loading indicator for row operations */}
            {isAddingRow && (
              <div className="ml-2 flex items-center gap-1.5 text-[12px] text-airtable-text-muted">
                <svg className="size-3.5 animate-spin text-airtable-blue" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="8" strokeLinecap="round" />
                </svg>
                Saving...
              </div>
            )}
          </div>

          {/* Right side: toolbar buttons */}
          <div className="flex flex-auto items-center justify-end pr-1" style={{ height: "100%" }}>
            <div className="flex flex-auto items-center justify-end overflow-hidden" style={{ height: "100%" }}>
              <div className="flex grow items-center justify-end px-1">
                <div className="flex items-center">
          <HideFieldsPanel
            columns={activeTable?.columns ?? []}
            hiddenFieldIds={hiddenFieldIds}
            onChange={(ids) => {
              setHiddenFieldIds(ids);
              if (activeViewId) {
                updateView.mutate({ id: activeViewId, hiddenFieldIds: ids });
              }
            }}
          />

          <FilterBar
            columns={activeTable?.columns ?? []}
            filterGroup={filterGroup}
            onChange={(g) => {
              setFilterGroup(g);
              if (activeViewId) {
                updateView.mutate({
                  id: activeViewId,
                  filters: g as unknown as Record<string, unknown>,
                });
              }
            }}
          />

          {/* Group button */}
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

          {/* Sort button - yellow/gold when active */}
          <div ref={sortMenuRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setShowSortMenu(!showSortMenu);
                setShowGroupMenu(false);
              }}
              className={`flex items-center gap-1.5 rounded-sm px-2 py-1 text-[13px] transition-colors ${
                sortConfig
                  ? "bg-[#fff3cd] font-medium text-[#856404] border border-[#ffc107]/40"
                  : "text-airtable-text-secondary hover:bg-gray-100"
              }`}
            >
              <ArrowDownUp className="size-3.5" />
              {sortConfig ? "Sorted by 1 field" : "Sort"}
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
                            onClick={() => {
                              const next = { ...sortConfig, direction: "asc" as const };
                              setSortConfig(next);
                              if (activeViewId) updateView.mutate({ id: activeViewId, sortConfig: next });
                            }}
                            className={`rounded-l-md px-2 py-1 transition-colors ${
                              sortConfig.direction === "asc"
                                ? "bg-[#ffc107] text-white"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            {isNumber ? "1→9" : "A→Z"}
                          </button>
                          <button
                            onClick={() => {
                              const next = { ...sortConfig, direction: "desc" as const };
                              setSortConfig(next);
                              if (activeViewId) updateView.mutate({ id: activeViewId, sortConfig: next });
                            }}
                            className={`rounded-r-md border-l border-gray-200 px-2 py-1 transition-colors ${
                              sortConfig.direction === "desc"
                                ? "bg-[#ffc107] text-white"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            {isNumber ? "9→1" : "Z→A"}
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            setSortConfig(null);
                            if (activeViewId) updateView.mutate({ id: activeViewId, sortConfig: null });
                          }}
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
                            const next = isActive
                              ? { columnId: col.id, direction: sortConfig.direction === "asc" ? "desc" as const : "asc" as const }
                              : { columnId: col.id, direction: "asc" as const };
                            setSortConfig(next);
                            if (activeViewId) updateView.mutate({ id: activeViewId, sortConfig: next });
                          }}
                          className={`flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] hover:bg-gray-50 ${
                            isActive ? "bg-yellow-50 text-[#856404]" : "text-airtable-text-primary"
                          }`}
                        >
                          <span className="shrink-0">{FIELD_TYPE_ICONS[col.fieldType] ?? FIELD_TYPE_ICONS.TEXT}</span>
                          <span className="flex-1 truncate">{col.columnName}</span>
                          {isActive && (
                            <span className="shrink-0 text-[11px] font-medium text-[#856404]">
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
            <button
              type="button"
              onClick={() => setShowSearch(true)}
              className="rounded-sm p-1.5 text-airtable-text-secondary hover:bg-gray-100"
              title="Search"
            >
              <Search className="size-4" />
            </button>
          )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rename Table Modal */}
      {renamingTableId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setRenamingTableId(null);
              setRenameTableValue("");
            }
          }}
        >
          <div className="w-80 rounded-xl bg-white p-5 shadow-xl">
            {/* Table name input */}
            <input
              autoFocus
              value={renameTableValue}
              onChange={(e) => setRenameTableValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") { setRenamingTableId(null); setRenameTableValue(""); }
                if (e.key === "Enter") {
                  const trimmed = renameTableValue.trim();
                  if (!trimmed) return;
                  renameTable.mutate({ tableId: renamingTableId, tableName: trimmed });
                  setRenamingTableId(null);
                  setRenameTableValue("");
                }
              }}
              className="w-full rounded-md border border-emerald-600 px-3 py-1.5 text-[13px] text-gray-900 outline-none ring-1 ring-emerald-600"
            />

            {/* Record name label */}
            <div className="mt-4 flex items-center gap-1.5 text-[13px] text-gray-500">
              What should each record be called?
              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gray-300">
                <span className="text-[10px] leading-none text-gray-400">?</span>
              </div>
            </div>

            {/* Record name select */}
            <div className="relative mt-2">
              <select
                value={recordTypeName}
                onChange={(e) => setRecordTypeName(e.target.value)}
                className="w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-1.5 text-[13px] text-gray-800 outline-none"
              >
                <option>Record</option>
                <option>Row</option>
                <option>Item</option>
                <option>Entry</option>
                <option>Contact</option>
                <option>Task</option>
                <option>Event</option>
              </select>
              <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 6l4 4 4-4" />
              </svg>
            </div>

            {/* Examples */}
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-gray-400">
              <span>Examples:</span>
              <span className="flex items-center gap-1">
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="3" x2="8" y2="13" />
                  <line x1="3" y1="8" x2="13" y2="8" />
                </svg>
                Add {recordTypeName.toLowerCase()}
              </span>
              <span className="flex items-center gap-1">
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="1" y="3" width="14" height="10" rx="1" />
                  <path d="M1 6l7 4 7-4" />
                </svg>
                Send {recordTypeName.toLowerCase()}s
              </span>
            </div>

            {/* Buttons */}
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => { setRenamingTableId(null); setRenameTableValue(""); }}
                className="rounded-md px-4 py-1.5 text-[13px] font-medium text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const trimmed = renameTableValue.trim();
                  if (!trimmed) return;
                  renameTable.mutate({ tableId: renamingTableId, tableName: trimmed });
                  setRenamingTableId(null);
                  setRenameTableValue("");
                }}
                disabled={!renameTableValue.trim() || renameTable.isPending}
                className="rounded-md bg-airtable-blue px-4 py-1.5 text-[13px] font-medium text-white hover:bg-airtable-blue/90 disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex min-h-0 flex-1 overflow-hidden bg-white">
        {selectedId ? (
          <>
            {showSidebar && (
              <ViewsSidebar
                tableId={selectedId}
                activeViewId={activeViewId}
                filterGroup={filterGroup}
                groupByColumnId={groupByColumnId}
                sortConfig={sortConfig}
                hiddenFieldIds={hiddenFieldIds}
                color={viewColor}
                onSelectView={handleSelectView}
              />
            )}
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <TableGrid
                tableId={selectedId}
                groupByColumnId={groupByColumnId}
                filterGroup={filterGroup}
                searchQuery={searchQuery}
                hiddenFieldIds={hiddenFieldIds}
                sortConfig={sortConfig}
                onAddingRowChange={setIsAddingRow}
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
