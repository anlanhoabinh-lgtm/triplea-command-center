import type { ReactNode } from "react";
import { SideNav } from "@/components/triplea/side-nav";
import { TopBar } from "@/components/triplea/top-bar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen p-3 sm:p-4 lg:p-6">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4">
        <TopBar />
        <div className="flex flex-col gap-4 lg:flex-row">
          <SideNav />
          <div className="min-w-0 flex-1 rise-in">{children}</div>
        </div>
      </div>
    </main>
  );
}
