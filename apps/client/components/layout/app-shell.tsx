"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { getSession, logout, type SessionUser } from "@/data/auth";
import { getSidebarNav, type NavItem } from "@/data/navigation";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [nav, setNav] = useState<NavItem[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const session = await getSession();
      if (!session) {
        router.replace("/login");
        return;
      }
      const items = await getSidebarNav(session.role);
      if (!active) return;
      setUser(session);
      setNav(items);
      setReady(true);
    })();
    return () => {
      active = false;
    };
  }, [router]);

  async function handleLogout() {
    setLoggingOut(true);
    await logout();
    router.replace("/login");
  }

  if (!ready || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F7F8] text-sm text-zinc-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F7F7F8]">
      <Sidebar
        items={nav}
        collapsed={collapsed}
        onToggle={() => setCollapsed((prev) => !prev)}
      />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Navbar
          name={user.name}
          onLogout={handleLogout}
          loggingOut={loggingOut}
        />
        <main className="min-h-0 flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
