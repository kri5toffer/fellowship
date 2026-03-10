import { HydrateClient } from "~/trpc/server";
import { AppShell } from "./_components/app-shell";

// Disable static prerendering - page needs database at runtime
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col bg-white">
        <AppShell />
      </main>
    </HydrateClient>
  );
}
