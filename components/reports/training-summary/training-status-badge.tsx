"use client";

import { cn } from "@/lib/utils";
import {
  TRAINING_PROGRESS_STATUS_LABEL,
  type TrainingProgressStatus,
} from "@/data/reports/training-summary-types";

const STYLES: Record<TrainingProgressStatus, string> = {
  "not-started": "bg-zinc-100 text-zinc-600",
  "in-progress": "bg-sky-50 text-sky-700",
  completed: "bg-emerald-50 text-emerald-700",
  expired: "bg-amber-50 text-amber-800",
};

export function TrainingStatusBadge({
  status,
}: {
  status: TrainingProgressStatus;
}) {
  return (
    <span
      className={cn(
        "inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium",
        STYLES[status],
      )}
    >
      {TRAINING_PROGRESS_STATUS_LABEL[status]}
    </span>
  );
}
