import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Brain,
  Image as ImageIcon,
  MessageSquare,
  Mic,
  Paperclip,
  Pin,
  Plus,
  SendHorizontal,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/triplea/app-shell";
import { ActionButton, Panel, Tag } from "@/components/triplea/ui-kit";
import {
  chatSuggestions,
  conversations,
  initialMessages,
  memoryEntries,
  type ChatMessage,
} from "@/lib/triplea-data";
import { useVoicePlaceholder } from "@/lib/voice-placeholder";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat — TripleA AI" },
      {
        name: "description",
        content:
          "Chat with TripleA using text, voice, images and files. Conversation history and long-term memory keep every thread in context.",
      },
      { property: "og:title", content: "AI Chat — TripleA AI" },
      {
        property: "og:description",
        content: "Multimodal AI chat with conversation history and persistent memory.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [activeThread, setActiveThread] = useState(conversations[0]?.id ?? "c1");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const voice = useVoicePlaceholder();

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeThread]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  function send(text: string) {
    const value = text.trim();
    if (!value) return;
    setMessages((prev) => [
      ...prev,
      { id: `m${prev.length + 1}`, role: "user", author: "You", text: value },
    ]);
    setInput("");
    inputRef.current?.focus();
  }

  return (
    <AppShell>
      <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)_280px]">
        <Panel
          title="Conversations"
          icon={MessageSquare}
          className="max-h-[70vh] xl:max-h-none"
          bodyClassName="space-y-2 overflow-y-auto scroll-slim p-3"
          aside={
            <button
              type="button"
              aria-label="New conversation"
              className="grid size-7 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
            >
              <Plus className="size-3.5" aria-hidden />
            </button>
          }
        >
          {conversations.map((thread) => (
            <button
              key={thread.id}
              type="button"
              onClick={() => setActiveThread(thread.id)}
              className={cn(
                "w-full rounded-lg border px-3 py-2.5 text-left transition-all duration-200",
                thread.id === activeThread
                  ? "border-primary/35 bg-primary/10"
                  : "border-transparent hover:border-border hover:bg-foreground/6",
              )}
            >
              <span className="flex items-center gap-1.5 text-sm font-medium">
                {thread.pinned ? <Pin className="size-3 text-primary" aria-hidden /> : null}
                <span className="truncate">{thread.title}</span>
              </span>
              <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                {thread.preview}
              </span>
              <span className="mt-1 block font-mono text-[10px] text-muted-foreground">
                {thread.updated}
              </span>
            </button>
          ))}
        </Panel>

        <section className="glass-panel flex min-h-[620px] flex-col overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">
            <Sparkles className="size-4 text-primary" aria-hidden />
            <h2 className="text-sm font-semibold">
              {conversations.find((c) => c.id === activeThread)?.title ?? "New conversation"}
            </h2>
            <Tag tone="lime">Memory on</Tag>
            <p className="ml-auto font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
              Model: TripleA v4.2
            </p>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto scroll-slim p-4 sm:p-5">
            {messages.map((message) => {
              const isUser = message.role === "user";
              return (
                <article
                  key={message.id}
                  className={cn("rise-in flex max-w-[86%] flex-col gap-1.5", isUser && "ml-auto items-end")}
                >
                  <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    {message.author}
                  </span>
                  <div
                    className={cn(
                      "text-sm leading-relaxed",
                      isUser
                        ? "rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-primary-foreground"
                        : "text-foreground",
                    )}
                  >
                    {message.text}
                  </div>
                  {message.attachment ? (
                    <span className="glass-tile flex items-center gap-2 px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground">
                      <Paperclip className="size-3" aria-hidden />
                      {message.attachment}
                    </span>
                  ) : null}
                </article>
              );
            })}
          </div>

          <div className="border-t border-border p-3 sm:p-4">
            <div className="mb-2 flex flex-wrap gap-2">
              {chatSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setInput(suggestion)}
                  className="rounded-full border border-border bg-foreground/5 px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <div className="glass-tile flex items-end gap-2 p-2 transition-colors focus-within:border-primary/40">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Message TripleA — attach files, images or speak..."
                aria-label="Message TripleA"
                className="max-h-32 min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
              />
              <IconButton label="Attach file" icon={Paperclip} />
              <IconButton label="Attach image" icon={ImageIcon} />
              <button
                type="button"
                onClick={voice.toggle}
                aria-label="Voice input (ElevenLabs)"
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-lg border transition-colors",
                  voice.state === "idle"
                    ? "border-border text-muted-foreground hover:bg-foreground/8 hover:text-foreground"
                    : "border-accent/40 bg-accent/20 text-foreground",
                )}
              >
                <Mic className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => send(input)}
                disabled={!input.trim()}
                aria-label="Send message"
                className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition-all hover:brightness-110 disabled:opacity-40"
              >
                <SendHorizontal className="size-4" aria-hidden />
              </button>
            </div>
          </div>
        </section>

        <Panel title="Thread memory" icon={Brain} bodyClassName="space-y-2 p-3">
          {memoryEntries.slice(0, 5).map((entry) => (
            <div key={entry.id} className="glass-tile p-3">
              <Tag tone="violet">{entry.category}</Tag>
              <p className="mt-1.5 text-sm font-medium">{entry.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{entry.value}</p>
            </div>
          ))}
          <ActionButton icon={Brain} className="w-full justify-center">
            Manage memory
          </ActionButton>
        </Panel>
      </div>
    </AppShell>
  );
}

function IconButton({ label, icon: Icon }: { label: string; icon: typeof Paperclip }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="grid size-9 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-foreground/8 hover:text-foreground"
    >
      <Icon className="size-4" aria-hidden />
    </button>
  );
}
