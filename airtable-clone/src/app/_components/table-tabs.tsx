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
  const [tableMenuPos, setTableMenuPos] = useState<{ top: number; left: number } | null>(null);
  const [renamingTableId, setRenamingTableId] = useState<string | null>(null);
  const [renameTableValue, setRenameTableValue] = useState("");
  const [recordTypeName, setRecordTypeName] = useState("Record");
  const [isAddingRow, setIsAddingRow] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAddImportMenu, setShowAddImportMenu] = useState(false);
  const [addImportMenuPos, setAddImportMenuPos] = useState<{ top: number; left: number } | null>(null);
  const [showTableSwitcher, setShowTableSwitcher] = useState(false);
  const [tableSwitcherPos, setTableSwitcherPos] = useState<{ top: number; left: number } | null>(null);
  const [tableSwitcherSearch, setTableSwitcherSearch] = useState("");
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const [toolsMenuPos, setToolsMenuPos] = useState<{ top: number; right: number } | null>(null);
  const [showGridViewMenu, setShowGridViewMenu] = useState(false);
  const [gridViewMenuPos, setGridViewMenuPos] = useState<{ top: number; left: number } | null>(null);
  const gridViewBtnRef = useRef<HTMLButtonElement>(null);
  const gridViewMenuRef = useRef<HTMLDivElement>(null);
  const tableMenuRef = useRef<HTMLDivElement>(null);
  const addImportMenuRef = useRef<HTMLDivElement>(null);
  const addImportBtnRef = useRef<HTMLButtonElement>(null);
  const tableSwitcherRef = useRef<HTMLDivElement>(null);
  const tableSwitcherBtnRef = useRef<HTMLButtonElement>(null);
  const toolsMenuRef = useRef<HTMLDivElement>(null);
  const toolsBtnRef = useRef<HTMLButtonElement>(null);
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

  // Global Esc closes all open menus / overlays in this component
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setShowGroupMenu(false);
      setShowSortMenu(false);
      setShowAddImportMenu(false);
      setShowTableSwitcher(false);
      setShowToolsMenu(false);
      setShowGridViewMenu(false);
      setTableMenuId(null); setTableMenuPos(null);
      if (showSearch) {
        setShowSearch(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [showSearch]);

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
        setTableMenuId(null); setTableMenuPos(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [tableMenuId]);

  useEffect(() => {
    if (!showAddImportMenu) return;
    const handler = (e: MouseEvent) => {
      if (addImportMenuRef.current && !addImportMenuRef.current.contains(e.target as Node)) {
        setShowAddImportMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showAddImportMenu]);

  useEffect(() => {
    if (!showTableSwitcher) return;
    const handler = (e: MouseEvent) => {
      if (tableSwitcherRef.current && !tableSwitcherRef.current.contains(e.target as Node)) {
        setShowTableSwitcher(false);
        setTableSwitcherSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showTableSwitcher]);

  useEffect(() => {
    if (!showToolsMenu) return;
    const handler = (e: MouseEvent) => {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(e.target as Node) &&
          toolsBtnRef.current && !toolsBtnRef.current.contains(e.target as Node)) {
        setShowToolsMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showToolsMenu]);

  useEffect(() => {
    if (!showGridViewMenu) return;
    const handler = (e: MouseEvent) => {
      if (
        gridViewMenuRef.current && !gridViewMenuRef.current.contains(e.target as Node) &&
        gridViewBtnRef.current && !gridViewBtnRef.current.contains(e.target as Node)
      ) {
        setShowGridViewMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showGridViewMenu]);

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
          height: 40,
          backgroundColor: "#fff1ff",
          paddingLeft: 8,
          fontSize: 13,
        }}
      >
        <div className="flex min-w-0 flex-1 items-center">
          {tableList.map((t, idx) => {
            const isActive = t.id === selectedId;
            const prevIsActive = idx > 0 && tableList[idx - 1]?.id === selectedId;
            const showSeparator = idx > 0 && !isActive && !prevIsActive;

            return (
              <div key={t.id} className="flex items-center" style={{ height: 40 }}>
              {showSeparator && (
                <span
                  style={{
                    width: 1,
                    height: 16,
                    backgroundColor: "rgba(140,63,120,0.35)",
                    flexShrink: 0,
                    display: "block",
                  }}
                />
              )}
              <div
                data-tab-wrapper
                className="group/tab relative flex items-center"
                style={
                  isActive
                    ? {
                        backgroundColor: "white",
                        borderRadius: 6,
                        height: 40,
                        boxShadow: "0 1px 4px rgba(0,0,0,0.14)",
                      }
                    : {
                        height: 40,
                      }
                }
              >
                <button
                  onClick={() => handleTableSwitch(t.id)}
                  className="flex h-full flex-auto select-none items-center transition-colors"
                  style={{
                    maxWidth: "32rem",
                    paddingLeft: 12,
                    paddingRight: isActive ? 28 : 12,
                    outlineOffset: -5,
                    color: isActive ? "rgb(29, 31, 37)" : "rgba(0, 0, 0, 0.65)",
                    fontWeight: 400,
                    lineHeight: "18px",
                    cursor: "pointer",
                    borderRadius: isActive ? "6px 6px 0 0" : 6,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "rgba(140,63,120,0.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <span className="truncate" style={{ whiteSpace: "pre" }}>{t.tableName}</span>
                </button>
                {/* Chevron — absolutely positioned like Airtable */}
                <div
                  className={`absolute bottom-0 top-0 flex items-center ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                  style={{ right: 0, userSelect: "none" }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (tableMenuId === t.id) {
                        setTableMenuId(null); setTableMenuPos(null);
                        setTableMenuPos(null);
                      } else {
                        const rect = e.currentTarget.closest("[data-tab-wrapper]")?.getBoundingClientRect();
                        if (rect) {
                          setTableMenuPos({ top: rect.bottom + 2, left: rect.left });
                        }
                        setTableMenuId(t.id);
                      }
                    }}
                    className="flex items-center rounded-sm p-0.5 hover:bg-black/5"
                  >
                    <ChevronDown
                      width={16}
                      height={16}
                      style={{ flex: "none", color: "rgba(0,0,0,0.65)", shapeRendering: "geometricPrecision" }}
                    />
                  </button>
                </div>

              {tableMenuId === t.id && tableMenuPos && (
                <div
                  ref={tableMenuRef}
                  style={{
                    position: "fixed",
                    top: tableMenuPos.top,
                    left: tableMenuPos.left,
                    zIndex: 50,
                    width: 330,
                    backgroundColor: "rgb(255, 255, 255)",
                    borderRadius: 6,
                    boxShadow: "0px 0px 1px rgba(0,0,0,0.24), 0px 0px 2px rgba(0,0,0,0.16), 0px 3px 4px rgba(0,0,0,0.06), 0px 6px 8px rgba(0,0,0,0.06), 0px 12px 16px rgba(0,0,0,0.08), 0px 18px 32px rgba(0,0,0,0.06)",
                    padding: "0.75rem",
                    fontFamily: "-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
                    fontSize: 13,
                    lineHeight: "18px",
                    color: "rgb(29, 31, 37)",
                    overflowY: "auto",
                  }}
                >
                  {/* Import data */}
                  <button
                    style={{ padding: 8, borderRadius: 3, width: "100%", cursor: "pointer", display: "flex", alignItems: "center", boxSizing: "border-box", border: "none", background: "none", color: "rgb(29,31,37)", fontSize: 13, lineHeight: "18px", fontFamily: "inherit" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", whiteSpace: "nowrap", userSelect: "none" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0, color: "rgb(97,102,112)" }}>
                          <path d="M8 2v8M5 7l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M2 11v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        Import data
                      </span>
                      <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0, color: "rgb(97,102,112)" }}>
                        <path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </span>
                  </button>

                  {/* Separator */}
                  <div style={{ height: 1, backgroundColor: "rgba(0,0,0,0.05)", margin: "4px 0" }} />

                  {/* Rename table */}
                  <button
                    onClick={() => { setRenamingTableId(t.id); setRenameTableValue(t.tableName); setTableMenuId(null); setTableMenuPos(null); }}
                    style={{ padding: 8, borderRadius: 3, width: "100%", cursor: "pointer", display: "flex", alignItems: "center", boxSizing: "border-box", border: "none", background: "none", color: "rgb(29,31,37)", fontSize: 13, lineHeight: "18px", fontFamily: "inherit" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", whiteSpace: "nowrap", userSelect: "none" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0, color: "rgb(97,102,112)" }}>
                          <path d="M11 2.5l2.5 2.5-8 8H3V10.5l8-8z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        Rename table
                      </span>
                    </span>
                  </button>

                  {/* Hide table */}
                  <button
                    style={{ padding: 8, borderRadius: 3, width: "100%", cursor: "pointer", display: "flex", alignItems: "center", boxSizing: "border-box", border: "none", background: "none", color: "rgb(29,31,37)", fontSize: 13, lineHeight: "18px", fontFamily: "inherit" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", whiteSpace: "nowrap", userSelect: "none" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0, color: "rgb(97,102,112)" }}>
                          <path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          <circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        Hide table
                      </span>
                    </span>
                  </button>

                  {/* Manage fields */}
                  <button
                    style={{ padding: 8, borderRadius: 3, width: "100%", cursor: "pointer", display: "flex", alignItems: "center", boxSizing: "border-box", border: "none", background: "none", color: "rgb(29,31,37)", fontSize: 13, lineHeight: "18px", fontFamily: "inherit" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", whiteSpace: "nowrap", userSelect: "none" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0, color: "rgb(97,102,112)" }}>
                          <line x1="1" y1="4" x2="15" y2="4" stroke="currentColor" strokeWidth="1.5" />
                          <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" />
                          <line x1="1" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="1.5" />
                          <circle cx="5" cy="4" r="1.5" fill="white" stroke="currentColor" strokeWidth="1.5" />
                          <circle cx="10" cy="12" r="1.5" fill="white" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        Manage fields
                      </span>
                    </span>
                  </button>

                  {/* Duplicate table */}
                  <button
                    style={{ padding: 8, borderRadius: 3, width: "100%", cursor: "pointer", display: "flex", alignItems: "center", boxSizing: "border-box", border: "none", background: "none", color: "rgb(29,31,37)", fontSize: 13, lineHeight: "18px", fontFamily: "inherit" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", whiteSpace: "nowrap", userSelect: "none" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0, color: "rgb(97,102,112)" }}>
                          <rect x="5" y="5" width="9" height="9" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M2 11V2h9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        Duplicate table
                      </span>
                    </span>
                  </button>

                  {/* Separator */}
                  <div style={{ height: 1, backgroundColor: "rgba(0,0,0,0.05)", margin: "4px 0" }} />

                  {/* Configure date dependencies */}
                  <button
                    style={{ padding: 8, borderRadius: 3, width: "100%", cursor: "pointer", display: "flex", alignItems: "center", boxSizing: "border-box", border: "none", background: "none", color: "rgb(29,31,37)", fontSize: 13, lineHeight: "18px", fontFamily: "inherit" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", whiteSpace: "nowrap", userSelect: "none" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0, color: "rgb(97,102,112)" }}>
                          <rect x="1" y="2" width="5" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          <rect x="10" y="9" width="5" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M6 4.5h2a2 2 0 0 1 2 2v2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M9 7l1.5 1.5L9 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        Configure date dependencies
                      </span>
                    </span>
                  </button>

                  {/* Separator */}
                  <div style={{ height: 1, backgroundColor: "rgba(0,0,0,0.05)", margin: "4px 0" }} />

                  {/* Edit table description */}
                  <button
                    style={{ padding: 8, borderRadius: 3, width: "100%", cursor: "pointer", display: "flex", alignItems: "center", boxSizing: "border-box", border: "none", background: "none", color: "rgb(29,31,37)", fontSize: 13, lineHeight: "18px", fontFamily: "inherit" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", whiteSpace: "nowrap", userSelect: "none" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0, color: "rgb(97,102,112)" }}>
                          <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M8 7v4" stroke="currentColor" strokeWidth="1.5" />
                          <circle cx="8" cy="5" r="0.5" fill="currentColor" />
                        </svg>
                        Edit table description
                      </span>
                    </span>
                  </button>

                  {/* Edit table permissions */}
                  <button
                    style={{ padding: 8, borderRadius: 3, width: "100%", cursor: "pointer", display: "flex", alignItems: "center", boxSizing: "border-box", border: "none", background: "none", color: "rgb(29,31,37)", fontSize: 13, lineHeight: "18px", fontFamily: "inherit" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", whiteSpace: "nowrap", userSelect: "none" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0, color: "rgb(97,102,112)" }}>
                          <rect x="3" y="7" width="10" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M5 7V5a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        Edit table permissions
                      </span>
                    </span>
                  </button>

                  {/* Separator */}
                  <div style={{ height: 1, backgroundColor: "rgba(0,0,0,0.05)", margin: "4px 0" }} />

                  {/* Clear data */}
                  <button
                    style={{ padding: 8, borderRadius: 3, width: "100%", cursor: "pointer", display: "flex", alignItems: "center", boxSizing: "border-box", border: "none", background: "none", color: "rgb(29,31,37)", fontSize: 13, lineHeight: "18px", fontFamily: "inherit" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", whiteSpace: "nowrap", userSelect: "none" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0, color: "rgb(97,102,112)" }}>
                          <line x1="4" y1="4" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" />
                          <line x1="12" y1="4" x2="4" y2="12" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        Clear data
                      </span>
                    </span>
                  </button>

                  {/* Delete table */}
                  <button
                    onClick={() => { deleteTable.mutate({ tableId: t.id }); setTableMenuId(null); setTableMenuPos(null); }}
                    style={{ padding: 8, borderRadius: 3, width: "100%", cursor: "pointer", display: "flex", alignItems: "center", boxSizing: "border-box", border: "none", background: "none", color: "rgb(220, 4, 59)", fontSize: 13, lineHeight: "18px", fontFamily: "inherit" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(220,4,59,0.06)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", whiteSpace: "nowrap", userSelect: "none" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
                          <path d="M2 4h12" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M5 4V2h6v2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M6 7v5M10 7v5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M3 4l1 9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        Delete table
                      </span>
                    </span>
                  </button>
                </div>
              )}
            </div>
            </div>
            );
          })}

          {/* Table switcher dropdown */}
          <div className="self-center">
            <button
              ref={tableSwitcherBtnRef}
              onClick={() => {
                if (showTableSwitcher) {
                  setShowTableSwitcher(false);
                  setTableSwitcherSearch("");
                } else {
                  const rect = tableSwitcherBtnRef.current?.getBoundingClientRect();
                  if (rect) setTableSwitcherPos({ top: rect.bottom + 2, left: rect.left });
                  setShowTableSwitcher(true);
                }
              }}
              className="ml-0.5 flex h-5 w-5 items-center justify-center rounded transition-colors"
              style={{ color: "rgb(97,102,112)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(140,63,120,0.1)";
                e.currentTarget.style.color = "rgb(29,31,37)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "rgb(97,102,112)";
              }}
              title="Switch table"
            >
              <ChevronDown className="size-3.5" />
            </button>

            {showTableSwitcher && tableSwitcherPos && (
              <div
                ref={tableSwitcherRef}
                className="fixed z-50 w-72 rounded-lg border border-gray-200 bg-white py-1.5 shadow-lg"
                style={{ top: tableSwitcherPos.top, left: tableSwitcherPos.left }}
              >
                {/* Search */}
                <div className="flex items-center gap-2 px-3 py-2">
                  <Search className="size-3.5 shrink-0 text-gray-400" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Find a table"
                    value={tableSwitcherSearch}
                    onChange={(e) => setTableSwitcherSearch(e.target.value)}
                    className="w-full text-[13px] text-airtable-text-primary outline-none placeholder:text-gray-400"
                  />
                </div>

                <div className="my-1 border-t border-gray-100" />

                {/* Table list */}
                <div className="max-h-60 overflow-y-auto py-0.5">
                  {tableList
                    .filter((t) =>
                      t.tableName.toLowerCase().includes(tableSwitcherSearch.toLowerCase()),
                    )
                    .map((t) => {
                      const isActive = t.id === selectedId;
                      return (
                        <button
                          key={t.id}
                          onClick={() => {
                            handleTableSwitch(t.id);
                            setShowTableSwitcher(false);
                            setTableSwitcherSearch("");
                          }}
                          className={`flex w-full items-center justify-between px-3 py-1.5 text-left text-[13px] ${
                            isActive
                              ? "bg-gray-100 font-medium text-airtable-text-primary"
                              : "text-airtable-text-primary hover:bg-gray-50"
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            {isActive ? (
                              <Check className="size-3.5 shrink-0 text-airtable-text-primary" />
                            ) : (
                              <span className="size-3.5 shrink-0" />
                            )}
                            {t.tableName}
                          </span>
                          {isActive && (
                            <div className="flex items-center gap-1">
                              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400 hover:text-gray-600">
                                <path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" />
                                <circle cx="8" cy="8" r="2" />
                                <line x1="2" y1="2" x2="14" y2="14" />
                              </svg>
                              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="text-gray-400 hover:text-gray-600">
                                <circle cx="8" cy="4" r="1.2" />
                                <circle cx="8" cy="8" r="1.2" />
                                <circle cx="8" cy="12" r="1.2" />
                              </svg>
                            </div>
                          )}
                        </button>
                      );
                    })}
                </div>

                <div className="my-1 border-t border-gray-100" />

                {/* Add table */}
                <button
                  onClick={() => {
                    setShowTableSwitcher(false);
                    setTableSwitcherSearch("");
                    setCreatingTable(true);
                  }}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50"
                >
                  <span className="flex items-center gap-2.5">
                    <Plus className="size-3.5 shrink-0 text-gray-500" />
                    Add table
                  </span>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-400">
                    <path d="M6 4l4 4-4 4" />
                  </svg>
                </button>
              </div>
            )}
          </div>

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
            <div className="self-center">
              <button
                ref={addImportBtnRef}
                onClick={() => {
                  if (showAddImportMenu) {
                    setShowAddImportMenu(false);
                  } else {
                    const rect = addImportBtnRef.current?.getBoundingClientRect();
                    if (rect) setAddImportMenuPos({ top: rect.bottom + 2, left: rect.left });
                    setShowAddImportMenu(true);
                  }
                }}
                className="ml-1 flex items-center gap-1.5 rounded px-2 py-1 text-[13px] font-normal transition-colors"
                style={{ color: "rgb(97, 102, 112)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(140,63,120,0.1)";
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

              {showAddImportMenu && addImportMenuPos && (
                <div
                  ref={addImportMenuRef}
                  className="fixed z-50 w-64 rounded-lg border border-gray-200 bg-white py-1.5 shadow-lg"
                  style={{ top: addImportMenuPos.top, left: addImportMenuPos.left }}
                >
                  {/* Section: Add a blank table */}
                  <div className="px-3 pb-1 pt-1.5 text-[11px] font-medium uppercase tracking-wide text-gray-400">Add a blank table</div>
                  <button
                    onClick={() => { setShowAddImportMenu(false); setCreatingTable(true); }}
                    className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
                      <rect x="2" y="2" width="12" height="12" rx="2" />
                      <line x1="8" y1="5" x2="8" y2="11" />
                      <line x1="5" y1="8" x2="11" y2="8" />
                    </svg>
                    Start from scratch
                  </button>

                  <div className="my-1.5 border-t border-gray-100" />

                  {/* Section: Build with Omni */}
                  <div className="px-3 pb-1 pt-1.5 text-[11px] font-medium uppercase tracking-wide text-gray-400">Build with Omni</div>
                  <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
                      <rect x="1" y="3" width="14" height="10" rx="1.5" />
                      <line x1="1" y1="6" x2="15" y2="6" />
                      <line x1="5.5" y1="6" x2="5.5" y2="13" />
                    </svg>
                    New table
                  </button>
                  <button className="flex w-full items-center justify-between px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
                    <span className="flex items-center gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
                        <circle cx="8" cy="8" r="6" />
                        <path d="M8 5v6M5 8h6" />
                      </svg>
                      New table with web data
                    </span>
                    <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">Beta</span>
                  </button>

                  <div className="my-1.5 border-t border-gray-100" />

                  {/* Section: Seed data */}

                  {/* Section: Add from other sources */}
                  <div className="px-3 pb-1 pt-1.5 text-[11px] font-medium uppercase tracking-wide text-gray-400">Add from other sources</div>
                  <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
                      <rect x="1" y="1" width="14" height="14" rx="3" fill="#FCB400" />
                      <rect x="4" y="4" width="3.5" height="3.5" rx="0.5" fill="white" />
                      <rect x="8.5" y="4" width="3.5" height="3.5" rx="0.5" fill="white" fillOpacity="0.7" />
                      <rect x="4" y="8.5" width="3.5" height="3.5" rx="0.5" fill="white" fillOpacity="0.7" />
                      <rect x="8.5" y="8.5" width="3.5" height="3.5" rx="0.5" fill="white" fillOpacity="0.5" />
                    </svg>
                    Airtable base
                  </button>
                  <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
                      <path d="M3 2h7l3 3v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
                      <path d="M10 2v3h3" />
                      <path d="M5 9h6M5 11.5h4" />
                    </svg>
                    CSV file
                  </button>
                  <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
                      <rect x="1" y="1" width="14" height="14" rx="3" fill="#4285F4" />
                      <path d="M4 5h8M4 8h8M4 11h5" stroke="white" strokeWidth="1.2" />
                    </svg>
                    Google Calendar
                  </button>
                  <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
                      <rect x="1" y="1" width="14" height="14" rx="3" fill="#0F9D58" />
                      <rect x="3.5" y="4" width="9" height="8" rx="0.5" fill="white" />
                      <line x1="3.5" y1="7" x2="12.5" y2="7" stroke="#0F9D58" strokeWidth="0.8" />
                      <line x1="3.5" y1="9.5" x2="12.5" y2="9.5" stroke="#0F9D58" strokeWidth="0.8" />
                      <line x1="7" y1="4" x2="7" y2="12" stroke="#0F9D58" strokeWidth="0.8" />
                    </svg>
                    Google Sheets
                  </button>
                  <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
                      <rect x="1" y="1" width="14" height="14" rx="3" fill="#217346" />
                      <text x="4.5" y="12" fill="white" fontSize="9" fontWeight="bold" fontFamily="Arial">X</text>
                    </svg>
                    Microsoft Excel
                  </button>
                  <button className="flex w-full items-center justify-between px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
                    <span className="flex items-center gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
                        <rect x="1" y="1" width="14" height="14" rx="3" fill="#00A1E0" />
                        <path d="M5 6c3 0 3 4 6 4" stroke="white" strokeWidth="1.5" fill="none" />
                      </svg>
                      Salesforce
                    </span>
                    <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-600">Business</span>
                  </button>
                  <button className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
                      <rect x="1" y="1" width="14" height="14" rx="3" fill="#0073EA" />
                      <path d="M5 5h2v6H5zM9 5h2v6H9z" fill="white" />
                    </svg>
                    Smartsheet
                  </button>

                  <div className="my-1.5 border-t border-gray-100" />

                  <button className="flex w-full items-center justify-between px-3 py-1.5 text-left text-[13px] text-airtable-text-primary hover:bg-gray-50">
                    <span className="flex items-center gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-500">
                        <rect x="2" y="2" width="5" height="5" rx="1" />
                        <rect x="9" y="2" width="5" height="5" rx="1" />
                        <rect x="2" y="9" width="5" height="5" rx="1" />
                        <rect x="9" y="9" width="5" height="5" rx="1" />
                      </svg>
                      25 more sources...
                    </span>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gray-400">
                      <path d="M6 4l4 4-4 4" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />
        
        {/* Tools dropdown */}
        <div className="relative self-center" style={{ marginRight: 8 }}>
          <button
            ref={toolsBtnRef}
            type="button"
            onClick={() => {
              if (showToolsMenu) {
                setShowToolsMenu(false);
              } else {
                const rect = toolsBtnRef.current?.getBoundingClientRect();
                if (rect) setToolsMenuPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
                setShowToolsMenu(true);
              }
            }}
            className="flex items-center gap-1.5 rounded px-2 py-1 text-[13px] font-normal transition-colors"
            style={{ color: "rgb(97, 102, 112)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(140,63,120,0.1)";
              e.currentTarget.style.color = "rgb(29, 31, 37)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "rgb(97, 102, 112)";
            }}
            title="Tools"
          >
            <span>Tools</span>
            <ChevronDown className="size-3 shrink-0" />
          </button>

          {showToolsMenu && toolsMenuPos && (
            <div
              ref={toolsMenuRef}
              className="fixed z-50 w-[340px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
              style={{ top: toolsMenuPos.top, right: toolsMenuPos.right }}
            >
              {/* Extensions */}
              <button className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-gray-50">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    <path d="M17.5 14v6M14.5 17h6" />
                  </svg>
                </span>
                <span>
                  <div className="text-[15px] font-medium text-[rgb(29,31,37)]">Extensions</div>
                  <div className="text-[13px] text-[rgb(97,102,112)]">Extend the functionality of your base</div>
                </span>
              </button>

              <div className="mx-5 border-t border-gray-100" />

              {/* Manage fields */}
              <button className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-gray-50">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <span className="text-[16px] font-semibold text-gray-600">A</span>
                </span>
                <span>
                  <div className="text-[15px] font-medium text-[rgb(29,31,37)]">Manage fields</div>
                  <div className="text-[13px] text-[rgb(97,102,112)]">Edit fields and inspect dependencies</div>
                </span>
              </button>

              {/* Record templates */}
              <button className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-gray-50">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <line x1="9" y1="7" x2="15" y2="7" />
                    <line x1="9" y1="11" x2="15" y2="11" />
                    <line x1="9" y1="15" x2="13" y2="15" />
                  </svg>
                </span>
                <span>
                  <div className="text-[15px] font-medium text-[rgb(29,31,37)]">Record templates</div>
                  <div className="text-[13px] text-[rgb(97,102,112)]">Create records from a template</div>
                </span>
              </button>

              {/* Date dependencies */}
              <button className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-gray-50">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                    <rect x="3" y="7" width="8" height="5" rx="1" />
                    <rect x="13" y="12" width="8" height="5" rx="1" />
                    <path d="M11 9.5h3a2 2 0 0 1 2 2v1" />
                  </svg>
                </span>
                <span>
                  <div className="text-[15px] font-medium text-[rgb(29,31,37)]">Date dependencies</div>
                  <div className="text-[13px] text-[rgb(97,102,112)]">Configure date shifting between dependent records</div>
                </span>
              </button>

              {/* Insights */}
              <button className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-gray-50">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </span>
                <span className="flex-1">
                  <div className="flex items-center gap-2 text-[15px] font-medium text-[rgb(29,31,37)]">
                    Insights
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l1.5 4.5H15l-4 3 1.5 4.5L8 10.5 3.5 13 5 8.5 1 5.5h5.5z"/></svg>
                      Business
                    </span>
                  </div>
                  <div className="text-[13px] text-[rgb(97,102,112)]">Understand and improve base health</div>
                </span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {selectedId && (
        <div
          id="viewBar"
          role="region"
          aria-label="View configuration"
          className="relative z-20 flex flex-none items-center border-b"
          style={{
            height: 48,
            minWidth: 600,
            borderColor: "rgba(0,0,0,0.1)",
          }}
        >
          {/* Left side: hamburger toggle + Grid view label */}
          <div className="flex flex-auto items-center" style={{ paddingLeft: 12, paddingRight: 8 }}>
            <button
              type="button"
              onClick={() => setShowSidebar((v) => !v)}
              className="mr-1 flex items-center justify-center rounded-md text-[rgb(97,102,112)] hover:bg-[rgba(0,0,0,0.05)]"
              style={{ width: 32, height: 32, borderRadius: 6 }}
              title={showSidebar ? "Close sidebar" : "Open sidebar"}
              aria-label={showSidebar ? "Close sidebar" : "Open sidebar"}
            >
              <Menu className="size-4" />
            </button>
            <h2 className="flex items-center">
              <button
                ref={gridViewBtnRef}
                type="button"
                onClick={() => {
                  if (showGridViewMenu) {
                    setShowGridViewMenu(false);
                  } else {
                    const rect = gridViewBtnRef.current?.getBoundingClientRect();
                    if (rect) setGridViewMenuPos({ top: rect.bottom + 4, left: rect.left });
                    setShowGridViewMenu(true);
                  }
                }}
                className="flex items-center rounded px-1 hover:bg-[rgba(0,0,0,0.05)]"
                style={{ height: 26, maxWidth: "fit-content" }}
                aria-label="Open view options menu"
              >
                <div className="flex min-w-0 items-center">
                  <span className="inline-flex flex-none items-center">
                    <LayoutGrid className="size-4 flex-none text-[rgb(22,110,225)]" />
                  </span>
                  <span
                    className="ml-1 mr-1 flex-auto truncate text-[13px] font-medium text-[rgb(29,31,37)]"
                    style={{ maxWidth: 200 }}
                  >
                    Grid view
                  </span>
                  <ChevronDown className="mt-px size-4 flex-none text-[rgb(29,31,37)]" />
                </div>
              </button>
            </h2>

            {/* Grid view options menu */}
            {showGridViewMenu && gridViewMenuPos && (
              <div
                ref={gridViewMenuRef}
                className="fixed z-50 overflow-hidden rounded-md bg-white"
                style={{
                  top: gridViewMenuPos.top,
                  left: gridViewMenuPos.left,
                  width: 352,
                  border: "1px solid rgba(0,0,0,0.1)",
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.18)",
                  fontFamily: "-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                }}
              >
                {/* Header: Collaborative view */}
                <div
                  className="flex cursor-pointer items-center justify-between px-3"
                  style={{ height: 44, backgroundColor: "rgb(247,247,247)", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgb(240,240,240)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgb(247,247,247)"; }}
                >
                  <div className="flex items-center" style={{ gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: "rgb(97,102,112)" }}>
                      <circle cx="5.5" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.4" />
                      <circle cx="10.5" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M1 13c0-2.2 1.8-3.5 4.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      <path d="M8 13c0-2.2 1.8-3.5 4.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    <span style={{ fontSize: 13, fontWeight: 500, lineHeight: "18px", color: "rgb(29,31,37)" }}>Collaborative view</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ color: "rgb(97,102,112)", flexShrink: 0 }}>
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="px-3 py-2" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", backgroundColor: "rgb(247,247,247)" }}>
                  <p style={{ fontSize: 12, lineHeight: "16px", color: "rgb(97,102,112)", margin: 0 }}>
                    Editors and up can edit the view configuration
                  </p>
                </div>

                {/* All items in one padded container — matches Airtable ul.p1-and-half padding:12 */}
                <div style={{ padding: 12 }}>

                  {/* Assign as personal view */}
                  <button
                    className="flex w-full items-center justify-between rounded"
                    style={{ padding: "8px 8px", background: "none", border: "none", cursor: "pointer", fontSize: 13, lineHeight: "18px", color: "rgb(29,31,37)", fontFamily: "inherit" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    onClick={() => setShowGridViewMenu(false)}
                  >
                    <span className="flex items-center" style={{ gap: 8 }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: "rgb(97,102,112)" }}>
                        <path d="M2 8h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M8 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Assign as personal view
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 500, color: "rgb(22,110,225)", backgroundColor: "rgb(219,234,254)", borderRadius: 20, padding: "2px 8px", lineHeight: "16px", flexShrink: 0 }}>Team</span>
                  </button>

                  {/* Separator */}
                  <div style={{ height: 1, backgroundColor: "rgba(0,0,0,0.1)", margin: "8px 0" }} />

                  {/* Rename view */}
                  <button
                    className="flex w-full items-center rounded"
                    style={{ padding: "8px 8px", background: "none", border: "none", cursor: "pointer", fontSize: 13, lineHeight: "18px", color: "rgb(29,31,37)", gap: 8, fontFamily: "inherit" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    onClick={() => setShowGridViewMenu(false)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: "rgb(97,102,112)" }}>
                      <path d="M11.5 2.5l2 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                    </svg>
                    Rename view
                  </button>

                  {/* Edit view description */}
                  <button
                    className="flex w-full items-center rounded"
                    style={{ padding: "8px 8px", background: "none", border: "none", cursor: "pointer", fontSize: 13, lineHeight: "18px", color: "rgb(29,31,37)", gap: 8, fontFamily: "inherit" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    onClick={() => setShowGridViewMenu(false)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: "rgb(97,102,112)" }}>
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M8 7.5v3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      <circle cx="8" cy="5.5" r="0.8" fill="currentColor" />
                    </svg>
                    Edit view description
                  </button>

                  {/* Separator */}
                  <div style={{ height: 1, backgroundColor: "rgba(0,0,0,0.1)", margin: "8px 0" }} />

                  {/* Duplicate view */}
                  <button
                    className="flex w-full items-center rounded"
                    style={{ padding: "8px 8px", background: "none", border: "none", cursor: "pointer", fontSize: 13, lineHeight: "18px", color: "rgb(29,31,37)", gap: 8, fontFamily: "inherit" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    onClick={() => setShowGridViewMenu(false)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: "rgb(97,102,112)" }}>
                      <rect x="5" y="5" width="8" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M3 11V3h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Duplicate view
                  </button>

                  {/* Copy another view's configuration */}
                  <button
                    className="flex w-full items-center rounded"
                    style={{ padding: "8px 8px", background: "none", border: "none", cursor: "pointer", fontSize: 13, lineHeight: "18px", color: "rgb(29,31,37)", gap: 8, fontFamily: "inherit" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    onClick={() => setShowGridViewMenu(false)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: "rgb(97,102,112)" }}>
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M6 8.5l1.5 1.5L10.5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Copy another view&apos;s configuration
                  </button>

                  {/* Separator */}
                  <div style={{ height: 1, backgroundColor: "rgba(0,0,0,0.1)", margin: "8px 0" }} />

                  {/* Download CSV */}
                  <button
                    className="flex w-full items-center rounded"
                    style={{ padding: "8px 8px", background: "none", border: "none", cursor: "pointer", fontSize: 13, lineHeight: "18px", color: "rgb(29,31,37)", gap: 8, fontFamily: "inherit" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    onClick={() => setShowGridViewMenu(false)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: "rgb(97,102,112)" }}>
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M8 5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      <path d="M6 8.5l2 2 2-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Download CSV
                  </button>

                  {/* Print view */}
                  <button
                    className="flex w-full items-center rounded"
                    style={{ padding: "8px 8px", background: "none", border: "none", cursor: "pointer", fontSize: 13, lineHeight: "18px", color: "rgb(29,31,37)", gap: 8, fontFamily: "inherit" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    onClick={() => setShowGridViewMenu(false)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: "rgb(97,102,112)" }}>
                      <rect x="3" y="6" width="10" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M5 6V3h6v3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                      <rect x="5.5" y="8.5" width="5" height="1" rx="0.5" fill="currentColor" />
                    </svg>
                    Print view
                  </button>

                  {/* Delete view */}
                  <button
                    className="flex w-full items-center rounded"
                    style={{ padding: "8px 8px", background: "none", border: "none", cursor: "pointer", fontSize: 13, lineHeight: "18px", color: "rgb(220,4,59)", gap: 8, fontFamily: "inherit" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(220,4,59,0.06)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    onClick={() => setShowGridViewMenu(false)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M2 4h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      <path d="M5 4V2.5h6V4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                      <path d="M6 7v4.5M10 7v4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      <path d="M3 4l.8 9a1 1 0 0 0 1 .9h6.4a1 1 0 0 0 1-.9L13 4" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                    Delete view
                  </button>

                </div>
              </div>
            )}

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
            <div className="flex flex-auto items-center justify-end" style={{ height: "100%" }}>
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
              className={`mr-1 flex items-center gap-1.5 rounded px-2 py-1 text-[13px] leading-[18px] transition-colors ${
                groupByColumnId
                  ? "bg-airtable-purple/15 font-medium text-airtable-purple"
                  : "font-normal text-airtable-text-secondary hover:bg-[#f2f4f8]"
              }`}
            >
              <SquareSplitHorizontal className="size-4 shrink-0" />
              <span className="truncate">{groupByColumnId ? "Grouped by 1 field" : "Group"}</span>
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
              className={`mr-1 flex items-center gap-1.5 rounded px-2 py-1 text-[13px] leading-[18px] transition-colors ${
                sortConfig
                  ? "bg-[#fff3cd] font-medium text-[#856404] border border-[#ffc107]/40"
                  : "font-normal text-airtable-text-secondary hover:bg-[#f2f4f8]"
              }`}
            >
              <ArrowDownUp className="size-4" />
              <span className="truncate">{sortConfig ? "Sorted by 1 field" : "Sort"}</span>
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
          <button
            type="button"
            className="mr-1 flex items-center gap-1.5 rounded px-2 py-1 text-[13px] font-normal leading-[18px] text-airtable-text-secondary transition-colors hover:bg-[#f2f4f8]"
          >
            <Palette className="size-4 shrink-0" />
            <span className="truncate">Color</span>
          </button>

          {/* Share and sync */}
          <span className="mr-1 flex items-center">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded px-2 py-1 text-[13px] font-normal leading-[18px] text-airtable-text-secondary transition-colors hover:bg-[#f2f4f8]"
            >
              <SquareArrowOutUpRight className="size-4 shrink-0" />
              <span className="truncate">Share and sync</span>
            </button>
          </span>

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
              className="flex items-center justify-center rounded p-1.5 text-airtable-text-secondary transition-colors hover:bg-[#f2f4f8]"
              title="Find in view"
              aria-label="toggle view search input"
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
