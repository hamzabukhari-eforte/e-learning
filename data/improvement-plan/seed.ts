import type { ImprovementPlan } from "@/data/improvement-plan/types";

export const IMPROVEMENT_PLAN_SEED: ImprovementPlan[] = [
  {
    id: "ip1",
    trainingId: "1",
    trainingName: "Safety Orientation",
    subTrainingId: "s1",
    subTrainingName: "Workplace Hazards",
    dateFrom: "2026-05-01T00:00:00.000Z",
    dateTo: "2026-05-31T23:59:59.999Z",
    employeeIds: ["e1", "e2"],
    employeeNames: ["Ali Raza", "Fatima Noor"],
    targetCompletionDate: "2026-06-15T00:00:00.000Z",
    taskMaterial:
      "Review hazard identification checklist and submit a short reflection on three workplace risks.",
    sentAt: "2026-05-10T11:00:00.000Z",
    responses: [
      {
        id: "r1",
        employeeId: "e1",
        employeeName: "Ali Raza",
        response:
          "Completed the checklist. Focused on wet floors, blocked exits, and improper PPE storage.",
        respondedAt: "2026-05-12T09:30:00.000Z",
      },
    ],
  },
  {
    id: "ip2",
    trainingId: "2",
    trainingName: "Fire Fighting",
    subTrainingId: "s4",
    subTrainingName: "Extinguisher Types",
    dateFrom: "2026-06-01T00:00:00.000Z",
    dateTo: "2026-06-30T23:59:59.999Z",
    employeeIds: ["e3"],
    employeeNames: ["Hassan Ali"],
    targetCompletionDate: "2026-07-10T00:00:00.000Z",
    taskMaterial:
      "Practice extinguisher selection scenarios and document correct extinguisher type for each fire class.",
    sentAt: "2026-06-05T14:20:00.000Z",
    responses: [],
  },
];
