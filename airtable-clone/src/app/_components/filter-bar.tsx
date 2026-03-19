"use client";

import { useEffect, useRef, useState } from "react";

// ============================================================================
// Types
// ============================================================================

export type FilterCondition = {
  id: string;
  type?: "condition";
  columnId: string;
  operator: string;
  value: string;
};

export type FilterGroup = {
  id: string;
  type: "group";
  conjunction: "and" | "or";
  children: FilterNode[];
};

export type FilterNode = FilterCondition | FilterGroup;

export function isFilterGroup(node: FilterNode): node is FilterGroup {
  return "type" in node && node.type === "group";
}

export function createEmptyFilterGroup(): FilterGroup {
  return { id: "root", type: "group", conjunction: "and", children: [] };
}

export function migrateFilters(data: unknown): FilterGroup {
  if (!data) return createEmptyFilterGroup();
  if (Array.isArray(data)) {
    return {
      id: "root",
      type: "group",
      conjunction: "and",
      children: (data as FilterCondition[]).map((c) => ({
        ...c,
        type: "condition" as const,
      })),
    };
  }
  if (
    typeof data === "object" &&
    data !== null &&
    "type" in data &&
    (data as FilterGroup).type === "group"
  ) {
    return data as FilterGroup;
  }
  return createEmptyFilterGroup();
}

export function countConditions(group: FilterGroup): number {
  return group.children.reduce((sum, child) => {
    if (isFilterGroup(child)) return sum + countConditions(child);
    return sum + 1;
  }, 0);
}

// ============================================================================
// Constants
// ============================================================================

type ColumnDef = {
  id: string;
  columnName: string;
  fieldType: string;
};

const OPERATORS_BY_TYPE: Record<string, { value: string; label: string }[]> = {
  TEXT: [
    { value: "contains", label: "contains" },
    { value: "not_contains", label: "does not contain" },
    { value: "equals", label: "is" },
    { value: "not_equals", label: "is not" },
    { value: "empty", label: "is empty" },
    { value: "not_empty", label: "is not empty" },
  ],
  NUMBER: [
    { value: "equals", label: "=" },
    { value: "not_equals", label: "≠" },
    { value: "gt", label: ">" },
    { value: "lt", label: "<" },
    { value: "gte", label: "≥" },
    { value: "lte", label: "≤" },
    { value: "empty", label: "is empty" },
    { value: "not_empty", label: "is not empty" },
  ],
  CHECKBOX: [
    { value: "is_checked", label: "is checked" },
    { value: "is_unchecked", label: "is unchecked" },
  ],
};

const NO_VALUE_OPERATORS = new Set([
  "empty",
  "not_empty",
  "is_checked",
  "is_unchecked",
]);

let nextFilterId = 0;
function genId(prefix = "f") {
  return `${prefix}_${++nextFilterId}`;
}

// ============================================================================
// Tree manipulation helpers
// ============================================================================

function updateNodeInTree(
  group: FilterGroup,
  nodeId: string,
  updater: (node: FilterNode) => FilterNode,
): FilterGroup {
  return {
    ...group,
    children: group.children.map((child) => {
      if (child.id === nodeId) return updater(child);
      if (isFilterGroup(child))
        return updateNodeInTree(child, nodeId, updater);
      return child;
    }),
  };
}

function removeNodeFromTree(
  group: FilterGroup,
  nodeId: string,
): FilterGroup {
  return {
    ...group,
    children: group.children
      .filter((child) => child.id !== nodeId)
      .map((child) =>
        isFilterGroup(child) ? removeNodeFromTree(child, nodeId) : child,
      ),
  };
}

function addChildToGroup(
  tree: FilterGroup,
  groupId: string,
  child: FilterNode,
): FilterGroup {
  if (tree.id === groupId) {
    return { ...tree, children: [...tree.children, child] };
  }
  return {
    ...tree,
    children: tree.children.map((c) =>
      isFilterGroup(c) ? addChildToGroup(c, groupId, child) : c,
    ),
  };
}

function setGroupConjunction(
  tree: FilterGroup,
  groupId: string,
  conj: "and" | "or",
): FilterGroup {
  if (tree.id === groupId) {
    return { ...tree, conjunction: conj };
  }
  return {
    ...tree,
    children: tree.children.map((c) =>
      isFilterGroup(c) ? setGroupConjunction(c, groupId, conj) : c,
    ),
  };
}

// ============================================================================
// FilterBar Component
// ============================================================================

export function FilterBar({
  columns,
  filterGroup,
  onChange,
}: {
  columns: ColumnDef[];
  filterGroup: FilterGroup;
  onChange: (group: FilterGroup) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<FilterGroup>(filterGroup);
  const activeCount = countConditions(filterGroup);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) setDraft(filterGroup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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

  function newCondition(): FilterCondition {
    const firstCol = columns[0];
    const ops =
      OPERATORS_BY_TYPE[firstCol?.fieldType ?? "TEXT"] ??
      OPERATORS_BY_TYPE.TEXT!;
    return {
      id: genId("f"),
      type: "condition",
      columnId: firstCol?.id ?? "",
      operator: ops[0]!.value,
      value: "",
    };
  }

  function newGroup(): FilterGroup {
    return {
      id: genId("g"),
      type: "group",
      conjunction: "and",
      children: [],
    };
  }

  function addCondition() {
    setDraft((prev) => ({
      ...prev,
      children: [...prev.children, newCondition()],
    }));
    setIsOpen(true);
  }

  function addGroup() {
    setDraft((prev) => ({
      ...prev,
      children: [...prev.children, newGroup()],
    }));
    setIsOpen(true);
  }

  function handleUpdateCondition(
    id: string,
    updates: Partial<FilterCondition>,
  ) {
    setDraft((prev) =>
      updateNodeInTree(prev, id, (node) => {
        if (isFilterGroup(node)) return node;
        const updated = { ...node, ...updates };
        if (updates.columnId && updates.columnId !== node.columnId) {
          const newCol = columns.find((c) => c.id === updates.columnId);
          const ops =
            OPERATORS_BY_TYPE[newCol?.fieldType ?? "TEXT"] ??
            OPERATORS_BY_TYPE.TEXT!;
          updated.operator = ops[0]!.value;
          updated.value = "";
        }
        return updated;
      }),
    );
  }

  function handleRemoveNode(id: string) {
    setDraft((prev) => removeNodeFromTree(prev, id));
  }

  function handleAddToGroup(groupId: string, nodeType: "condition" | "group") {
    setDraft((prev) =>
      addChildToGroup(
        prev,
        groupId,
        nodeType === "condition" ? newCondition() : newGroup(),
      ),
    );
  }

  function handleConjunctionChange(groupId: string, conj: "and" | "or") {
    setDraft((prev) => setGroupConjunction(prev, groupId, conj));
  }

  return (
    <div className="relative" ref={panelRef}>
      {/* Trigger button */}
      <button
        onClick={() => {
          if (activeCount === 0 && !isOpen) {
            addCondition();
          } else {
            setIsOpen(!isOpen);
          }
        }}
        className={`flex items-center gap-1.5 rounded-sm px-2 py-1 text-[13px] transition-colors ${
          activeCount > 0
            ? "bg-green-100 text-green-700"
            : "text-airtable-text-secondary hover:bg-gray-100"
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M1 2h14l-5 6v5l-4 2V8L1 2z" />
        </svg>
        Filter
        {activeCount > 0 && (
          <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-green-600 px-1 text-[10px] font-bold text-white">
            {activeCount}
          </span>
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="absolute left-0 top-full z-30 mt-1 w-[680px] rounded-lg border border-gray-200 bg-white shadow-lg">
          {/* Header */}
          <div className="px-4 pb-2 pt-3">
            <h3 className="text-[14px] font-semibold text-gray-900">Filter</h3>
          </div>

          {/* AI search (visual only) */}
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0 text-purple-400"
              >
                <path
                  d="M8 1l1.5 3.5L13 6l-3 2.5.5 3.5L8 10.5 5.5 12l.5-3.5L3 6l3.5-1.5L8 1z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-[13px] text-gray-400">
                Describe what you want to see
              </span>
            </div>
          </div>

          {/* Subheader */}
          <div className="px-4 pb-2 text-[13px] text-gray-600">
            In this view, show records
          </div>

          {/* Filter nodes */}
          <div className="max-h-[400px] overflow-auto px-4 pb-3">
            <FilterNodeList
              nodes={draft.children}
              parentId={draft.id}
              parentConjunction={draft.conjunction}
              columns={columns}
              onUpdateCondition={handleUpdateCondition}
              onRemoveNode={handleRemoveNode}
              onAddToGroup={handleAddToGroup}
              onConjunctionChange={handleConjunctionChange}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center gap-4 border-t border-gray-100 px-4 py-3">
            <button
              type="button"
              onClick={addCondition}
              className="flex items-center gap-1 text-[13px] text-gray-600 hover:text-gray-900"
            >
              <PlusIcon />
              Add condition
            </button>
            <button
              type="button"
              onClick={addGroup}
              className="flex items-center gap-1 text-[13px] text-gray-600 hover:text-gray-900"
            >
              <PlusIcon />
              Add condition group
            </button>
            <div className="flex size-5 items-center justify-center rounded-full border border-gray-300">
              <span className="text-[11px] text-gray-400">?</span>
            </div>
            <div className="flex-1" />
            {draft.children.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  const empty = createEmptyFilterGroup();
                  setDraft(empty);
                  onChange(empty);
                  setIsOpen(false);
                }}
                className="rounded px-3 py-1.5 text-[13px] text-gray-500 hover:bg-gray-100"
              >
                Clear all
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                onChange(draft);
                setIsOpen(false);
              }}
              className="rounded bg-airtable-blue px-3 py-1.5 text-[13px] font-medium text-white hover:bg-airtable-blue/90"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Shared icons
// ============================================================================

function PlusIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="8" y1="3" x2="8" y2="13" />
      <line x1="3" y1="8" x2="13" y2="8" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2 4h12" />
      <path d="M5 4V2h6v2" />
      <path d="M6 7v5M10 7v5" />
      <path d="M3 4l1 9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-9" />
    </svg>
  );
}

function GripIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
      <circle cx="5" cy="3" r="1.2" />
      <circle cx="11" cy="3" r="1.2" />
      <circle cx="5" cy="8" r="1.2" />
      <circle cx="11" cy="8" r="1.2" />
      <circle cx="5" cy="13" r="1.2" />
      <circle cx="11" cy="13" r="1.2" />
    </svg>
  );
}

// ============================================================================
// FilterNodeList
// ============================================================================

function FilterNodeList({
  nodes,
  parentId,
  parentConjunction,
  columns,
  onUpdateCondition,
  onRemoveNode,
  onAddToGroup,
  onConjunctionChange,
}: {
  nodes: FilterNode[];
  parentId: string;
  parentConjunction: "and" | "or";
  columns: ColumnDef[];
  onUpdateCondition: (id: string, updates: Partial<FilterCondition>) => void;
  onRemoveNode: (id: string) => void;
  onAddToGroup: (groupId: string, nodeType: "condition" | "group") => void;
  onConjunctionChange: (groupId: string, conj: "and" | "or") => void;
}) {
  return (
    <div className="flex flex-col">
      {nodes.map((node, idx) =>
        isFilterGroup(node) ? (
          <GroupRow
            key={node.id}
            group={node}
            index={idx}
            parentId={parentId}
            parentConjunction={parentConjunction}
            columns={columns}
            onUpdateCondition={onUpdateCondition}
            onRemoveNode={onRemoveNode}
            onAddToGroup={onAddToGroup}
            onConjunctionChange={onConjunctionChange}
          />
        ) : (
          <ConditionRow
            key={node.id}
            condition={node}
            index={idx}
            parentId={parentId}
            parentConjunction={parentConjunction}
            columns={columns}
            onUpdate={onUpdateCondition}
            onRemove={onRemoveNode}
            onConjunctionChange={onConjunctionChange}
          />
        ),
      )}
    </div>
  );
}

// ============================================================================
// ConjunctionLabel
// ============================================================================

function ConjunctionLabel({
  index,
  conjunction,
  parentId,
  onConjunctionChange,
}: {
  index: number;
  conjunction: "and" | "or";
  parentId: string;
  onConjunctionChange: (groupId: string, conj: "and" | "or") => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  if (index === 0) {
    return (
      <span className="w-[52px] shrink-0 text-right text-[13px] text-gray-500">
        Where
      </span>
    );
  }

  // Second item: show dropdown to toggle conjunction for parent group
  if (index === 1) {
    return (
      <div ref={ref} className="relative w-[52px] shrink-0 text-right">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex items-center gap-0.5 rounded px-1 py-0.5 text-[13px] text-gray-500 hover:bg-gray-100"
        >
          {conjunction}
          <svg
            width="10"
            height="10"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>
        {open && (
          <div className="absolute right-0 top-full z-40 mt-0.5 w-20 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
            <button
              type="button"
              onClick={() => {
                onConjunctionChange(parentId, "and");
                setOpen(false);
              }}
              className={`flex w-full px-3 py-1 text-left text-[13px] hover:bg-gray-50 ${
                conjunction === "and"
                  ? "font-medium text-gray-900"
                  : "text-gray-600"
              }`}
            >
              and
            </button>
            <button
              type="button"
              onClick={() => {
                onConjunctionChange(parentId, "or");
                setOpen(false);
              }}
              className={`flex w-full px-3 py-1 text-left text-[13px] hover:bg-gray-50 ${
                conjunction === "or"
                  ? "font-medium text-gray-900"
                  : "text-gray-600"
              }`}
            >
              or
            </button>
          </div>
        )}
      </div>
    );
  }

  // Third+ items: static label
  return (
    <span className="w-[52px] shrink-0 text-right text-[13px] text-gray-500">
      {conjunction}
    </span>
  );
}

// ============================================================================
// ConditionRow
// ============================================================================

function ConditionRow({
  condition,
  index,
  parentId,
  parentConjunction,
  columns,
  onUpdate,
  onRemove,
  onConjunctionChange,
}: {
  condition: FilterCondition;
  index: number;
  parentId: string;
  parentConjunction: "and" | "or";
  columns: ColumnDef[];
  onUpdate: (id: string, updates: Partial<FilterCondition>) => void;
  onRemove: (id: string) => void;
  onConjunctionChange: (groupId: string, conj: "and" | "or") => void;
}) {
  const col = columns.find((c) => c.id === condition.columnId);
  const ops =
    OPERATORS_BY_TYPE[col?.fieldType ?? "TEXT"] ?? OPERATORS_BY_TYPE.TEXT!;
  const needsValue = !NO_VALUE_OPERATORS.has(condition.operator);

  return (
    <div className="flex items-center gap-2 py-1">
      <ConjunctionLabel
        index={index}
        conjunction={parentConjunction}
        parentId={parentId}
        onConjunctionChange={onConjunctionChange}
      />

      {/* Column select */}
      <select
        className="w-[100px] rounded border border-gray-200 bg-white px-2 py-1.5 text-[13px] text-gray-700 outline-none focus:border-blue-500"
        value={condition.columnId}
        onChange={(e) => onUpdate(condition.id, { columnId: e.target.value })}
      >
        {columns.map((c) => (
          <option key={c.id} value={c.id}>
            {c.columnName}
          </option>
        ))}
      </select>

      {/* Operator select */}
      <select
        className="w-[110px] rounded border border-gray-200 bg-white px-2 py-1.5 text-[13px] text-gray-700 outline-none focus:border-blue-500"
        value={condition.operator}
        onChange={(e) => {
          const op = e.target.value;
          onUpdate(condition.id, {
            operator: op,
            value: NO_VALUE_OPERATORS.has(op) ? "" : condition.value,
          });
        }}
      >
        {ops.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>

      {/* Value input */}
      {needsValue && (
        <input
          type={col?.fieldType === "NUMBER" ? "number" : "text"}
          placeholder="Enter a value"
          className="w-[120px] rounded border border-gray-200 bg-white px-2 py-1.5 text-[13px] text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-500"
          value={condition.value}
          onChange={(e) => onUpdate(condition.id, { value: e.target.value })}
        />
      )}

      {/* Trash */}
      <button
        type="button"
        onClick={() => onRemove(condition.id)}
        className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
      >
        <TrashIcon />
      </button>

      {/* Grip handle */}
      <button
        type="button"
        className="cursor-grab rounded p-0.5 text-gray-300 hover:text-gray-500"
        title="Drag to reorder"
      >
        <GripIcon />
      </button>
    </div>
  );
}

// ============================================================================
// GroupRow
// ============================================================================

function GroupRow({
  group,
  index,
  parentId,
  parentConjunction,
  columns,
  onUpdateCondition,
  onRemoveNode,
  onAddToGroup,
  onConjunctionChange,
}: {
  group: FilterGroup;
  index: number;
  parentId: string;
  parentConjunction: "and" | "or";
  columns: ColumnDef[];
  onUpdateCondition: (id: string, updates: Partial<FilterCondition>) => void;
  onRemoveNode: (id: string) => void;
  onAddToGroup: (groupId: string, nodeType: "condition" | "group") => void;
  onConjunctionChange: (groupId: string, conj: "and" | "or") => void;
}) {
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const addMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!addMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        addMenuRef.current &&
        !addMenuRef.current.contains(e.target as Node)
      ) {
        setAddMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [addMenuOpen]);

  const isEmpty = group.children.length === 0;
  const groupDescription =
    group.conjunction === "or"
      ? "Any of the following are true..."
      : "All of the following are true...";

  return (
    <div className="py-1">
      <div className="flex items-start gap-2">
        <div className="pt-2">
          <ConjunctionLabel
            index={index}
            conjunction={parentConjunction}
            parentId={parentId}
            onConjunctionChange={onConjunctionChange}
          />
        </div>

        {/* Group container */}
        <div className="min-w-0 flex-1 rounded-md border border-gray-200 bg-gray-50">
          {isEmpty ? (
            <div className="px-3 py-2.5 text-[13px] text-gray-400">
              Drag conditions here to add them to this group
            </div>
          ) : (
            <div className="px-3 py-2">
              <div className="mb-1 text-[13px] text-gray-600">
                {groupDescription}
              </div>
              <FilterNodeList
                nodes={group.children}
                parentId={group.id}
                parentConjunction={group.conjunction}
                columns={columns}
                onUpdateCondition={onUpdateCondition}
                onRemoveNode={onRemoveNode}
                onAddToGroup={onAddToGroup}
                onConjunctionChange={onConjunctionChange}
              />
            </div>
          )}
        </div>

        {/* Add button with dropdown */}
        <div ref={addMenuRef} className="relative pt-2">
          <button
            type="button"
            onClick={() => setAddMenuOpen(!addMenuOpen)}
            className="rounded border border-gray-200 p-1 text-gray-400 hover:border-blue-400 hover:text-blue-500"
          >
            <PlusIcon />
          </button>
          {addMenuOpen && (
            <div className="absolute right-0 top-full z-40 mt-0.5 w-44 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  onAddToGroup(group.id, "condition");
                  setAddMenuOpen(false);
                }}
                className="flex w-full px-3 py-1.5 text-left text-[13px] text-gray-700 hover:bg-gray-50"
              >
                Add condition
              </button>
              <button
                type="button"
                onClick={() => {
                  onAddToGroup(group.id, "group");
                  setAddMenuOpen(false);
                }}
                className="flex w-full px-3 py-1.5 text-left text-[13px] text-gray-700 hover:bg-gray-50"
              >
                Add condition group
              </button>
            </div>
          )}
        </div>

        {/* Trash */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => onRemoveNode(group.id)}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <TrashIcon />
          </button>
        </div>

        {/* Grip handle */}
        <div className="pt-2">
          <button
            type="button"
            className="cursor-grab rounded p-0.5 text-gray-300 hover:text-gray-500"
            title="Drag to reorder"
          >
            <GripIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
