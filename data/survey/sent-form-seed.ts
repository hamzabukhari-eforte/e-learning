import type { SentForm } from "@/data/survey/types";

export const SENT_FORM_SEED: SentForm[] = [
  {
    id: "SF-1001",
    employeeId: "e1",
    employeeName: "Ahmed Khan",
    formId: "1",
    formName: "Workplace Safety Survey",
    formType: "survey",
    assignedAt: "2026-08-12T09:00:00.000Z",
    validFrom: "2026-08-12T09:00:00.000Z",
    validTo: "2026-08-19T18:00:00.000Z",
  },
  {
    id: "SF-1002",
    employeeId: "e2",
    employeeName: "Sara Ali",
    formId: "2",
    formName: "Training Feedback Form",
    formType: "interview",
    assignedAt: "2026-08-13T11:30:00.000Z",
    validFrom: "2026-08-14T08:00:00.000Z",
    validTo: "2026-08-21T17:00:00.000Z",
  },
];
