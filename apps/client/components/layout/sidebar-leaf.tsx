"use client";

import Link from "next/link";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

type SidebarLeafProps = {
  href: string;
  label: string;
  icon: IconType;
  active: boolean;
  collapsed: boolean;
};

export function SidebarLeaf({
  href,
  label,
  icon: Icon,
  active,
  collapsed,
}: SidebarLeafProps) {
  return (
    <div className="border-b border-white/10">
      <Link
        href={href}
        title={label}
        className={cn(
          "flex h-12 cursor-pointer items-center gap-3 px-4 hover:bg-white/10",
          collapsed && "justify-center px-0",
          active && "bg-white/10",
        )}
      >
        <Icon className="size-5 shrink-0 text-[#FFA901]" aria-hidden />
        {!collapsed && (
          <span className="truncate text-sm font-medium text-white">{label}</span>
        )}
      </Link>
    </div>
  );
}
