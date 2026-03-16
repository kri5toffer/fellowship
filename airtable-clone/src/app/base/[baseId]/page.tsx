"use client";

import { use } from "react";
import Link from "next/link";
import {
  Bell,
  Boxes,
  ChevronDown,
  Clock,
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
        <aside className="flex w-12 shrink-0 flex-col items-center self-stretch border-r border-airtable-border bg-white py-3">
          <Link
            href="/"
            title="All bases"
            className="inline-flex size-8 items-center justify-center rounded-lg text-airtable-text-secondary transition-colors hover:bg-gray-200 hover:text-airtable-text-primary"
          >
            <Boxes className="size-5 text-airtable-text-primary" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="mt-2 text-airtable-text-muted hover:bg-gray-200 hover:text-airtable-text-secondary"
            title="Settings"
          >
            <Settings className="size-5" />
          </Button>

          {/* Three icons - help, bell, avatar - in left column */}
          <div className="mt-auto flex flex-col items-center gap-3 pt-6">
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-lg border-2 border-airtable-blue bg-white text-airtable-text-muted hover:text-airtable-text-primary"
              title="Help"
            >
              <HelpCircle className="size-4" />
            </button>
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-lg text-airtable-text-muted hover:bg-gray-100 hover:text-airtable-text-primary"
              title="Notifications"
            >
              <Bell className="size-4" />
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-full bg-airtable-teal text-sm font-medium text-white hover:opacity-90"
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
              <Button
                variant="ghost"
                size="sm"
                className="h-auto border-b-2 border-airtable-text-primary px-3 py-2 text-[13px] font-medium text-airtable-text-primary"
              >
                Data
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto px-3 py-2 text-[13px] font-medium text-airtable-text-secondary hover:text-airtable-text-primary"
              >
                Automations
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto px-3 py-2 text-[13px] font-medium text-airtable-text-secondary hover:text-airtable-text-primary"
              >
                Interfaces
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto px-3 py-2 text-[13px] font-medium text-airtable-text-secondary hover:text-airtable-text-primary"
              >
                Forms
              </Button>
            </div>

            {/* Right section: Trial, Launch, Share */}
            <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-auto gap-1.5 border-airtable-border bg-white px-3 py-1.5 text-[13px] text-airtable-text-secondary hover:bg-gray-50"
              >
                <Clock className="size-3.5 text-airtable-text-muted" />
                Trial: 14 days left
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-auto gap-1.5 border-airtable-border bg-white px-3 py-1.5 text-[13px] text-airtable-text-secondary hover:bg-gray-50"
              >
                <SquareArrowOutUpRight className="size-3.5 text-airtable-text-muted" />
                Launch
                <ChevronDown className="size-3" />
              </Button>
              <Button
                size="sm"
                className="h-auto gap-1.5 bg-airtable-purple px-3 py-1.5 text-[13px] font-medium text-white hover:bg-airtable-purple/90"
              >
                <Share2 className="size-3.5" />
                Share
              </Button>
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
