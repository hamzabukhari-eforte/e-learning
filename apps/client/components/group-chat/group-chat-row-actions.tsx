"use client";

import { Button } from "@/components/ui/button";

type GroupChatRowActionsProps = {
  onSentList: () => void;
  onViewMessage: () => void;
  onEdit: () => void;
};

export function GroupChatRowActions({
  onSentList,
  onViewMessage,
  onEdit,
}: GroupChatRowActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9"
        onClick={onSentList}
      >
        Sent List
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9"
        onClick={onViewMessage}
      >
        View Message
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9"
        onClick={onEdit}
      >
        Edit
      </Button>
    </div>
  );
}
