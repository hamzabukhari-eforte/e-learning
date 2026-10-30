"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AssignedFeedback } from "@/data/feedback/types";
import { formatDateTime } from "@/lib/datetime";

type ViewCommentsModalProps = {
  open: boolean;
  feedback: AssignedFeedback | null;
  onClose: () => void;
};

export function ViewCommentsModal({
  open,
  feedback,
  onClose,
}: ViewCommentsModalProps) {
  const comments = feedback?.comments ?? [];

  return (
    <Modal
      open={open}
      title={
        feedback
          ? `View Comments — ${feedback.employeeName}`
          : "View Comments"
      }
      onClose={onClose}
    >
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
              {["Serial #", "Comments", "Commented by", "Comment date"].map(
                (header) => (
                  <TableHead key={header}>{header}</TableHead>
                ),
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-zinc-500">
                  No comments found.
                </TableCell>
              </TableRow>
            ) : (
              comments.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="max-w-md whitespace-pre-wrap">
                    {item.comment}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {item.commentedBy}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatDateTime(item.commentedAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="flex justify-end">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
