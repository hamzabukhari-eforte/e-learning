"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ICONS } from "@/components/layout/nav-icons";
import type { NavItem } from "@/data/navigation";
import { cn } from "@/lib/utils";

type SidebarItemProps = {
  item: NavItem;
  collapsed: boolean;
};

export function SidebarItem({ item, collapsed }: SidebarItemProps) {
  const pathname = usePathname();
  const active =
    item.href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname === item.href || pathname.startsWith(`${item.href}/`);
  const Icon = NAV_ICONS[item.icon];

  return (
    <div className="border-b border-white/10">
      <Link
        href={item.href}
        title={item.label}
        className={cn(
          "relative flex h-12 cursor-pointer items-center gap-3 px-4 transition-colors hover:bg-white/10",
          collapsed && "justify-center px-0",
          active && "bg-white/10",
        )}
      >
        {active ? (
          <span
            className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-[#FFA901]"
            aria-hidden
          />
        ) : null}
        <Icon className="size-5 shrink-0 text-[#FFA901]" aria-hidden />
        {!collapsed ? (
          <span
            className={cn(
              "truncate text-sm font-medium",
              active ? "text-[#FFA901]" : "text-white",
            )}
          >
            {item.label}
          </span>
        ) : null}
      </Link>
    </div>
  );
}
