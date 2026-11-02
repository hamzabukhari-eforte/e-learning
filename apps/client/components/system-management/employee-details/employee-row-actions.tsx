"use client";

import { Button } from "@/components/ui/button";

type EmployeeRowActionsProps = {
  onEdit: () => void;
  onUnregister: () => void;
};

export function EmployeeRowActions({
  onEdit,
  onUnregister,
}: EmployeeRowActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button type="button" variant="outline" size="sm" className="h-9" onClick={onEdit}>
        Edit
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9 border-red-600 text-red-600 hover:bg-red-50"
        onClick={onUnregister}
      >
        Unregister
      </Button>
    </div>
  );
}
