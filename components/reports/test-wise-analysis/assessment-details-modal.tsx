"use client";

import { useEffect, useState } from "react";
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
import type {
  TestWiseAssessment,
  TestWiseAttemptDetail,
} from "@/data/reports/test-wise-analysis-types";
import { formatDateTime } from "@/lib/datetime";

type AssessmentDetailsModalProps = {
  open: boolean;
  assessment: TestWiseAssessment | null;
  onClose: () => void;
};

export function AssessmentDetailsModal({
  open,
  assessment,
  onClose,
}: AssessmentDetailsModalProps) {
  const [attemptTarget, setAttemptTarget] =
    useState<TestWiseAttemptDetail | null>(null);
  const attempts = assessment?.attempts ?? [];

  useEffect(() => {
    if (!open) setAttemptTarget(null);
  }, [open]);

  return (
    <>
      <Modal
        open={open}
        title={
          assessment
            ? `Assessment Details — ${assessment.testName}`
            : "Assessment Details"
        }
        onClose={onClose}
        size="xl"
      >
        <div className="space-y-4">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
                {[
                  "Sr.No",
                  "Employee Name",
                  "Employee#",
                  "Attempt No.",
                  "Attempt Date",
                  "Score",
                  "Status",
                  "Action",
                ].map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {attempts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="py-8 text-center text-zinc-500"
                  >
                    No attempt details available.
                  </TableCell>
                </TableRow>
              ) : (
                attempts.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {row.employeeName}
                    </TableCell>
                    <TableCell>{row.employeeNo}</TableCell>
                    <TableCell>{row.attemptNo}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {row.attemptDate ? formatDateTime(row.attemptDate) : "—"}
                    </TableCell>
                    <TableCell>
                      {row.status === "submitted"
                        ? `${row.score}/${row.totalMarks}`
                        : "—"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {row.status === "submitted"
                        ? "Submitted"
                        : "Not Submitted"}
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-9"
                        onClick={() => setAttemptTarget(row)}
                      >
                        View Attempt
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
      <Modal
        open={Boolean(attemptTarget)}
        title={
          attemptTarget
            ? `View Attempt — ${attemptTarget.employeeName}`
            : "View Attempt"
        }
        onClose={() => setAttemptTarget(null)}
        size="md"
        zIndex={60}
      >
        {attemptTarget ? (
          <div className="space-y-4">
            <Table className="w-full table-fixed">
              <TableHeader>
                <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
                  {[
                    "Sr.No",
                    "Attempt No.",
                    "Attempt Date",
                    "Score",
                    "Status",
                  ].map((header) => (
                    <TableHead key={header} className="px-3">
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="px-3">1</TableCell>
                  <TableCell className="px-3">{attemptTarget.attemptNo}</TableCell>
                  <TableCell className="px-3">
                    {attemptTarget.attemptDate
                      ? formatDateTime(attemptTarget.attemptDate)
                      : "—"}
                  </TableCell>
                  <TableCell className="px-3">
                    {attemptTarget.status === "submitted"
                      ? `${attemptTarget.score}/${attemptTarget.totalMarks}`
                      : "—"}
                  </TableCell>
                  <TableCell className="px-3">
                    {attemptTarget.status === "submitted"
                      ? "Submitted"
                      : "Not Submitted"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setAttemptTarget(null)}
              >
                Close
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
