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

  const createBase = api.base.create.useMutation({
    onSuccess: (newBase) => {
      void utils.base.getAll.invalidate();
      onSelectBase(newBase.id);
      setCreatingBase(false);
      setNewBaseName("");
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400">
        Loading bases...
      </div>
    );
  }

  const baseList = bases ?? [];

  return (
    <div className="flex items-center gap-1 border-b border-gray-200 bg-white px-4 py-2">
      {baseList.map((base) => (
        <button
          key={base.id}
          onClick={() => onSelectBase(base.id)}
          className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            base.id === activeBaseId
              ? "bg-gray-100 text-gray-900"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <span
            className="h-3 w-3 rounded-sm"
            style={{ backgroundColor: base.color }}
          />
          {base.baseName}
        </button>
      ))}

      {creatingBase ? (
        <form
          className="flex items-center gap-1.5"
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
            className="rounded border border-gray-300 px-2 py-1 text-sm outline-none focus:border-airtable-blue"
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
            className="rounded bg-airtable-blue px-2.5 py-1 text-sm font-medium text-white hover:bg-airtable-blue/90"
            disabled={createBase.isPending}
          >
            Add
          </button>
        </form>
      ) : (
        <button
          onClick={() => setCreatingBase(true)}
          className="rounded-md px-2 py-1.5 text-sm text-gray-400 hover:bg-gray-50 hover:text-gray-600"
        >
          + New base
        </button>
      )}
    </div>
  );
}
