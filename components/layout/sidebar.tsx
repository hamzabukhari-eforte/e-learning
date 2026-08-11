"use client";

import Image from "next/image";
import { LuMenu, LuX } from "react-icons/lu";
import { SidebarItem } from "@/components/layout/sidebar-item";
import type { NavItem } from "@/data/navigation";
import { cn } from "@/lib/utils";

type SidebarProps = {
  items: NavItem[];
  collapsed: boolean;
  onToggle: () => void;
};

export function Sidebar({ items, collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn(
        "relative z-40 flex h-screen shrink-0 flex-col overflow-hidden bg-[#042954] transition-[width] duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div
        className={cn(
          "mb-3 flex h-16 shrink-0 items-center border-b border-white/10",
          collapsed ? "justify-center px-0" : "justify-between gap-2 px-3",
        )}
      >
        {!collapsed ? (
          <Image
            src="/assets/images/SES-logo.png"
            alt="SES — A Supernet Company"
            width={100}
            height={100}
            className="h-14 w-auto object-contain"
            priority
          />
        ) : null}
        <button
          type="button"
          onClick={onToggle}
          className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md bg-white/10 text-white hover:bg-white/20"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <LuX className="size-4 text-[#FFA901]" />
          ) : (
            <LuMenu className="size-4 text-[#FFA901]" />
          )}
        </button>
      </div>
      <nav className="sidebar-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        {items.map((item) => (
          <SidebarItem key={item.id} item={item} collapsed={collapsed} />
        ))}
      </nav>
    </aside>
  );
}
