"use client";

import type { EntityStatus } from "@/data/system-setup/types";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: EntityStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
        status === "active"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-zinc-100 text-zinc-600",
      )}
    >
      {status === "active" ? "Active" : "Inactive"}
    </span>
  );
}
