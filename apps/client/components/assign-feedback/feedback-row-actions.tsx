"use client";

import { Button } from "@/components/ui/button";

type FeedbackRowActionsProps = {
  onAddComments: () => void;
  onViewComments: () => void;
};

export function FeedbackRowActions({
  onAddComments,
  onViewComments,
}: FeedbackRowActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9"
        onClick={onAddComments}
      >
        Add Comments
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9"
        onClick={onViewComments}
      >
        View Comments
      </Button>
    </div>
  );
}
