import { useEffect, useRef, useState } from "react";
import { Cpu, Mic, Paperclip, SendHorizontal, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { initialMessages, type ChatMessage } from "@/lib/triplea-data";
import { useVoicePlaceholder } from "@/lib/voice-placeholder";

export function ConversationPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const voice = useVoicePlaceholder();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: `m${prev.length + 1}`, role: "user", author: "You", text },
    ]);
    setInput("");
    inputRef.current?.focus();
  }

  return (
    <section
      className="glass-panel flex min-h-[560px] flex-col overflow-hidden"
      aria-labelledby="conversation-heading"
    >
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3 sm:px-5">
        <Sparkles className="size-4 text-primary" aria-hidden />
        <h2 id="conversation-heading" className="text-sm font-semibold">
          Active Conversation
        </h2>
        <span className="flex items-center gap-1.5 rounded-full border border-border bg-foreground/5 px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
          <ShieldCheck className="size-3" aria-hidden />
          Encrypted
        </span>
        <p className="ml-auto flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
          <Cpu className="size-3" aria-hidden />
          Analyzing data • Model: TripleA v4.2
        </p>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto scroll-slim p-4 sm:p-5">
        {messages.map((message) => {
          const isUser = message.role === "user";
          return (
            <article
              key={message.id}
              className={cn("flex max-w-[86%] flex-col gap-1.5", isUser && "ml-auto items-end")}
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
                <span
                  className={cn(
                    "glass-tile flex items-center gap-2 px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground",
                  )}
                >
                  <Paperclip className="size-3" aria-hidden />
                  {message.attachment}
                </span>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="border-t border-border p-3 sm:p-4">
        <div className="glass-tile flex items-end gap-2 p-2 focus-within:border-primary/40">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                send();
              }
            }}
            placeholder="Ask TripleA anything..."
            aria-label="Message TripleA"
            className="max-h-32 min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={voice.toggle}
            aria-label="Voice input (ElevenLabs)"
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-lg border border-border transition-colors",
              voice.state === "idle"
                ? "text-muted-foreground hover:bg-foreground/8 hover:text-foreground"
                : "border-accent/40 bg-accent/20 text-foreground",
            )}
          >
            <Mic className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={send}
            disabled={!input.trim()}
            aria-label="Send message"
            className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
          >
            <SendHorizontal className="size-4" aria-hidden />
          </button>
        </div>
        <p className="mt-2 px-1 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
          TripleA v4.2 • Core online
          {voice.state !== "idle" ? " • Voice listening (placeholder)" : ""}
        </p>
      </div>
    </section>
  );
}
