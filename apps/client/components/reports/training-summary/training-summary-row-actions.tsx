"use client";

import { Button } from "@/components/ui/button";

type TrainingSummaryRowActionsProps = {
  onViewContent: () => void;
  onViewAssigned: () => void;
  onViewAttempted: () => void;
};

export function TrainingSummaryRowActions({
  onViewContent,
  onViewAssigned,
  onViewAttempted,
}: TrainingSummaryRowActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9"
        onClick={onViewContent}
      >
        View Content
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9"
        onClick={onViewAssigned}
      >
        View Assigned Employees
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9"
        onClick={onViewAttempted}
      >
        View Training Attempted
      </Button>
    </div>
  );
}
