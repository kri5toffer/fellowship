"use client";

import { useState } from "react";
import { EllipsisVertical, Home, Plus, Trash2 } from "lucide-react";
import { api } from "~/trpc/react";

export function BaseSelector({
  activeBaseId,
  onSelectBase,
}: {
  activeBaseId: string | null;
  onSelectBase: (baseId: string) => void;
}) {
  const { data: bases, isLoading } = api.base.getAll.useQuery();
  const utils = api.useUtils();
  const [creatingBase, setCreatingBase] = useState(false);
  const [newBaseName, setNewBaseName] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const createBase = api.base.create.useMutation({
    onMutate: async (variables) => {
      await utils.base.getAll.cancel();
      const previousBases = utils.base.getAll.getData();
      utils.base.getAll.setData(undefined, (old) => [
        ...(old ?? []),
        { id: `temp-${Date.now()}`, baseName: variables.baseName, color: "#2d7ff9", description: null } as unknown as NonNullable<typeof previousBases>[number],
      ]);
      return { previousBases };
    },
    onError: (_err, _variables, context) => {
      utils.base.getAll.setData(undefined, context?.previousBases);
    },
    onSettled: () => {
      void utils.base.getAll.invalidate();
    },
    onSuccess: (newBase) => {
      onSelectBase(newBase.id);
      setCreatingBase(false);
      setNewBaseName("");
    },
  });

  const deleteBase = api.base.delete.useMutation({
    onMutate: async (variables) => {
      await utils.base.getAll.cancel();
      const previousBases = utils.base.getAll.getData();
      utils.base.getAll.setData(undefined, (old) =>
        (old ?? []).filter((b) => b.id !== variables.id),
      );
      return { previousBases };
    },
    onError: (_err, _variables, context) => {
      utils.base.getAll.setData(undefined, context?.previousBases);
    },
    onSettled: () => {
      void utils.base.getAll.invalidate();
    },
    onSuccess: () => {
      setMenuOpenId(null);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 border-b border-airtable-border bg-airtable-sidebar-bg px-4 py-2 text-sm text-airtable-text-muted">
        Loading workspaces...
      </div>
    );
  }

  const baseList = bases ?? [];

  return (
    <div 
      className="flex items-center gap-1 border-b border-airtable-border bg-airtable-sidebar-bg px-4 py-1.5"
      onClick={() => setMenuOpenId(null)}
    >
      {/* Home icon */}
      <button className="rounded p-1.5 text-airtable-text-secondary hover:bg-gray-200">
        <Home className="size-[18px]" />
      </button>

      <div className="mx-1 h-5 w-px bg-airtable-border" />

      {/* Base tabs */}
      {baseList.map((base) => (
        <div key={base.id} className="group relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectBase(base.id);
            }}
            className={`flex items-center gap-2 rounded px-4 py-1.5 pr-8 text-[13px] font-medium transition-colors ${
              base.id === activeBaseId
                ? "bg-white text-airtable-text-primary shadow-sm"
                : "text-airtable-text-secondary hover:bg-gray-200"
            }`}
          >
            <span
              className="flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-white"
              style={{ backgroundColor: base.color }}
            >
              {base.baseName.charAt(0).toUpperCase()}
            </span>
            {base.baseName}
          </button>
          
          {/* Menu button - shows on hover */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpenId(menuOpenId === base.id ? null : base.id);
            }}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded p-0.5 opacity-0 hover:bg-gray-300 group-hover:opacity-100"
          >
            <EllipsisVertical className="size-3.5 text-gray-500" />
          </button>

          {/* Dropdown menu */}
          {menuOpenId === base.id && (
            <div className="absolute left-0 top-full z-30 mt-1 w-40 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteBase.mutate({ id: base.id });
                  setMenuOpenId(null);
                }}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] text-red-600 hover:bg-red-50"
              >
                <Trash2 className="size-3.5" />
                Delete base
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Add base button/form */}
      {creatingBase ? (
        <form
          className="flex items-center gap-1.5 ml-1"
          onSubmit={(e) => {
            e.preventDefault();
            if (!newBaseName.trim()) return;
            createBase.mutate({ baseName: newBaseName.trim() });
          }}
        >
          <input
            autoFocus
            type="text"
            placeholder="Base name"
            className="rounded border border-gray-300 bg-white px-2 py-1 text-[13px] outline-none focus:border-airtable-blue focus:ring-1 focus:ring-airtable-blue"
            value={newBaseName}
            onChange={(e) => setNewBaseName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setCreatingBase(false);
                setNewBaseName("");
              }
            }}
          />
          <button
            type="submit"
            className="rounded bg-airtable-blue px-3 py-1 text-[13px] font-medium text-white hover:bg-airtable-blue/90"
            disabled={createBase.isPending}
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => {
              setCreatingBase(false);
              setNewBaseName("");
            }}
            className="rounded px-2 py-1 text-[13px] text-airtable-text-muted hover:bg-gray-200"
          >
            Cancel
          </button>
        </form>
      ) : (
        <button
          onClick={() => setCreatingBase(true)}
          className="ml-1 flex items-center gap-1 rounded px-2 py-1.5 text-[13px] text-airtable-text-muted hover:bg-gray-200 hover:text-airtable-text-secondary"
        >
          <Plus className="size-3.5" />
          Add base
        </button>
      )}
    </div>
  );
}
