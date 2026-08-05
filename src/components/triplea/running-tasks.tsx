import { Activity, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { runningTasks } from "@/lib/triplea-data";

const toneBar: Record<string, string> = {
  cyan: "bg-cyan",
  violet: "bg-violet",
  lime: "bg-lime",
};

export function RunningTasks() {
  return (
    <section className="glass-panel p-4 sm:p-5" aria-labelledby="running-tasks-heading">
      <div className="flex items-center gap-2">
        <Activity className="size-4 text-primary" aria-hidden />
        <h2 id="running-tasks-heading" className="text-sm font-semibold">
          Running Tasks
        </h2>
        <span className="ml-auto font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
          {runningTasks.filter((t) => t.state === "running").length} active
        </span>
      </div>

      <ul className="mt-4 space-y-3">
        {runningTasks.map((task) => (
          <li key={task.name} className="glass-tile p-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{task.name}</span>
              {task.state === "complete" ? (
                <span className="ml-auto flex items-center gap-1 font-mono text-[10px] tracking-[0.14em] text-lime uppercase">
                  <CheckCircle2 className="size-3" aria-hidden />
                  Complete
                </span>
              ) : (
                <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                  {task.progress}%
                </span>
              )}
            </div>
            <p className="mt-0.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
              {task.agent}
            </p>
            <div
              className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-foreground/8"
              role="progressbar"
              aria-valuenow={task.progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${task.name} progress`}
            >
              <div
                className={cn("h-full rounded-full transition-[width] duration-700", toneBar[task.tone])}
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
