"use client";

import { Button } from "@/components/ui/button";

type AssignTrainingActionsProps = {
  selectedCount: number;
  pending?: boolean;
  error?: string | null;
  message?: string | null;
  onAssign: () => void;
  actionLabel?: string;
  pendingLabel?: string;
  itemLabel?: string;
};

export function AssignTrainingActions({
  selectedCount,
  pending,
  error,
  message,
  onAssign,
  actionLabel = "Assign Training",
  pendingLabel = "Assigning...",
  itemLabel = "training(s)",
}: AssignTrainingActionsProps) {
  return (
    <div className="space-y-3 border-t border-zinc-200 px-4 py-4">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {message ? <p className="text-sm text-[#042954]">{message}</p> : null}
      <div className="flex flex-wrap items-center justify-end gap-3">
        {selectedCount > 0 ? (
          <p className="mr-auto text-sm text-[#042954]">
            {selectedCount} {itemLabel} selected
          </p>
        ) : null}
        <Button
          type="button"
          variant="solid"
          className="min-w-36"
          disabled={pending}
          onClick={onAssign}
        >
          {pending ? pendingLabel : actionLabel}
        </Button>
      </div>
    </div>
  );
}
