import { api, HydrateClient } from "~/trpc/server";
import { AppShell } from "./_components/app-shell";

export default async function Home() {
  void api.base.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col bg-white">
        <AppShell />
      </main>
    </HydrateClient>
  );
}
