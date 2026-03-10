"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { BaseSelector } from "./base-selector";
import { TableTabs } from "./table-tabs";

export function AppShell() {
  const { data: bases } = api.base.getAll.useQuery();
  const [activeBaseId, setActiveBaseId] = useState<string | null>(null);

  const baseList = bases ?? [];
  const selectedBaseId = activeBaseId ?? baseList[0]?.id ?? null;
  const selectedBase = baseList.find((b) => b.id === selectedBaseId);

  return (
    <>
      {/* Top banner — shows selected base info */}
      <header
        className="flex items-center gap-3 px-5 py-2.5"
        style={{ backgroundColor: selectedBase?.color ?? "#1d7c6a" }}
      >
        <div
          className="flex h-7 w-7 items-center justify-center rounded text-sm font-bold text-white"
          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        >
          {selectedBase?.baseName?.charAt(0).toUpperCase() ?? "L"}
        </div>
        <div>
          <h1 className="text-sm font-semibold leading-tight text-white">
            {selectedBase?.baseName ?? "Lyra"}
          </h1>
          {selectedBase?.description && (
            <p className="text-[11px] leading-tight text-white/60">
              {selectedBase.description}
            </p>
          )}
        </div>
      </header>

      {/* Base selector bar */}
      <BaseSelector activeBaseId={selectedBaseId} onSelectBase={setActiveBaseId} />

      {/* Main content */}
      {selectedBaseId ? (
        <TableTabs baseId={selectedBaseId} />
      ) : (
        <div className="flex flex-1 items-center justify-center text-gray-400">
          Create a base to get started
        </div>
      )}
    </>
  );
}
