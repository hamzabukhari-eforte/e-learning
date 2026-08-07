"use client";

import Link from "next/link";
import type { NavChild } from "@/data/navigation";

type SidebarFlyoutProps = {
  label: string;
  items: NavChild[];
};

export function SidebarFlyout({ label, items }: SidebarFlyoutProps) {
  return (
    <div className="absolute top-0 left-full z-50 ml-1 min-w-56 rounded-md border border-white/10 bg-[#042954] py-2 shadow-xl">
      <p className="border-b border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#FFA901]">
        {label}
      </p>
      <ul className="py-1">
        {items.map((child) => (
          <li key={child.id}>
            <Link
              href={child.href}
              className="block cursor-pointer px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white"
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
