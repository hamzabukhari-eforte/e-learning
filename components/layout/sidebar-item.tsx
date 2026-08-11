"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { NAV_ICONS } from "@/components/layout/sidebar-icons";
import { SidebarFlyout } from "@/components/layout/sidebar-flyout";
import { SidebarSubmenu } from "@/components/layout/sidebar-submenu";
import type { NavItem } from "@/data/navigation";

type SidebarItemProps = {
  item: NavItem;
  collapsed: boolean;
};

export function SidebarItem({ item, collapsed }: SidebarItemProps) {
  const pathname = usePathname();
  const Icon = NAV_ICONS[item.icon];
  const hasChildren = Boolean(item.children?.length);
  const isChildActive =
    item.children?.some((child) => pathname.startsWith(child.href)) ?? false;
  const active = item.href === pathname || isChildActive;
  const [open, setOpen] = useState(isChildActive);

  useEffect(() => {
    if (isChildActive) setOpen(true);
  }, [isChildActive]);

  if (item.href && !hasChildren) {
    return (
      <div className="border-b border-white/10">
        <Link
          href={item.href}
          title={item.label}
          className={cn(
            "flex h-12 cursor-pointer items-center gap-3 px-4 hover:bg-white/10",
            collapsed && "justify-center px-0",
            active && "bg-white/10",
          )}
        >
          <Icon className="size-5 shrink-0 text-[#FFA901]" aria-hidden />
          {!collapsed && (
            <span className="truncate text-sm font-medium text-white">
              {item.label}
            </span>
          )}
        </Link>
      </div>
    );
  }

  return (
    <div
      className="relative border-b border-white/10"
      onMouseEnter={() => collapsed && setOpen(true)}
      onMouseLeave={() => collapsed && setOpen(false)}
    >
      <button
        type="button"
        title={item.label}
        className={cn(
          "flex h-12 w-full cursor-pointer items-center gap-3 px-4 hover:bg-white/10",
          collapsed && "justify-center px-0",
          active && "bg-white/10",
        )}
        onClick={() => !collapsed && setOpen((prev) => !prev)}
      >
        <Icon className="size-5 shrink-0 text-[#FFA901]" aria-hidden />
        {!collapsed && (
          <>
            <span className="flex-1 truncate text-left text-sm font-medium text-white">
              {item.label}
            </span>
            <FaChevronDown
              className={cn(
                "size-3 shrink-0 text-[#FFA901] transition-transform duration-300 ease-in-out",
                open && "rotate-180",
              )}
              aria-hidden
            />
          </>
        )}
      </button>
      {collapsed && open && item.children ? (
        <SidebarFlyout label={item.label} items={item.children} />
      ) : null}
      {!collapsed && item.children ? (
        <SidebarSubmenu items={item.children} open={open} />
      ) : null}
    </div>
  );
}
