import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
  actions,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <header className="glass-panel flex flex-wrap items-start gap-4 p-4 sm:p-5">
      <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-primary/12 text-primary">
        <Icon className="size-5" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-1 text-xl font-semibold sm:text-2xl">{title}</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function Panel({
  title,
  icon: Icon,
  aside,
  children,
  className,
  bodyClassName,
}: {
  title: string;
  icon?: LucideIcon;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={cn("glass-panel flex flex-col overflow-hidden", className)}>
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">
        {Icon ? <Icon className="size-4 text-primary" aria-hidden /> : null}
        <h2 className="text-sm font-semibold">{title}</h2>
        {aside ? <div className="ml-auto flex items-center gap-2">{aside}</div> : null}
      </div>
      <div className={cn("flex-1 p-4", bodyClassName)}>{children}</div>
    </section>
  );
}

export function ActionButton({
  children,
  icon: Icon,
  variant = "ghost",
  onClick,
  className,
}: {
  children: ReactNode;
  icon?: LucideIcon;
  variant?: "primary" | "ghost";
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.98]",
        variant === "primary"
          ? "bg-primary text-primary-foreground hover:brightness-110"
          : "border border-border bg-foreground/5 text-foreground hover:bg-foreground/10",
        className,
      )}
    >
      {Icon ? <Icon className="size-4" aria-hidden /> : null}
      {children}
    </button>
  );
}

export function StatChip({
  label,
  value,
  tone = "cyan",
}: {
  label: string;
  value: string;
  tone?: "cyan" | "violet" | "lime" | "amber";
}) {
  const toneClass = {
    cyan: "text-cyan",
    violet: "text-violet",
    lime: "text-lime",
    amber: "text-amber",
  }[tone];

  return (
    <div className="glass-tile p-3 transition-transform duration-200 hover:-translate-y-0.5">
      <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
        {label}
      </p>
      <p className={cn("mt-1 font-display text-lg font-semibold", toneClass)}>{value}</p>
    </div>
  );
}

export function Tag({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "cyan" | "violet" | "lime" | "amber" }) {
  const tones = {
    muted: "border-border bg-foreground/5 text-muted-foreground",
    cyan: "border-cyan/30 bg-cyan/12 text-cyan",
    violet: "border-violet/30 bg-violet/12 text-violet",
    lime: "border-lime/30 bg-lime/12 text-lime",
    amber: "border-amber/30 bg-amber/12 text-amber",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] uppercase",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
