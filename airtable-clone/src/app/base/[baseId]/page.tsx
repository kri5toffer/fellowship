"use client";

import { use } from "react";
import Link from "next/link";
import {
  Bell,
  Boxes,
  ChevronDown,
  History,
  HelpCircle,
  LayoutDashboard,
  Link2,
  Settings,
  Share2,
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
              <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                <path d="M1.849 11.12c-0.008-0-0.018-0.001-0.029-0.001-0.223 0-0.425 0.091-0.571 0.238l-0 0c-0.141 0.126-0.234 0.304-0.245 0.504l-0 0.002v10.441c0.024 0.42 0.371 0.751 0.794 0.751 0.124 0 0.241-0.028 0.345-0.079l-0.005 0.002 8.219-3.94 3.71-1.794c0.246-0.125 0.411-0.376 0.411-0.666 0-0.319-0.2-0.591-0.482-0.697l-0.005-0.002-11.884-4.706c-0.076-0.033-0.165-0.053-0.258-0.055l-0.001-0zM30.246 11.071c-0.1 0.001-0.195 0.021-0.282 0.058l0.005-0.002-12.511 4.845c-0.28 0.117-0.474 0.388-0.475 0.705v11.117c0.004 0.411 0.338 0.743 0.75 0.743 0.099 0 0.194-0.019 0.281-0.055l-0.005 0.002 12.513-4.861c0.28-0.106 0.475-0.372 0.475-0.683 0-0.002 0-0.004-0-0.006v0-11.117c-0.003-0.412-0.337-0.745-0.75-0.745 0 0 0 0-0 0v0zM15.99 3.461c-0.577 0-1.127 0.118-1.627 0.331l0.027-0.010-11.163 4.616c-0.274 0.116-0.463 0.383-0.463 0.694 0 0.317 0.196 0.588 0.473 0.699l0.005 0.002 11.224 4.446c0.454 0.189 0.981 0.299 1.533 0.299s1.080-0.11 1.56-0.309l-0.027 0.010 11.224-4.446c0.28-0.115 0.473-0.385 0.473-0.7 0-0.31-0.187-0.576-0.453-0.692l-0.005-0.002-11.193-4.616c-0.468-0.203-1.012-0.321-1.584-0.321-0.002 0-0.004 0-0.006 0h0z" />
              </svg>
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
                className="h-auto shrink-0 gap-1 px-2 py-1 text-airtable-text-primary hover:bg-gray-100"
                style={{
                  fontSize: 17,
                  fontWeight: 675,
                  letterSpacing: "-0.16px",
                  lineHeight: "24px",
                }}
              >
                {base.baseName}
                <ChevronDown className="size-3" />
              </Button>
            </div>

            {/* Primary tabs: Data, Automations, Interfaces, Forms - centered */}
            <div className="flex flex-1 items-center justify-center gap-1">
              <button className="border-b-2 border-b-[#8c3f78] px-3 text-[13px] font-semibold text-gray-900 h-full flex items-center">
                Data
              </button>
              <button className="px-3 text-[13px] font-medium text-airtable-text-secondary hover:text-airtable-text-primary h-full flex items-center">
                Automations
              </button>
              <button className="px-3 text-[13px] font-medium text-airtable-text-secondary hover:text-airtable-text-primary h-full flex items-center">
                Interfaces
              </button>
              <button className="px-3 text-[13px] font-medium text-airtable-text-secondary hover:text-airtable-text-primary h-full flex items-center">
                Forms
              </button>
            </div>

            {/* Right section: History, Trial, Launch, Link, Share */}
            <div className="flex min-w-0 flex-1 items-center justify-end gap-1.5">
              {/* History */}
              <button
                type="button"
                className="flex items-center justify-center rounded-full text-[rgb(97,102,112)] transition-colors hover:bg-[rgba(0,0,0,0.06)]"
                style={{ width: 32, height: 32 }}
                title="Base history"
              >
                <History className="size-[18px]" />
              </button>

              {/* Trial */}
              <button
                type="button"
                className="flex items-center justify-center rounded-md text-[13px] font-normal text-[rgb(29,31,37)] transition-colors hover:bg-[rgba(0,0,0,0.08)]"
                style={{
                  backgroundColor: "rgba(0,0,0,0.05)",
                  padding: "0 12px",
                  height: 32,
                  border: "1px solid rgba(0,0,0,0.1)",
                  whiteSpace: "nowrap",
                }}
              >
                Trial: 5 days left
              </button>

              {/* Launch */}
              <button
                type="button"
                className="flex items-center justify-center gap-1.5 rounded-md text-[13px] font-normal text-[rgb(29,31,37)] transition-colors hover:bg-[rgba(0,0,0,0.08)]"
                style={{
                  backgroundColor: "rgba(0,0,0,0.05)",
                  padding: "0 10px",
                  height: 32,
                  border: "1px solid rgba(0,0,0,0.1)",
                }}
              >
                <LayoutDashboard className="size-[15px]" />
                Launch
                <ChevronDown className="size-3 text-[rgb(97,102,112)]" />
              </button>

              {/* Link / publish */}
              <button
                type="button"
                className="flex items-center justify-center rounded-md text-[rgb(97,102,112)] transition-colors hover:bg-[rgba(0,0,0,0.06)]"
                style={{ width: 32, height: 32, border: "1px solid rgba(0,0,0,0.1)", backgroundColor: "rgba(0,0,0,0.05)" }}
                title="Copy link"
              >
                <Link2 className="size-[15px]" />
              </button>

              {/* Share */}
              <button
                type="button"
                className="flex items-center justify-center gap-1.5 rounded-md text-[13px] font-medium text-white transition-colors hover:opacity-90"
                style={{
                  background: "#8c3f78",
                  padding: "0 14px",
                  height: 32,
                  border: "none",
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
