import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Braces,
  Code2,
  Download,
  Eye,
  Github,
  Monitor,
  Rocket,
  Smartphone,
  Sparkles,
  Tablet,
  Wand2,
} from "lucide-react";
import { AppShell } from "@/components/triplea/app-shell";
import { ActionButton, PageHeader, Panel, Tag } from "@/components/triplea/ui-kit";
import { builderSteps, generatedSites } from "@/lib/triplea-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Website Builder — TripleA AI" },
      {
        name: "description",
        content:
          "Describe a website and TripleA generates it. Preview responsive breakpoints, export the code, connect GitHub and deploy in one click.",
      },
      { property: "og:title", content: "Website Builder — TripleA AI" },
      {
        property: "og:description",
        content: "Generate complete websites from a prompt, preview, export code and deploy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BuilderPage,
});

const devices = [
  { id: "desktop", label: "Desktop", icon: Monitor, width: "100%" },
  { id: "tablet", label: "Tablet", icon: Tablet, width: "62%" },
  { id: "mobile", label: "Mobile", icon: Smartphone, width: "38%" },
] as const;

function BuilderPage() {
  const [prompt, setPrompt] = useState(
    "A premium dental clinic site with hero, services, pricing, testimonials and an online booking form.",
  );
  const [device, setDevice] = useState<(typeof devices)[number]["id"]>("desktop");
  const activeWidth = devices.find((d) => d.id === device)?.width ?? "100%";

  return (
    <AppShell>
      <div className="flex flex-col gap-4">
        <PageHeader
          icon={Braces}
          eyebrow="Website Builder"
          title="Describe it. TripleA builds it."
          description="Generate multi-page websites from a single prompt, preview them live, then export the code, sync GitHub or deploy instantly."
          actions={
            <>
              <ActionButton icon={Github}>Connect GitHub</ActionButton>
              <ActionButton icon={Rocket} variant="primary">
                Deploy
              </ActionButton>
            </>
          }
        />

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex flex-col gap-4">
            <Panel title="Build prompt" icon={Wand2}>
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                rows={4}
                aria-label="Describe the website you want"
                className="glass-tile w-full resize-none bg-transparent p-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/40"
                placeholder="Describe the website you want..."
              />
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <ActionButton icon={Sparkles} variant="primary">
                  Generate website
                </ActionButton>
                <ActionButton icon={Eye}>Preview</ActionButton>
                <ActionButton icon={Download}>Export code</ActionButton>
                <ActionButton icon={Code2}>Open in editor</ActionButton>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-4">
                {builderSteps.map((step, index) => (
                  <div key={step.label} className="glass-tile p-3">
                    <p className="font-mono text-[10px] text-primary">STEP {index + 1}</p>
                    <p className="mt-1 text-sm font-medium">{step.label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{step.detail}</p>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel
              title="Live preview"
              icon={Eye}
              aside={
                <div className="flex gap-1">
                  {devices.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setDevice(item.id)}
                        aria-label={item.label}
                        aria-pressed={device === item.id}
                        className={cn(
                          "grid size-7 place-items-center rounded-lg border transition-colors",
                          device === item.id
                            ? "border-primary/40 bg-primary/12 text-primary"
                            : "border-border text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <Icon className="size-3.5" aria-hidden />
                      </button>
                    );
                  })}
                </div>
              }
            >
              <div className="flex justify-center">
                <div
                  style={{ width: activeWidth }}
                  className="glass-tile overflow-hidden transition-all duration-500"
                >
                  <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
                    <span className="size-2 rounded-full bg-destructive/70" aria-hidden />
                    <span className="size-2 rounded-full bg-amber/70" aria-hidden />
                    <span className="size-2 rounded-full bg-lime/70" aria-hidden />
                    <span className="ml-2 font-mono text-[10px] text-muted-foreground">
                      preview.lumendental.ng
                    </span>
                  </div>
                  <div className="space-y-3 p-4">
                    <div className="h-24 rounded-lg bg-primary/12" />
                    <div className="h-3 w-2/3 rounded-full bg-foreground/12" />
                    <div className="h-3 w-1/2 rounded-full bg-foreground/8" />
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-16 rounded-lg bg-accent/15" />
                      <div className="h-16 rounded-lg bg-foreground/8" />
                      <div className="h-16 rounded-lg bg-foreground/8" />
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </div>

          <Panel title="Generated sites" icon={Braces} bodyClassName="space-y-3">
            {generatedSites.map((site) => (
              <article
                key={site.id}
                className="glass-tile p-3 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">{site.name}</p>
                  <span className="ml-auto">
                    <Tag
                      tone={
                        site.status === "published" ? "lime" : site.status === "preview" ? "cyan" : "amber"
                      }
                    >
                      {site.status}
                    </Tag>
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{site.prompt}</p>
                <p className="mt-2 font-mono text-[10px] text-muted-foreground">
                  {site.pages} pages • {site.stack} • {site.updated}
                </p>
              </article>
            ))}
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
