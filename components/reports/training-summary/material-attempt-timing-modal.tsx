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
import type { MaterialAttemptTiming } from "@/data/reports/training-summary-types";

type MaterialAttemptTimingModalProps = {
  open: boolean;
  materialName: string;
  timings: MaterialAttemptTiming[];
  onClose: () => void;
};

export function MaterialAttemptTimingModal({
  open,
  materialName,
  timings,
  onClose,
}: MaterialAttemptTimingModalProps) {
  return (
    <Modal
      open={open}
      title={`View Attempt Detail${materialName ? ` — ${materialName}` : ""}`}
      onClose={onClose}
      size="lg"
      zIndex={70}
    >
      <div className="space-y-4">
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
              {[
                "Sr.No",
                "Attempt#",
                "Total Duration",
                "Start Time",
                "End Time",
                "Stay Duration",
              ].map((header) => (
                <TableHead key={header} className="whitespace-normal px-3">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {timings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-zinc-500">
                  No attempts recorded for this material.
                </TableCell>
              </TableRow>
            ) : (
              timings.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell className="px-3">{index + 1}</TableCell>
                  <TableCell className="px-3">{row.attemptNo}</TableCell>
                  <TableCell className="px-3">{row.totalDuration}</TableCell>
                  <TableCell className="px-3">{row.startTime}</TableCell>
                  <TableCell className="px-3">{row.endTime}</TableCell>
                  <TableCell className="px-3">{row.stayDuration}</TableCell>
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
