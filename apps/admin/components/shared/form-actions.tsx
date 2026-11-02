"use client";

import { Button } from "@/components/ui/button";

type FormActionsProps = {
  isEditing: boolean;
  pending?: boolean;
  createLabel: string;
  updateLabel: string;
  onCancel?: () => void;
};

export function FormActions({
  isEditing,
  pending,
  createLabel,
  updateLabel,
  onCancel,
}: FormActionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      {isEditing && onCancel ? (
        <Button
          type="button"
          variant="outline"
          className="min-w-28"
          onClick={onCancel}
        >
          Cancel
        </Button>
      ) : null}
      <Button type="submit" variant="solid" className="min-w-28" disabled={pending}>
        {pending ? "Saving..." : isEditing ? updateLabel : createLabel}
      </Button>
    </div>
  );
}
