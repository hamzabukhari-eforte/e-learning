"use client";

import { Button } from "@/components/ui/button";

type FormActionsProps = {
  isEditing: boolean;
  pending?: boolean;
  onCancel: () => void;
};

export function FormActions({
  isEditing,
  pending,
  onCancel,
}: FormActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button type="submit" variant="solid" disabled={pending}>
        {pending ? "Saving..." : isEditing ? "Update" : "Create"}
      </Button>
      {isEditing ? (
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      ) : null}
    </div>
  );
}
