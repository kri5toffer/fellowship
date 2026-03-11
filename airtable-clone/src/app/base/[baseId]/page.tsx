"use client";

import { use } from "react";
import Link from "next/link";
import { api } from "~/trpc/react";
import { TableTabs } from "~/app/_components/table-tabs";

export default function BasePage({
  params,
}: {
  params: Promise<{ baseId: string }>;
}) {
  const { baseId } = use(params);
  const { data: base, isLoading } = api.base.getById.useQuery({ id: baseId });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!base) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
        <div className="text-gray-500">Base not found</div>
        <Link
          href="/"
          className="rounded-lg bg-airtable-blue px-4 py-2 text-sm font-medium text-white hover:bg-airtable-blue/90"
        >
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-2">
        <Link
          href="/"
          className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          title="Back to all bases"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
        </Link>

        <div className="h-5 w-px bg-gray-200" />

        <div className="flex items-center gap-2">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-md text-sm font-bold text-white"
            style={{ backgroundColor: base.color }}
          >
            {base.baseName.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-semibold text-gray-900">
            {base.baseName}
          </span>
        </div>
      </header>

      {/* Table tabs and grid */}
      <div className="flex min-h-0 flex-1 flex-col">
        <TableTabs baseId={baseId} />
      </div>
    </main>
  );
}
