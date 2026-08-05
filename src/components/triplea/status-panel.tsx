import { Bell, Gauge } from "lucide-react";
import { notifications, telemetry } from "@/lib/triplea-data";

export function StatusPanel() {
  return (
    <div className="flex flex-col gap-4">
      <section className="glass-panel p-4 sm:p-5" aria-labelledby="model-heading">
        <div className="flex items-center gap-2">
          <Gauge className="size-4 text-primary" aria-hidden />
          <h2 id="model-heading" className="text-sm font-semibold">
            Current Model
          </h2>
        </div>

        <div className="glass-tile mt-4 flex items-center justify-between p-3">
          <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            Model
          </span>
          <span className="font-display text-sm font-semibold text-gradient-brand">
            TripleA v4.2
          </span>
        </div>

        <dl className="mt-3 space-y-3">
          {telemetry.map((metric) => (
            <div key={metric.label}>
              <div className="flex items-center justify-between">
                <dt className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                  {metric.label}
                </dt>
                <dd className="font-mono text-xs">{metric.value}</dd>
              </div>
              {metric.percent !== undefined ? (
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-foreground/8">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${metric.percent}%`,
                      backgroundImage: "var(--gradient-brand)",
                    }}
                  />
                </div>
              ) : null}
            </div>
          ))}
        </dl>
      </section>

      <section className="glass-panel p-4 sm:p-5" aria-labelledby="notifications-heading">
        <div className="flex items-center gap-2">
          <Bell className="size-4 text-accent" aria-hidden />
          <h2 id="notifications-heading" className="text-sm font-semibold">
            Notifications
          </h2>
          <span className="ml-auto font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            {notifications.length} new
          </span>
        </div>

        <ul className="mt-4 space-y-2">
          {notifications.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="glass-tile flex items-start gap-3 p-3">
                <Icon className={`mt-0.5 size-4 shrink-0 ${item.tone}`} aria-hidden />
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium">{item.title}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{item.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
