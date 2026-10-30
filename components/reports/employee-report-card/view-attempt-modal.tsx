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
import { QUIZ_ASSIGN_TYPE_LABEL } from "@/data/exams/types";
import type { ReportCardAssessment } from "@/data/reports/employee-report-card-types";
import { formatDateTime } from "@/lib/datetime";

type ViewAttemptModalProps = {
  open: boolean;
  assessment: ReportCardAssessment | null;
  onClose: () => void;
};

export function ViewAttemptModal({
  open,
  assessment,
  onClose,
}: ViewAttemptModalProps) {
  return (
    <Modal
      open={open}
      title={
        assessment
          ? `View Attempt — ${assessment.testName}`
          : "View Attempt"
      }
      onClose={onClose}
      size="lg"
    >
      {assessment ? (
        <div className="space-y-4">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
                {[
                  "Sr.No",
                  "Test Name",
                  "Test Type",
                  "Attempt No.",
                  "Attempt Date",
                  "Score",
                  "Wrong Questions",
                ].map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell className="whitespace-nowrap">
                  {assessment.testName}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {QUIZ_ASSIGN_TYPE_LABEL[assessment.testType]}
                </TableCell>
                <TableCell>{assessment.attemptNo}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {formatDateTime(assessment.attemptDate)}
                </TableCell>
                <TableCell>
                  {assessment.score}/{assessment.totalMarks}
                </TableCell>
                <TableCell>{assessment.totalWrongQuestions}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
