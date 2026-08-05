import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, FileSearch, Globe, ScanText } from "lucide-react";
import { AppShell } from "@/components/triplea/app-shell";
import { ActionButton, PageHeader, Panel, Tag } from "@/components/triplea/ui-kit";
import { browsePages } from "@/lib/triplea-data";

export const Route = createFileRoute("/browser")({
  head: () => ({
    meta: [
      { title: "AI Browser — TripleA AI" },
      {
        name: "description",
        content:
          "Let TripleA browse the web for you: research websites, summarize pages and extract structured information.",
      },
      { property: "og:title", content: "AI Browser — TripleA AI" },
      {
        property: "og:description",
        content: "AI web browsing with page summaries and structured extraction.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BrowserPage,
});

function BrowserPage() {
  const [url, setUrl] = useState("https://competitor-agency.com/pricing");

  return (
    <AppShell>
      <div className="flex flex-col gap-4">
        <PageHeader
          icon={Globe}
          eyebrow="AI Browser"
          title="Research the web without reading it"
          description="Point TripleA at any URL. It reads the page, summarizes what matters and extracts the details you asked for."
          actions={<ActionButton icon={ScanText} variant="primary">Summarize page</ActionButton>}
        />

        <Panel title="Navigate" icon={ArrowRight}>
          <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
            <input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              aria-label="URL to browse"
              placeholder="https://example.com"
              className="glass-tile bg-transparent px-3 py-2.5 font-mono text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/40"
            />
            <ActionButton icon={Globe} variant="primary">
              Browse
            </ActionButton>
          </div>
        </Panel>

        <Panel title="Research log" icon={FileSearch} bodyClassName="space-y-3">
          {browsePages.map((page) => (
            <article
              key={page.id}
              className="glass-tile p-4 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold">{page.title}</p>
                <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                  {page.visited}
                </span>
              </div>
              <p className="mt-0.5 font-mono text-[10px] text-primary">{page.url}</p>
              <p className="mt-2 text-sm text-muted-foreground">{page.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {page.extracted.map((item) => (
                  <Tag key={item} tone="cyan">
                    {item}
                  </Tag>
                ))}
              </div>
            </article>
          ))}
        </Panel>
      </div>
    </AppShell>
  );
}
