"use client";

import { useState } from "react";
import Link from "next/link";
import { Boxes, Plus, Settings } from "lucide-react";
import { api } from "~/trpc/react";

const BASE_COLORS = [
  "#1d7c6a",
  "#2d7ff9",
  "#8b46ff",
  "#ff08c2",
  "#f82b60",
  "#ff6f2c",
  "#fcb400",
  "#20c933",
];

export function BasesPage() {
  const { data: bases, isLoading } = api.base.getAll.useQuery();
  const utils = api.useUtils();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBaseName, setNewBaseName] = useState("");
  const [newBaseDescription, setNewBaseDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(BASE_COLORS[0]!);
  const [renamingBaseId, setRenamingBaseId] = useState<string | null>(null);
  const [renameBaseValue, setRenameBaseValue] = useState("");

  const createBase = api.base.create.useMutation({
    onMutate: async (variables) => {
      await utils.base.getAll.cancel();
      const previousBases = utils.base.getAll.getData();
      utils.base.getAll.setData(undefined, (old) => [
        ...(old ?? []),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { id: `temp-${Date.now()}`, baseName: variables.baseName, color: variables.color ?? "#2d7ff9", description: variables.description ?? null } as any,
      ]);
      return { previousBases };
    },
    onError: (_err, _variables, context) => {
      utils.base.getAll.setData(undefined, context?.previousBases);
    },
    onSettled: () => {
      void utils.base.getAll.invalidate();
    },
    onSuccess: () => {
      setShowCreateModal(false);
      setNewBaseName("");
      setNewBaseDescription("");
      setSelectedColor(BASE_COLORS[0]!);
    },
  });

  const renameBase = api.base.update.useMutation({
    onMutate: async (variables) => {
      await utils.base.getAll.cancel();
      const previousBases = utils.base.getAll.getData();
      utils.base.getAll.setData(undefined, (old) =>
        (old ?? []).map((b) => b.id === variables.id ? { ...b, baseName: variables.baseName ?? b.baseName } : b),
      );
      return { previousBases };
    },
    onError: (_err, _variables, context) => {
      utils.base.getAll.setData(undefined, context?.previousBases);
    },
    onSettled: () => { void utils.base.getAll.invalidate(); },
    onSuccess: () => { setRenamingBaseId(null); setRenameBaseValue(""); },
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
  });

  const baseList = bases ?? [];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left sidebar - Airtable style */}
      <aside className="flex w-12 shrink-0 flex-col items-center border-r border-airtable-border bg-airtable-sidebar-bg py-3">
        <Link
          href="/"
          title="All bases"
          className="inline-flex size-8 items-center justify-center rounded-lg text-airtable-text-secondary transition-colors hover:bg-gray-200 hover:text-airtable-text-primary"
        >
          <Boxes className="size-5 text-airtable-text-primary" />
        </Link>
        <button
          type="button"
          className="mt-2 inline-flex size-8 items-center justify-center rounded-lg text-airtable-text-muted transition-colors hover:bg-gray-200 hover:text-airtable-text-secondary"
          title="Settings"
        >
          <Settings className="size-5" />
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-airtable-blue">
              <Boxes className="size-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">Airtable Clone</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Bases</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage your databases
          </p>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-gray-500">Loading bases...</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Create new base card */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="group flex h-[140px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white transition-all hover:border-airtable-blue hover:bg-blue-50"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors group-hover:bg-airtable-blue group-hover:text-white">
                <Plus className="size-6" />
              </div>
              <span className="text-sm font-medium text-gray-600 group-hover:text-airtable-blue">
                Create new base
              </span>
            </button>

            {/* Existing bases */}
            {baseList.map((base) => (
              <div
                key={base.id}
                className="group relative flex h-[140px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                {/* Colored header */}
                <div
                  className="h-16 shrink-0"
                  style={{ backgroundColor: base.color }}
                />
                
                {renamingBaseId === base.id ? (
                  <div className="flex flex-1 items-center gap-3 px-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg font-bold text-white shadow-sm"
                      style={{ backgroundColor: base.color }}
                    >
                      {renameBaseValue.charAt(0).toUpperCase() || base.baseName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <input
                        autoFocus
                        value={renameBaseValue}
                        onChange={(e) => setRenameBaseValue(e.target.value)}
                        onBlur={() => {
                          if (renameBaseValue.trim()) renameBase.mutate({ id: base.id, baseName: renameBaseValue.trim() });
                          else { setRenamingBaseId(null); setRenameBaseValue(""); }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && renameBaseValue.trim()) renameBase.mutate({ id: base.id, baseName: renameBaseValue.trim() });
                          if (e.key === "Escape") { setRenamingBaseId(null); setRenameBaseValue(""); }
                        }}
                        className="w-full truncate rounded border border-airtable-blue px-1 py-0.5 text-sm font-semibold text-gray-900 outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <Link
                    href={`/base/${base.id}`}
                    className="flex flex-1 items-center gap-3 px-4"
                  >
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg font-bold text-white shadow-sm"
                      style={{ backgroundColor: base.color }}
                    >
                      {base.baseName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-gray-900">
                        {base.baseName}
                      </h3>
                      {base.description && (
                        <p className="truncate text-xs text-gray-500">
                          {base.description}
                        </p>
                      )}
                    </div>
                  </Link>
                )}

                {/* Rename button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setRenamingBaseId(base.id);
                    setRenameBaseValue(base.baseName);
                  }}
                  className="absolute right-9 top-2 rounded-md bg-black/20 p-1.5 text-white opacity-0 transition-opacity hover:bg-black/40 group-hover:opacity-100"
                  title="Rename base"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M11 2l3 3-8 8H3v-3L11 2z"/>
                  </svg>
                </button>

                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteBase.mutate({ id: base.id });
                  }}
                  className="absolute right-2 top-2 rounded-md bg-black/20 p-1.5 text-white opacity-0 transition-opacity hover:bg-black/40 group-hover:opacity-100"
                  title="Delete base"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 4h12M5.5 4V2.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V4M6.5 7v5M9.5 7v5M3.5 4l.5 9.5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1L12.5 4"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {!isLoading && baseList.length === 0 && (
          <div className="mt-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Boxes className="size-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No bases yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating your first base</p>
          </div>
        )}
      </main>

      {/* Create base modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-gray-900">Create a new base</h2>
            <p className="mt-1 text-sm text-gray-500">Give your base a name, optional description, and pick a color</p>
            
            <form
              className="mt-6"
              onSubmit={(e) => {
                e.preventDefault();
                if (!newBaseName.trim()) return;
                createBase.mutate({
                  baseName: newBaseName.trim(),
                  description: newBaseDescription.trim() || undefined,
                  color: selectedColor,
                });
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    autoFocus
                    type="text"
                    placeholder="My awesome base"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-airtable-blue focus:ring-2 focus:ring-airtable-blue/20"
                    value={newBaseName}
                    onChange={(e) => setNewBaseName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Description <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Track riders, teams, and race results"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-airtable-blue focus:ring-2 focus:ring-airtable-blue/20"
                    value={newBaseDescription}
                    onChange={(e) => setNewBaseDescription(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Color
                  </label>
                  <div className="flex gap-2">
                    {BASE_COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`h-8 w-8 rounded-full transition-transform hover:scale-110 ${
                          selectedColor === color ? "ring-2 ring-offset-2" : ""
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewBaseName("");
                    setNewBaseDescription("");
                  }}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createBase.isPending || !newBaseName.trim()}
                  className="rounded-lg bg-airtable-blue px-4 py-2 text-sm font-medium text-white hover:bg-airtable-blue/90 disabled:opacity-50"
                >
                  {createBase.isPending ? "Creating..." : "Create base"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
