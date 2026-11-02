"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { NavChild } from "@/data/navigation";

type SidebarSubmenuProps = {
  items: NavChild[];
  open: boolean;
};

export function SidebarSubmenu({ items, open }: SidebarSubmenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          key="submenu"
          className="overflow-hidden bg-[#031f40]"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
        >
          <ul className="pb-2">
            {items.map((child) => (
              <li key={child.id}>
                <Link
                  href={child.href}
                  className={cn(
                    "block cursor-pointer px-4 py-2 pl-12 text-sm text-white/85 hover:bg-white/10",
                    pathname === child.href && "bg-white/10 text-white",
                  )}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
