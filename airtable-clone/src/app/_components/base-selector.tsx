"use client";

import { useState } from "react";
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
    onSuccess: (newBase) => {
      void utils.base.getAll.invalidate();
      onSelectBase(newBase.id);
      setCreatingBase(false);
      setNewBaseName("");
    },
  });

  const deleteBase = api.base.delete.useMutation({
    onSuccess: () => {
      void utils.base.getAll.invalidate();
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
        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146z"/>
        </svg>
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
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="text-gray-500">
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>
          </button>

          {/* Dropdown menu */}
          {menuOpenId === base.id && (
            <div className="absolute left-0 top-full z-30 mt-1 w-40 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Delete "${base.baseName}"? This will delete all tables and data in this base.`)) {
                    deleteBase.mutate({ id: base.id });
                  }
                  setMenuOpenId(null);
                }}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] text-red-600 hover:bg-red-50"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 4h12M5.5 4V2.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V4M6.5 7v5M9.5 7v5M3.5 4l.5 9.5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1L12.5 4"/>
                </svg>
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
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" y1="3" x2="8" y2="13" />
            <line x1="3" y1="8" x2="13" y2="8" />
          </svg>
          Add base
        </button>
      )}
    </div>
  );
}
