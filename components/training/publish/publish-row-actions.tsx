"use client";

import { Button } from "@/components/ui/button";

type PublishRowActionsProps = {
  onViewEmployees: () => void;
  onChangeStatus: () => void;
};

export function PublishRowActions({
  onViewEmployees,
  onChangeStatus,
}: PublishRowActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9"
        onClick={onViewEmployees}
      >
        View Employees
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9"
        onClick={onChangeStatus}
      >
        Change status
      </Button>
    </div>
  );
}
