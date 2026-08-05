import { createFileRoute } from "@tanstack/react-router";
import { Cog, Plug } from "lucide-react";
import { AppShell } from "@/components/triplea/app-shell";
import { ActionButton, PageHeader, Panel, Tag } from "@/components/triplea/ui-kit";
import { integrations } from "@/lib/triplea-data";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — TripleA AI" },
      {
        name: "description",
        content:
          "Connect GitHub, Supabase, ElevenLabs, Gmail, WhatsApp, Google Drive, Netlify and Vercel to your TripleA AI workspace.",
      },
      { property: "og:title", content: "Integrations — TripleA AI" },
      {
        property: "og:description",
        content: "Planned and beta integrations across code, backend, voice, outreach and deploys.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IntegrationsPage,
});

function IntegrationsPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-4">
        <PageHeader
          icon={Cog}
          eyebrow="Integrations"
          title="Plug TripleA into your stack"
          description="Each connector extends the OS — code hosting, backend, voice, outreach, storage and one-click deploys."
          actions={<Tag tone="cyan">8 connectors</Tag>}
        />

        <Panel
          title="Available soon"
          icon={Plug}
          bodyClassName="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          {integrations.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                className="glass-tile flex flex-col gap-2 p-4 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2">
                  <Icon className="size-5 text-primary" aria-hidden />
                  <p className="text-sm font-semibold">{item.name}</p>
                  <span className="ml-auto">
                    <Tag tone={item.status === "beta" ? "lime" : "muted"}>{item.status}</Tag>
                  </span>
                </div>
                <p className="font-mono text-[10px] text-muted-foreground uppercase">{item.category}</p>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
                <ActionButton className="mt-auto w-full justify-center">Connect</ActionButton>
              </article>
            );
          })}
        </Panel>
      </div>
    </AppShell>
  );
}
