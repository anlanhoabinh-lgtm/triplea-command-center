import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, Filter, Globe, Mail, Search, Users } from "lucide-react";
import { AppShell } from "@/components/triplea/app-shell";
import { ActionButton, PageHeader, Panel, StatChip, Tag } from "@/components/triplea/ui-kit";
import { leadChannels, leads } from "@/lib/triplea-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "Lead Finder — TripleA AI" },
      {
        name: "description",
        content:
          "Search businesses by niche and location, then collect websites, emails, phone and WhatsApp numbers plus social profiles. Filter and export leads.",
      },
      { property: "og:title", content: "Lead Finder — TripleA AI" },
      {
        property: "og:description",
        content: "Find business leads by niche and location with full contact enrichment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LeadsPage,
});

function LeadsPage() {
  const [niche, setNiche] = useState("");
  const [location, setLocation] = useState("");
  const [channel, setChannel] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      leads.filter((lead) => {
        const matchNiche = lead.niche.toLowerCase().includes(niche.trim().toLowerCase());
        const matchLocation = lead.location.toLowerCase().includes(location.trim().toLowerCase());
        const matchChannel = !channel || Boolean(lead[channel as keyof typeof lead]);
        return matchNiche && matchLocation && matchChannel;
      }),
    [niche, location, channel],
  );

  return (
    <AppShell>
      <div className="flex flex-col gap-4">
        <PageHeader
          icon={Users}
          eyebrow="Lead Finder"
          title="Find businesses that need what you build"
          description="Search any niche in any city. TripleA enriches each result with website, email, phone, WhatsApp and social profiles."
          actions={<ActionButton icon={Download} variant="primary">Export CSV</ActionButton>}
        />

        <div className="grid gap-3 sm:grid-cols-4">
          <StatChip label="Leads found" value={String(leads.length * 30)} />
          <StatChip label="With email" value="68%" tone="violet" />
          <StatChip label="With WhatsApp" value="41%" tone="lime" />
          <StatChip label="Avg. score" value="82" tone="amber" />
        </div>

        <Panel title="Search" icon={Search}>
          <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
            <input
              value={niche}
              onChange={(event) => setNiche(event.target.value)}
              placeholder="Niche — e.g. dentists, gyms, lawyers"
              aria-label="Niche"
              className="glass-tile bg-transparent px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/40"
            />
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Location — e.g. Lagos, Accra, Nairobi"
              aria-label="Location"
              className="glass-tile bg-transparent px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/40"
            />
            <ActionButton icon={Search} variant="primary">
              Find leads
            </ActionButton>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
              <Filter className="size-3" aria-hidden />
              Has channel
            </span>
            {leadChannels.map((item) => {
              const Icon = item.icon;
              const active = channel === item.key;
              return (
                <button
                  key={String(item.key)}
                  type="button"
                  onClick={() => setChannel(active ? null : String(item.key))}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors",
                    active
                      ? "border-primary/40 bg-primary/12 text-primary"
                      : "border-border bg-foreground/5 text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="size-3" aria-hidden />
                  {item.label}
                </button>
              );
            })}
          </div>
        </Panel>

        <Panel
          title={`Results (${filtered.length})`}
          icon={Globe}
          bodyClassName="overflow-x-auto scroll-slim p-0"
        >
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-border text-left font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                <th className="px-4 py-3">Business</th>
                <th className="px-4 py-3">Niche</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Channels</th>
                <th className="px-4 py-3">Score</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr key={lead.id} className="border-b border-border/60 transition-colors hover:bg-foreground/4">
                  <td className="px-4 py-3 font-medium">{lead.business}</td>
                  <td className="px-4 py-3 text-muted-foreground">{lead.niche}</td>
                  <td className="px-4 py-3 text-muted-foreground">{lead.location}</td>
                  <td className="px-4 py-3">
                    <span className="block font-mono text-xs text-muted-foreground">
                      {lead.email ?? "—"}
                    </span>
                    <span className="block font-mono text-xs text-muted-foreground">
                      {lead.phone ?? "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {leadChannels.map((item) => {
                        const Icon = item.icon;
                        const has = Boolean(lead[item.key]);
                        return (
                          <Icon
                            key={String(item.key)}
                            aria-label={`${item.label}: ${has ? "available" : "not found"}`}
                            className={cn("size-3.5", has ? "text-primary" : "text-muted-foreground/30")}
                          />
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Tag tone={lead.score > 85 ? "lime" : lead.score > 75 ? "cyan" : "amber"}>
                      {lead.score}
                    </Tag>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    No leads match those filters yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </Panel>

        <Panel title="Outreach ready" icon={Mail}>
          <p className="text-sm text-muted-foreground">
            Push any selection into an automation to draft and send personalized outreach — Gmail and
            WhatsApp integrations are coming.
          </p>
        </Panel>
      </div>
    </AppShell>
  );
}
