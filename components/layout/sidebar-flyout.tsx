"use client";

import { useLayoutEffect, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavChild } from "@/data/navigation";

type SidebarFlyoutProps = {
  items: NavChild[];
  anchorRef: RefObject<HTMLElement | null>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export function SidebarFlyout({
  items,
  anchorRef,
  onMouseEnter,
  onMouseLeave,
}: SidebarFlyoutProps) {
  const pathname = usePathname();
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
    function updatePosition() {
      const el = anchorRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPosition({ top: rect.top, left: rect.right });
    }
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [anchorRef]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed z-[60] min-w-52 rounded-md border border-white/10 bg-[#042954] py-2 shadow-xl"
      style={{ top: position.top, left: position.left }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Bridge so cursor can move from icon to menu without closing */}
      <div className="absolute top-0 -left-2 h-full w-2" aria-hidden />
      <ul>
        {items.map((child) => (
          <li key={child.id}>
            <Link
              href={child.href}
              className={cn(
                "block cursor-pointer px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 hover:text-white",
                pathname.startsWith(child.href) && "bg-white/10 text-white",
              )}
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>,
    document.body,
  );
}
