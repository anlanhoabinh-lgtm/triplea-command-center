import { createFileRoute } from "@tanstack/react-router";
import { SideNav } from "@/components/triplea/side-nav";
import { TopBar } from "@/components/triplea/top-bar";
import { RunningTasks } from "@/components/triplea/running-tasks";
import { CommandCenter } from "@/components/triplea/command-center";
import { ConversationPanel } from "@/components/triplea/conversation-panel";
import { StatusPanel } from "@/components/triplea/status-panel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TripleA AI — Autonomous Agent Command Center" },
      {
        name: "description",
        content:
          "Monitor running agent tasks, launch AI commands, chat with TripleA v4.2 and track live model telemetry from one dark glass dashboard.",
      },
      { property: "og:title", content: "TripleA AI — Autonomous Agent Command Center" },
      {
        property: "og:description",
        content:
          "Running tasks, AI command center, encrypted conversation and live model telemetry in one interface.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen p-3 sm:p-4 lg:p-6">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4">
        <TopBar />

        <div className="flex flex-col gap-4 lg:flex-row">
          <SideNav />

          <div className="grid flex-1 gap-4 xl:grid-cols-[300px_minmax(0,1fr)_300px]">
            <div className="flex flex-col gap-4">
              <RunningTasks />
              <CommandCenter />
            </div>

            <ConversationPanel />

            <StatusPanel />
          </div>
        </div>
      </div>
    </main>
  );
}
