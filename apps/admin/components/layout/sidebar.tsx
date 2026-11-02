"use client";

import Image from "next/image";
import { LuMenu, LuShield, LuX } from "react-icons/lu";
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
          "flex h-16 shrink-0 items-center border-b border-white/10",
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

      <div
        className={cn(
          "shrink-0 border-b border-white/10",
          collapsed ? "flex justify-center px-0 py-3" : "px-3 py-3",
        )}
      >
        {!collapsed ? (
          <div className="flex items-center gap-2 rounded-md border border-[#FFA901]/25 bg-[#FFA901]/10 px-2.5 py-1.5">
            <LuShield className="size-3.5 shrink-0 text-[#FFA901]" aria-hidden />
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FFA901]">
                Super Admin
              </p>
              <p className="truncate text-[11px] text-white/70">
                Platform console
              </p>
            </div>
          </div>
        ) : (
          <div
            className="flex size-9 items-center justify-center rounded-md border border-[#FFA901]/25 bg-[#FFA901]/10"
            title="Super Admin"
          >
            <LuShield className="size-4 text-[#FFA901]" aria-hidden />
          </div>
        )}
      </div>

      {!collapsed ? (
        <p className="px-4 pb-1 pt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
          Navigation
        </p>
      ) : (
        <div className="h-3" />
      )}

      <nav className="sidebar-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        {items.map((item) => (
          <SidebarItem key={item.id} item={item} collapsed={collapsed} />
        ))}
      </nav>

      <div
        className={cn(
          "shrink-0 border-t border-white/10 py-3",
          collapsed ? "px-2 text-center" : "px-4",
        )}
      >
        {!collapsed ? (
          <p className="text-[11px] leading-relaxed text-white/50">
            SES operators only.
            <br />
            Client tenants use the client app.
          </p>
        ) : (
          <p className="text-[10px] font-semibold text-[#FFA901]">SA</p>
        )}
      </div>
    </aside>
  );
}
