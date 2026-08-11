"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LuChevronDown } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { NAV_ICONS } from "@/components/layout/sidebar-icons";
import { SidebarFlyout } from "@/components/layout/sidebar-flyout";
import { SidebarLeaf } from "@/components/layout/sidebar-leaf";
import { SidebarSubmenu } from "@/components/layout/sidebar-submenu";
import { useFlyoutHover } from "@/components/layout/use-flyout-hover";
import type { NavItem } from "@/data/navigation";

type SidebarItemProps = {
  item: NavItem;
  collapsed: boolean;
};

export function SidebarItem({ item, collapsed }: SidebarItemProps) {
  const pathname = usePathname();
  const itemRef = useRef<HTMLDivElement>(null);
  const Icon = NAV_ICONS[item.icon];
  const hasChildren = Boolean(item.children?.length);
  const isChildActive =
    item.children?.some((child) => pathname.startsWith(child.href)) ?? false;
  const active = item.href === pathname || isChildActive;
  const [menuOpen, setMenuOpen] = useState(isChildActive);
  const { flyoutOpen, openFlyout, scheduleCloseFlyout } = useFlyoutHover(
    `${collapsed}-${pathname}`,
  );

  useEffect(() => {
    if (isChildActive) setMenuOpen(true);
  }, [isChildActive]);

  if (item.href && !hasChildren) {
    return (
      <SidebarLeaf
        href={item.href}
        label={item.label}
        icon={Icon}
        active={active}
        collapsed={collapsed}
      />
    );
  }

  return (
    <div
      ref={itemRef}
      className="relative border-b border-white/10"
      onMouseEnter={() => collapsed && openFlyout()}
      onMouseLeave={() => collapsed && scheduleCloseFlyout()}
    >
      <button
        type="button"
        title={item.label}
        className={cn(
          "flex h-12 w-full cursor-pointer items-center gap-3 px-4 hover:bg-white/10",
          collapsed && "justify-center px-0",
          active && "bg-white/10",
        )}
        onClick={() => !collapsed && setMenuOpen((prev) => !prev)}
      >
        <Icon className="size-5 shrink-0 text-[#FFA901]" aria-hidden />
        {!collapsed && (
          <>
            <span className="flex-1 truncate text-left text-sm font-medium text-white">
              {item.label}
            </span>
            <LuChevronDown
              className={cn(
                "size-3.5 shrink-0 text-[#FFA901] transition-transform duration-300 ease-in-out",
                menuOpen && "rotate-180",
              )}
              aria-hidden
            />
          </>
        )}
      </button>
      {collapsed && flyoutOpen && item.children ? (
        <SidebarFlyout
          items={item.children}
          anchorRef={itemRef}
          onMouseEnter={openFlyout}
          onMouseLeave={scheduleCloseFlyout}
        />
      ) : null}
      {!collapsed && item.children ? (
        <SidebarSubmenu items={item.children} open={menuOpen} />
      ) : null}
    </div>
  );
}
