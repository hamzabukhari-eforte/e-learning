import { IMPROVEMENT_PLAN_STATUS_LABEL } from "@/data/reports/employee-report-card-types";
import type { ReportCardImprovementPlan } from "@/data/reports/employee-report-card-types";
import { formatDate } from "@/lib/datetime";
import type { ExportColumn } from "@/lib/table-export";

export const REPORT_CARD_PLAN_EXPORT: ExportColumn<ReportCardImprovementPlan>[] =
  [
    { header: "SNo", getValue: (_row, index) => String(index + 1) },
    { header: "Sub-Training", getValue: (row) => row.subTrainingName },
    { header: "Message", getValue: (row) => row.message },
    { header: "Send Date", getValue: (row) => formatDate(row.sendDate) },
    { header: "End Date", getValue: (row) => formatDate(row.endDate) },
    {
      header: "Status",
      getValue: (row) => IMPROVEMENT_PLAN_STATUS_LABEL[row.status],
    },
  ];
