"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { TEST_TYPE_LABEL, type TestAttemptSummary } from "@/data/reports/types";
import { formatDateTime } from "@/lib/datetime";

type TestSummaryRowProps = {
  row: TestAttemptSummary;
  serial: number;
};

export function TestSummaryRow({ row, serial }: TestSummaryRowProps) {
  return (
    <TableRow>
      <TableCell>{serial}</TableCell>
      <TableCell className="whitespace-nowrap">{row.trainingName}</TableCell>
      <TableCell className="whitespace-nowrap">{row.subTrainingName}</TableCell>
      <TableCell className="whitespace-nowrap">{row.trainerName}</TableCell>
      <TableCell className="whitespace-nowrap">{row.testName}</TableCell>
      <TableCell className="whitespace-nowrap">
        {TEST_TYPE_LABEL[row.testType]}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {formatDateTime(row.validFrom)}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {formatDateTime(row.validTill)}
      </TableCell>
      <TableCell>{row.totalAssigned}</TableCell>
      <TableCell>{row.totalAttempted}</TableCell>
    </TableRow>
  );
}
