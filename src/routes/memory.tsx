import { createFileRoute } from "@tanstack/react-router";
import { Brain, Plus, Sparkles } from "lucide-react";
import { AppShell } from "@/components/triplea/app-shell";
import { ActionButton, PageHeader, Panel, StatChip, Tag } from "@/components/triplea/ui-kit";
import { memoryEntries } from "@/lib/triplea-data";

export const Route = createFileRoute("/memory")({
  head: () => ({
    meta: [
      { title: "Memory — TripleA AI" },
      {
        name: "description",
        content:
          "TripleA remembers your preferences, past conversations and projects so every answer stays in context.",
      },
      { property: "og:title", content: "Memory — TripleA AI" },
      {
        property: "og:description",
        content: "Persistent preferences, conversation recall and project memory.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MemoryPage,
});

function MemoryPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-4">
        <PageHeader
          icon={Brain}
          eyebrow="Memory"
          title="TripleA remembers how you work"
          description="Preferences, people, facts and project context are stored and recalled automatically across every chat, build and search."
          actions={<ActionButton icon={Plus} variant="primary">Add memory</ActionButton>}
        />

        <div className="grid gap-3 sm:grid-cols-4">
          <StatChip label="Stored memories" value="46" />
          <StatChip label="Preferences" value="18" tone="violet" />
          <StatChip label="Linked projects" value="12" tone="lime" />
          <StatChip label="Recall accuracy" value="94%" tone="amber" />
        </div>

        <Panel title="Memory store" icon={Sparkles} bodyClassName="grid gap-3 sm:grid-cols-2">
          {memoryEntries.map((entry) => (
            <article
              key={entry.id}
              className="glass-tile p-4 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Tag tone="violet">{entry.category}</Tag>
              <p className="mt-2 text-sm font-semibold">{entry.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{entry.value}</p>
              <p className="mt-2 font-mono text-[10px] text-muted-foreground">
                Source: {entry.source}
              </p>
            </article>
          ))}
        </Panel>
      </div>
    </AppShell>
  );
}
