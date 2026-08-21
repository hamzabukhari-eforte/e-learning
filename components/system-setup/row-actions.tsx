"use client";

import { Button } from "@/components/ui/button";

type RowActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
  editLabel?: string;
  deleteLabel?: string;
};

export function RowActions({
  onEdit,
  onDelete,
  editLabel = "Edit",
  deleteLabel = "Delete",
}: RowActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9"
        onClick={onEdit}
      >
        {editLabel}
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9 border-red-600 text-red-600 hover:bg-red-50"
        onClick={onDelete}
      >
        {deleteLabel}
      </Button>
    </div>
  );
}
