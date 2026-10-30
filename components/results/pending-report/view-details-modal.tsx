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
import type { PendingResultAttempt } from "@/data/results/types";

type ViewDetailsModalProps = {
  open: boolean;
  title: string;
  attempts: PendingResultAttempt[];
  onClose: () => void;
  onViewPaper: (attempt: PendingResultAttempt) => void;
};

export function ViewDetailsModal({
  open,
  title,
  attempts,
  onClose,
  onViewPaper,
}: ViewDetailsModalProps) {
  return (
    <Modal open={open} title={title} onClose={onClose}>
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
              {["Serial #", "Employee name", "Attempt number", "Action"].map(
                (header) => (
                  <TableHead key={header}>{header}</TableHead>
                ),
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {attempts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-zinc-500">
                  No attempt details found.
                </TableCell>
              </TableRow>
            ) : (
              attempts.map((attempt, index) => (
                <TableRow key={attempt.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {attempt.employeeName}
                  </TableCell>
                  <TableCell>{attempt.attemptNo}</TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-9"
                      onClick={() => onViewPaper(attempt)}
                    >
                      View Paper
                    </Button>
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
