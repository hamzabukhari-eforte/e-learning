"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { TEST_TYPE_LABEL, type TestAttemptDetail } from "@/data/reports/types";
import { formatDate } from "@/lib/datetime";

type TestDetailRowProps = {
  row: TestAttemptDetail;
  serial: number;
};

export function TestDetailRow({ row, serial }: TestDetailRowProps) {
  return (
    <TableRow>
      <TableCell>{serial}</TableCell>
      <TableCell className="whitespace-nowrap">{row.trainingName}</TableCell>
      <TableCell className="whitespace-nowrap">{row.subTrainingName}</TableCell>
      <TableCell className="whitespace-nowrap">{row.trainerName}</TableCell>
      <TableCell className="whitespace-nowrap">{row.employeeNo}</TableCell>
      <TableCell className="whitespace-nowrap">{row.employeeName}</TableCell>
      <TableCell className="whitespace-nowrap">{formatDate(row.assignDate)}</TableCell>
      <TableCell className="whitespace-nowrap">{row.testName}</TableCell>
      <TableCell className="whitespace-nowrap">
        {TEST_TYPE_LABEL[row.testType]}
      </TableCell>
      <TableCell className="whitespace-nowrap">{formatDate(row.validFrom)}</TableCell>
      <TableCell className="whitespace-nowrap">{formatDate(row.validTill)}</TableCell>
      <TableCell>{row.attemptCount}</TableCell>
    </TableRow>
  );
}
