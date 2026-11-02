"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { PendingResultAttempt } from "@/data/results/types";

type ViewPaperModalProps = {
  open: boolean;
  attempt: PendingResultAttempt | null;
  quizName?: string;
  onClose: () => void;
};

export function ViewPaperModal({
  open,
  attempt,
  quizName,
  onClose,
}: ViewPaperModalProps) {
  return (
    <Modal
      open={open}
      title={
        attempt
          ? `View Paper — ${attempt.employeeName}`
          : "View Paper"
      }
      onClose={onClose}
      size="md"
    >
      <div className="space-y-4">
        <div className="rounded-md border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-700">
          {attempt ? (
            <div className="space-y-2">
              <p>
                <span className="font-medium text-black">Quiz:</span>{" "}
                {quizName ?? "—"}
              </p>
              <p>
                <span className="font-medium text-black">Employee:</span>{" "}
                {attempt.employeeName}
              </p>
              <p>
                <span className="font-medium text-black">Attempt:</span>{" "}
                {attempt.attemptNo}
              </p>
              <p className="pt-2 text-zinc-500">
                Paper preview will be available once the backend is connected.
              </p>
            </div>
          ) : (
            <p>No paper selected.</p>
          )}
        </div>
        <div className="flex justify-end">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
