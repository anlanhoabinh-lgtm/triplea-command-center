import { createFileRoute } from "@tanstack/react-router";
import { Folder, FolderKanban, FolderPlus, MessageSquare, Braces, Users } from "lucide-react";
import { AppShell } from "@/components/triplea/app-shell";
import { ActionButton, PageHeader, Panel, Tag } from "@/components/triplea/ui-kit";
import { projectFolders, projectItems } from "@/lib/triplea-data";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — TripleA AI" },
      {
        name: "description",
        content:
          "Every AI-generated website, conversation and lead list saved and organized into folders inside TripleA AI.",
      },
      { property: "og:title", content: "Projects — TripleA AI" },
      {
        property: "og:description",
        content: "Organize generated websites, conversations and lead lists by folder.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

const typeIcon = {
  website: Braces,
  conversation: MessageSquare,
  "lead list": Users,
} as const;

function ProjectsPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-4">
        <PageHeader
          icon={FolderKanban}
          eyebrow="Projects"
          title="Everything TripleA has built for you"
          description="Websites, conversations and lead lists saved automatically and organized into folders you control."
          actions={<ActionButton icon={FolderPlus} variant="primary">New folder</ActionButton>}
        />

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {projectFolders.map((folder) => (
            <article
              key={folder.id}
              className="glass-panel p-4 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Folder className="size-5 text-primary" aria-hidden />
              <p className="mt-2 text-sm font-semibold">{folder.name}</p>
              <p className="mt-0.5 font-mono text-[10px] text-muted-foreground uppercase">
                {folder.items} items • {folder.kind}
              </p>
            </article>
          ))}
        </div>

        <Panel title="Recent items" icon={FolderKanban} bodyClassName="space-y-2">
          {projectItems.map((item) => {
            const Icon = typeIcon[item.type];
            return (
              <div key={item.id} className="glass-tile flex flex-wrap items-center gap-3 p-3">
                <Icon className="size-4 text-primary" aria-hidden />
                <p className="text-sm font-medium">{item.name}</p>
                <Tag>{item.type}</Tag>
                <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                  {item.folder} • {item.updated}
                </span>
              </div>
            );
          })}
        </Panel>
      </div>
    </AppShell>
  );
}
