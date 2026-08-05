import { Command } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { commandActions } from "@/lib/triplea-data";

export function CommandCenter() {
  return (
    <section className="glass-panel p-4 sm:p-5" aria-labelledby="command-center-heading">
      <div className="flex items-center gap-2">
        <Command className="size-4 text-accent" aria-hidden />
        <h2 id="command-center-heading" className="text-sm font-semibold">
          AI Command Center
        </h2>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {commandActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              to={action.to}
              className="glass-tile group flex flex-col items-start gap-2 p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-primary/10"
            >
              <Icon
                className="size-4 text-muted-foreground transition-colors group-hover:text-primary"
                aria-hidden
              />
              <span className="text-xs font-medium">{action.label}</span>
            </Link>
          );
        })}
      </div>

    </section>
  );
}
