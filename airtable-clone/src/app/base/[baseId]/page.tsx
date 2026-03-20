"use client";

import { use } from "react";
import Link from "next/link";
import {
  Bell,
  Boxes,
  ChevronDown,

  HelpCircle,
  Settings,
  Share2,
  SquareArrowOutUpRight,
} from "lucide-react";
import { api } from "~/trpc/react";
import { TableTabs } from "~/app/_components/table-tabs";
import { Button, buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

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
          className={cn(
            buttonVariants({ variant: "default" }),
            "bg-airtable-blue hover:bg-airtable-blue/90"
          )}
        >
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="flex flex-1">
        {/* Left sidebar - Airtable style */}
        <aside
          className="shrink-0 bg-white"
          style={{
            position: "sticky",
            top: 0,
            width: "56px",
            height: "100vh",
            padding: "1rem 0.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRight: "1px solid rgba(0,0,0,0.1)",
            boxSizing: "border-box",
            zIndex: 10,
          }}
        >
          {/* Top icons */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <Link
              href="/"
              title="All bases"
              className="inline-flex items-center justify-center rounded-lg text-[rgb(29,31,37)] transition-colors hover:bg-[rgb(242,244,248)]"
              style={{ height: "28px", width: "28px" }}
            >
              <Boxes className="size-4" />
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg text-[rgb(97,102,112)] transition-colors hover:bg-[rgb(242,244,248)] hover:text-[rgb(29,31,37)]"
              style={{ height: "28px", width: "28px" }}
              title="Settings"
            >
              <Settings className="size-4" />
            </button>
          </div>

          {/* Bottom icons */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full text-[rgb(97,102,112)] transition-colors hover:bg-[rgb(242,244,248)] hover:text-[rgb(29,31,37)]"
              style={{ height: "28px", width: "28px" }}
              title="Help"
            >
              <HelpCircle className="size-4" />
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full text-[rgb(97,102,112)] transition-colors hover:bg-[rgb(242,244,248)] hover:text-[rgb(29,31,37)]"
              style={{ height: "28px", width: "28px" }}
              title="Notifications"
            >
              <Bell className="size-4" />
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-teal-500 text-[13px] font-semibold text-white hover:opacity-90"
              style={{ height: "28px", width: "28px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)", border: "2px solid white" }}
              title="User"
            >
              C
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top navigation bar - Airtable style */}
          <header className="flex items-center border-b border-airtable-border bg-white px-4 py-2">
            {/* Base icon + name dropdown */}
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-airtable-purple">
                <Boxes className="size-4 text-white" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto shrink-0 gap-1 px-2 py-1 text-[13px] font-medium text-airtable-text-primary hover:bg-gray-100"
              >
                {base.baseName}
                <ChevronDown className="size-3" />
              </Button>
            </div>

            {/* Primary tabs: Data, Automations, Interfaces, Forms - centered */}
            <div className="flex flex-1 items-center justify-center gap-1">
              <button className="border-b-2 border-b-gray-900 px-3 py-2 text-[13px] font-semibold text-gray-900">
                Data
              </button>
              <button className="px-3 py-2 text-[13px] font-medium text-airtable-text-secondary hover:text-airtable-text-primary">
                Automations
              </button>
              <button className="px-3 py-2 text-[13px] font-medium text-airtable-text-secondary hover:text-airtable-text-primary">
                Interfaces
              </button>
              <button className="px-3 py-2 text-[13px] font-medium text-airtable-text-secondary hover:text-airtable-text-primary">
                Forms
              </button>
            </div>

            {/* Right section: Trial, Launch, Share */}
            <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
              <button
                type="button"
                className="flex items-center justify-center rounded text-[13px]"
                style={{
                  color: "#1D1F25",
                  backgroundColor: "rgba(0,0,0,0.05)",
                  margin: "0 8px",
                  padding: "0 12px",
                  height: 32,
                  border: "none",
                }}
              >
                Trial: 5 days left
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-1.5 rounded text-[13px]"
                style={{
                  color: "#1D1F25",
                  backgroundColor: "rgba(0,0,0,0.05)",
                  padding: "0 12px",
                  height: 32,
                  border: "none",
                }}
              >
                <SquareArrowOutUpRight className="size-3.5" />
                Launch
                <ChevronDown className="size-3" />
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-1.5 rounded text-[13px] font-medium text-white"
                style={{
                  backgroundColor: "rgba(0,0,0,0.05)",
                  padding: "0 12px",
                  height: 32,
                  border: "none",
                  background: "#8b46ff",
                }}
              >
                <Share2 className="size-3.5" />
                Share
              </button>
            </div>
          </header>

          {/* Table tabs and grid */}
          <div className="flex min-h-0 flex-1 flex-col">
            <TableTabs baseId={baseId} />
          </div>
        </div>
      </div>
    </main>
  );
}
