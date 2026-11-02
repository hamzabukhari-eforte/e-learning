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
import type { LiveAssessment } from "@/data/reports/live-assessment-types";

type ViewScoreModalProps = {
  open: boolean;
  assessment: LiveAssessment | null;
  onClose: () => void;
};

export function ViewScoreModal({
  open,
  assessment,
  onClose,
}: ViewScoreModalProps) {
  const scores = assessment?.scores ?? [];

  return (
    <Modal
      open={open}
      title={
        assessment
          ? `View Score — ${assessment.quizName}`
          : "View Score"
      }
      onClose={onClose}
      size="md"
    >
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
              {["Serial #", "Employee Number", "Employee Name", "Score"].map(
                (header) => (
                  <TableHead key={header}>{header}</TableHead>
                ),
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {scores.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-zinc-500">
                  No scores available yet.
                </TableCell>
              </TableRow>
            ) : (
              scores.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.employeeNo}</TableCell>
                  <TableCell>{row.employeeName}</TableCell>
                  <TableCell>
                    {row.score}/{row.totalMarks}
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
