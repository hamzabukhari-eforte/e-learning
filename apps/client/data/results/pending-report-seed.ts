import type { PendingResultRow } from "@/data/results/types";

export const PENDING_RESULT_SEED: PendingResultRow[] = [
  {
    id: "pr1",
    trainingId: "1",
    trainingName: "Safety Orientation",
    subTrainingId: "s1",
    subTrainingName: "Workplace Hazards",
    quizId: "qz1",
    quizName: "Workplace Hazards Quiz",
    quizType: "pre-test",
    assignedAt: "2026-05-08T10:30:00.000Z",
    assignedEmployees: [
      { id: "e1", name: "Ali Raza" },
      { id: "e2", name: "Fatima Noor" },
      { id: "e3", name: "Hassan Ali" },
    ],
    attemptedEmployees: [
      { id: "e1", name: "Ali Raza" },
      { id: "e2", name: "Fatima Noor" },
    ],
    pendingEmployees: [{ id: "e3", name: "Hassan Ali" }],
    attempts: [
      {
        id: "att1",
        employeeId: "e1",
        employeeName: "Ali Raza",
        attemptNo: 1,
      },
      {
        id: "att2",
        employeeId: "e2",
        employeeName: "Fatima Noor",
        attemptNo: 1,
      },
      {
        id: "att3",
        employeeId: "e2",
        employeeName: "Fatima Noor",
        attemptNo: 2,
      },
    ],
  },
  {
    id: "pr2",
    trainingId: "2",
    trainingName: "Fire Fighting",
    subTrainingId: "s4",
    subTrainingName: "Extinguisher Types",
    quizId: "qz3",
    quizName: "Extinguisher Types Quiz",
    quizType: "post-test",
    assignedAt: "2026-06-02T14:15:00.000Z",
    assignedEmployees: [
      { id: "e3", name: "Hassan Ali" },
      { id: "e4", name: "Sara Khan" },
    ],
    attemptedEmployees: [{ id: "e3", name: "Hassan Ali" }],
    pendingEmployees: [{ id: "e4", name: "Sara Khan" }],
    attempts: [
      {
        id: "att4",
        employeeId: "e3",
        employeeName: "Hassan Ali",
        attemptNo: 1,
      },
    ],
  },
];
