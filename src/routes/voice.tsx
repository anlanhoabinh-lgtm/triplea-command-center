import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AudioLines, Mic, Radio, Volume2 } from "lucide-react";
import { AppShell } from "@/components/triplea/app-shell";
import { ActionButton, PageHeader, Panel, Tag } from "@/components/triplea/ui-kit";
import { voiceCommands, voiceOptions } from "@/lib/triplea-data";
import { useVoicePlaceholder } from "@/lib/voice-placeholder";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/voice")({
  head: () => ({
    meta: [
      { title: "Voice Assistant — TripleA AI" },
      {
        name: "description",
        content:
          "Talk to TripleA. ElevenLabs voices power realtime voice conversations and hands-free voice commands across the OS.",
      },
      { property: "og:title", content: "Voice Assistant — TripleA AI" },
      {
        property: "og:description",
        content: "Realtime voice conversations and voice commands powered by ElevenLabs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VoicePage,
});

function VoicePage() {
  const voice = useVoicePlaceholder();
  const [selected, setSelected] = useState(voiceOptions[0]?.id ?? "v1");

  return (
    <AppShell>
      <div className="flex flex-col gap-4">
        <PageHeader
          icon={Mic}
          eyebrow="Voice Assistant"
          title="Speak, and TripleA acts"
          description="Hold a natural conversation or fire off commands. ElevenLabs voice integration is wired as a placeholder, ready to connect."
          actions={<Tag tone="violet">ElevenLabs placeholder</Tag>}
        />

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Panel title="Live session" icon={Radio}>
            <div className="flex flex-col items-center gap-5 py-8">
              <button
                type="button"
                onClick={voice.toggle}
                aria-label={voice.state === "idle" ? "Start voice session" : "Stop voice session"}
                className={cn(
                  "grid size-28 place-items-center rounded-full border transition-all duration-300",
                  voice.state === "idle"
                    ? "border-border bg-foreground/5 text-muted-foreground hover:text-foreground"
                    : "border-accent/50 bg-accent/20 text-foreground glow-ring",
                )}
              >
                <Mic className={cn("size-9", voice.state !== "idle" && "pulse-dot")} aria-hidden />
              </button>
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                {voice.state === "idle" ? "Tap to talk" : "Listening…"}
              </p>
              <div className="flex items-end gap-1" aria-hidden>
                {[14, 26, 38, 22, 30, 18, 34, 24, 12].map((height, index) => (
                  <span
                    key={index}
                    style={{ height, animationDelay: `${index * 90}ms` }}
                    className={cn(
                      "w-1.5 rounded-full bg-primary/70",
                      voice.state !== "idle" && "pulse-dot",
                    )}
                  />
                ))}
              </div>
            </div>
          </Panel>

          <div className="flex flex-col gap-4">
            <Panel title="Voices" icon={Volume2} bodyClassName="space-y-2">
              {voiceOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelected(option.id)}
                  className={cn(
                    "glass-tile w-full p-3 text-left transition-colors",
                    selected === option.id && "border-primary/40 bg-primary/10",
                  )}
                >
                  <p className="text-sm font-medium">{option.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    {option.style} • {option.accent}
                  </p>
                </button>
              ))}
            </Panel>

            <Panel title="Try saying" icon={AudioLines} bodyClassName="space-y-2">
              {voiceCommands.map((command) => (
                <p key={command} className="text-sm text-muted-foreground">
                  {command}
                </p>
              ))}
              <ActionButton icon={Mic} className="w-full justify-center">
                Connect ElevenLabs
              </ActionButton>
            </Panel>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
