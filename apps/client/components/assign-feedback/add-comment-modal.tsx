"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import type { AssignedFeedback } from "@/data/feedback/types";

type AddCommentModalProps = {
  open: boolean;
  feedback: AssignedFeedback | null;
  pending?: boolean;
  onClose: () => void;
  onSave: (comment: string) => void;
};

export function AddCommentModal({
  open,
  feedback,
  pending,
  onClose,
  onSave,
}: AddCommentModalProps) {
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!open) setComment("");
  }, [open]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!comment.trim()) return;
    onSave(comment.trim());
  }

  return (
    <Modal
      open={open}
      title={
        feedback
          ? `Add Comments — ${feedback.employeeName}`
          : "Add Comments"
      }
      onClose={onClose}
      size="md"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="feedback-comment">Comment</Label>
          <Textarea
            id="feedback-comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Enter comment"
            rows={5}
            required
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={pending || !comment.trim()}>
            {pending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
