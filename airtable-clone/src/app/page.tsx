import { HydrateClient } from "~/trpc/server";
import { BasesPage } from "./_components/bases-page";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <HydrateClient>
      <BasesPage />
    </HydrateClient>
  );
}
