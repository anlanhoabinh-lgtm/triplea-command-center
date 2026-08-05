import { createFileRoute } from "@tanstack/react-router";
import { Clock, Play, Plus, Workflow } from "lucide-react";
import { AppShell } from "@/components/triplea/app-shell";
import { ActionButton, PageHeader, Panel, StatChip, Tag } from "@/components/triplea/ui-kit";
import { automations, jobRuns } from "@/lib/triplea-data";

export const Route = createFileRoute("/automations")({
  head: () => ({
    meta: [
      { title: "Automations — TripleA AI" },
      {
        name: "description",
        content:
          "Schedule AI tasks, run repeated workflows and monitor background jobs from the TripleA automation console.",
      },
      { property: "og:title", content: "Automations — TripleA AI" },
      {
        property: "og:description",
        content: "Scheduled AI tasks, repeated workflows and background job monitoring.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AutomationsPage,
});

function AutomationsPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-4">
        <PageHeader
          icon={Workflow}
          eyebrow="Automations"
          title="Put TripleA on a schedule"
          description="Chain agent actions into workflows that run daily, weekly or on an interval — and watch every background job execute."
          actions={<ActionButton icon={Plus} variant="primary">New automation</ActionButton>}
        />

        <div className="grid gap-3 sm:grid-cols-4">
          <StatChip label="Active" value="3" tone="lime" />
          <StatChip label="Runs this month" value="248" />
          <StatChip label="Success rate" value="97.4%" tone="violet" />
          <StatChip label="Time saved" value="41h" tone="amber" />
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Panel title="Workflows" icon={Workflow} bodyClassName="space-y-3">
            {automations.map((flow) => (
              <article
                key={flow.id}
                className="glass-tile p-4 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold">{flow.name}</p>
                  <Tag tone={flow.active ? "lime" : "muted"}>{flow.active ? "Active" : "Paused"}</Tag>
                  <Tag tone="cyan">{flow.cadence}</Tag>
                  <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                    {flow.runs} runs
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{flow.action}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3" aria-hidden />
                    {flow.trigger}
                  </span>
                  <span>Last: {flow.lastRun}</span>
                  <span>Next: {flow.nextRun}</span>
                </div>
              </article>
            ))}
          </Panel>

          <Panel title="Background jobs" icon={Play} bodyClassName="space-y-2">
            {jobRuns.map((job) => (
              <div key={job.id} className="glass-tile flex items-center gap-2 p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{job.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    {job.when} • {job.duration}
                  </p>
                </div>
                <span className="ml-auto">
                  <Tag
                    tone={
                      job.status === "done"
                        ? "lime"
                        : job.status === "running"
                          ? "cyan"
                          : job.status === "failed"
                            ? "amber"
                            : "muted"
                    }
                  >
                    {job.status}
                  </Tag>
                </span>
              </div>
            ))}
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
