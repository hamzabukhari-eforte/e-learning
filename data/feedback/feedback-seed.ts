import type { AssignedFeedback } from "@/data/feedback/types";

export const ASSIGNED_FEEDBACK_SEED: AssignedFeedback[] = [
  {
    id: "fb1",
    trainingId: "1",
    trainingName: "Safety Orientation",
    subTrainingId: "s1",
    subTrainingName: "Workplace Hazards",
    assignedTrainingId: "pt1",
    startDate: "2026-06-01T00:00:00.000Z",
    endDate: "2026-06-30T23:59:59.999Z",
    employeeId: "e1",
    employeeName: "Ali Raza",
    status: "positive",
    details: "Strong participation and hazard identification skills.",
    assignedAt: "2026-06-10T11:20:00.000Z",
    comments: [
      {
        id: "c1",
        comment: "Follow up after week 2 coaching session.",
        commentedBy: "Trainer",
        commentedAt: "2026-06-12T09:00:00.000Z",
      },
    ],
  },
  {
    id: "fb2",
    trainingId: "2",
    trainingName: "Fire Fighting",
    subTrainingId: "s4",
    subTrainingName: "Extinguisher Types",
    assignedTrainingId: "pt2",
    startDate: "2026-07-01T00:00:00.000Z",
    endDate: "2026-07-31T23:59:59.999Z",
    employeeId: "e3",
    employeeName: "Hassan Ali",
    status: "improvement-required",
    details: "Needs more practice selecting extinguisher types under pressure.",
    assignedAt: "2026-07-08T14:45:00.000Z",
    comments: [],
  },
];
