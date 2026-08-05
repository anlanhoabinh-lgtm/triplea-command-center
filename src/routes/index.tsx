import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/triplea/app-shell";
import { RunningTasks } from "@/components/triplea/running-tasks";
import { CommandCenter } from "@/components/triplea/command-center";
import { ConversationPanel } from "@/components/triplea/conversation-panel";
import { StatusPanel } from "@/components/triplea/status-panel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TripleA AI — AI Operating System Dashboard" },
      {
        name: "description",
        content:
          "Command center for TripleA AI: running agent tasks, quick actions, live chat and model telemetry in one dark glass dashboard.",
      },
      { property: "og:title", content: "TripleA AI — AI Operating System Dashboard" },
      {
        property: "og:description",
        content:
          "Running tasks, AI command center, conversation and live model telemetry in one interface.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <AppShell>
      <div className="grid gap-4 xl:grid-cols-[300px_minmax(0,1fr)_300px]">
        <div className="flex flex-col gap-4">
          <RunningTasks />
          <CommandCenter />
        </div>
        <ConversationPanel />
        <StatusPanel />
      </div>
    </AppShell>
  );
}
