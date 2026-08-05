import { useState } from "react";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/triplea-data";

export function SideNav() {
  const [active, setActive] = useState("Home");

  return (
    <nav
      aria-label="Primary"
      className="glass-panel flex shrink-0 flex-col gap-1 p-2 lg:w-[220px] lg:p-3"
    >
      <p className="hidden px-3 pt-1 pb-2 font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase lg:block">
        Navigation
      </p>
      <ul className="flex gap-1 overflow-x-auto scroll-slim lg:flex-col lg:overflow-visible">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.label;
          return (
            <li key={item.label} className="shrink-0 lg:w-full">
              <button
                type="button"
                onClick={() => setActive(item.label)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/12 text-foreground glow-ring"
                    : "text-muted-foreground hover:bg-foreground/6 hover:text-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "size-4 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                  )}
                  aria-hidden
                />
                <span className="hidden lg:inline">{item.label}</span>
                {item.badge ? (
                  <span className="ml-auto hidden rounded-full bg-accent/25 px-1.5 py-0.5 font-mono text-[10px] text-foreground lg:inline">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto hidden lg:block">
        <div className="glass-tile mt-4 p-3">
          <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
            Core status
          </p>
          <p className="mt-1.5 flex items-center gap-2 text-sm font-medium">
            <span className="size-1.5 rounded-full bg-lime pulse-dot" aria-hidden />
            TripleA v4.2 online
          </p>
        </div>
      </div>
    </nav>
  );
}
