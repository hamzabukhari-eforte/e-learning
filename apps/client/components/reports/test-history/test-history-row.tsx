"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import {
  CHECK_STATUS_LABEL,
  SUBMIT_STATUS_LABEL,
  TEST_TYPE_LABEL,
  type TestAttemptHistory,
} from "@/data/reports/types";
import { formatDate } from "@/lib/datetime";

type TestHistoryRowProps = {
  row: TestAttemptHistory;
  serial: number;
};

export function TestHistoryRow({ row, serial }: TestHistoryRowProps) {
  return (
    <TableRow>
      <TableCell>{serial}</TableCell>
      <TableCell className="whitespace-nowrap">{row.assignedQuizId}</TableCell>
      <TableCell className="whitespace-nowrap">{row.trainingName}</TableCell>
      <TableCell className="whitespace-nowrap">{row.subTrainingName}</TableCell>
      <TableCell className="whitespace-nowrap">{row.quizName}</TableCell>
      <TableCell className="whitespace-nowrap">{TEST_TYPE_LABEL[row.quizType]}</TableCell>
      <TableCell className="whitespace-nowrap">{row.employeeNo}</TableCell>
      <TableCell className="whitespace-nowrap">{row.employeeName}</TableCell>
      <TableCell className="whitespace-nowrap">{formatDate(row.assignDate)}</TableCell>
      <TableCell className="whitespace-nowrap">{formatDate(row.validFrom)}</TableCell>
      <TableCell className="whitespace-nowrap">{formatDate(row.validTill)}</TableCell>
      <TableCell className="whitespace-nowrap">{SUBMIT_STATUS_LABEL[row.submitStatus]}</TableCell>
      <TableCell className="whitespace-nowrap">
        {row.attemptDate ? formatDate(row.attemptDate) : "—"}
      </TableCell>
      <TableCell>{row.attemptNo}</TableCell>
      <TableCell className="whitespace-nowrap">{CHECK_STATUS_LABEL[row.checkStatus]}</TableCell>
      <TableCell>{row.totalMarks}</TableCell>
      <TableCell>{row.obtainedMarks}</TableCell>
      <TableCell>{row.percentage}%</TableCell>
      <TableCell>{row.grade}</TableCell>
    </TableRow>
  );
}
