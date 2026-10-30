"use client";

import { useEffect, useState, type FormEvent } from "react";
import { FaPen } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  FEEDBACK_STATUS_OPTIONS,
  type FeedbackStatus,
} from "@/data/feedback/types";

type AssignTrainingFeedbackModalProps = {
  open: boolean;
  employeeName: string;
  onClose: () => void;
  onAssign: (input: { status: FeedbackStatus; details: string }) => void;
};

export function AssignTrainingFeedbackModal({
  open,
  employeeName,
  onClose,
  onAssign,
}: AssignTrainingFeedbackModalProps) {
  const [status, setStatus] = useState<FeedbackStatus | "">("positive");
  const [details, setDetails] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setStatus("positive");
      setDetails("");
      setError(null);
      setMessage(null);
    }
  }, [open]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!status) {
      setError("Please select feedback status.");
      return;
    }
    if (!details.trim()) {
      setError("Please write feedback detail.");
      return;
    }
    setError(null);
    onAssign({ status, details: details.trim() });
    setMessage(`Feedback assigned to ${employeeName}.`);
    window.setTimeout(() => {
      setMessage(null);
      onClose();
    }, 800);
  }

  return (
    <Modal
      open={open}
      title="Assign Feedback"
      onClose={onClose}
      size="md"
      zIndex={60}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="training-feedback-status">
            Select Feedback Status
          </Label>
          <Select
            value={status || undefined}
            onValueChange={(value) => setStatus(value as FeedbackStatus)}
          >
            <SelectTrigger
              id="training-feedback-status"
              aria-label="Feedback status"
            >
              <SelectValue placeholder="Select feedback status" />
            </SelectTrigger>
            <SelectContent className="z-[80]">
              {FEEDBACK_STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="training-feedback-details"
            className="inline-flex items-center gap-2"
          >
            <FaPen className="size-3 text-[#FFA901]" />
            Write feedback Detail
          </Label>
          <Textarea
            id="training-feedback-details"
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            rows={6}
            placeholder="Enter feedback details"
          />
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {message ? (
          <p className="text-sm font-medium text-emerald-700">{message}</p>
        ) : null}
        <div className="flex items-center justify-between gap-3">
          <Button
            type="submit"
            className="bg-[#FFA901] text-white hover:bg-[#e69801]"
          >
            Assign
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </form>
    </Modal>
  );
}
