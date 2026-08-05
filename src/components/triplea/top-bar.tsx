import { ShieldCheck, Signal } from "lucide-react";
import { useSessionPlaceholder } from "@/lib/auth-placeholder";

export function TopBar() {
  const { user } = useSessionPlaceholder();

  return (
    <header className="glass-panel flex flex-wrap items-center gap-4 px-4 py-3 sm:px-5">
      <div className="flex items-center gap-3">
        <span
          className="grid size-10 place-items-center rounded-xl font-display text-sm font-bold text-primary-foreground"
          style={{ backgroundImage: "var(--gradient-brand)" }}
          aria-hidden
        >
          AAA
        </span>
        <div>
          <h1 className="font-display text-base leading-tight font-bold">
            <span className="text-gradient-brand">TripleA</span> AI
          </h1>
          <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
            Command Center
          </p>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full border border-lime/30 bg-lime/12 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-lime uppercase">
          <span className="size-1.5 rounded-full bg-lime pulse-dot" aria-hidden />
          Connected
        </span>
        <span className="hidden items-center gap-1.5 rounded-full border border-border bg-foreground/5 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase sm:flex">
          <Signal className="size-3" aria-hidden />
          12ms
        </span>
        <span className="hidden items-center gap-1.5 rounded-full border border-border bg-foreground/5 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase md:flex">
          <ShieldCheck className="size-3" aria-hidden />
          Encrypted
        </span>
        <div className="flex items-center gap-2.5 rounded-full border border-border bg-foreground/5 py-1 pr-3 pl-1">
          <span className="grid size-7 place-items-center rounded-full bg-accent/25 font-mono text-[11px] font-semibold">
            {user.initials}
          </span>
          <span className="hidden text-xs leading-tight sm:block">
            <span className="block font-medium">{user.displayName}</span>
            <span className="block text-[10px] text-muted-foreground">{user.plan}</span>
          </span>
        </div>
      </div>
    </header>
  );
}
