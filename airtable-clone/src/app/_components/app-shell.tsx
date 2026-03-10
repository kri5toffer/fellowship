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

  return (
    <div className="flex min-h-screen flex-col">
      {/* Base selector / workspace bar */}
      <BaseSelector activeBaseId={selectedBaseId} onSelectBase={setActiveBaseId} />

      {/* Main content area */}
      <div className="flex flex-1 flex-col bg-white">
        {selectedBaseId ? (
          <TableTabs baseId={selectedBaseId} />
        ) : (
          <div className="flex flex-1 items-center justify-center text-airtable-text-muted">
            Create a base to get started
          </div>
        )}
      </div>
    </div>
  );
}
