import type { LiveAssessment } from "@/data/reports/live-assessment-types";

/** Validity ends in the future so assessments remain "live". */
export const LIVE_ASSESSMENT_SEED: LiveAssessment[] = [
  {
    id: "la1",
    assignedQuizId: "AQ-2001",
    quizName: "Workplace Hazards Quiz",
    quizType: "pre-test",
    assignedAt: "2026-09-20T10:30:00.000Z",
    validFrom: "2026-09-20T00:00:00.000Z",
    validTo: "2027-03-31T23:59:59.999Z",
    scores: [
      {
        id: "s1",
        employeeNo: "1001",
        employeeName: "Ahmed Khan",
        score: 8,
        totalMarks: 10,
      },
      {
        id: "s2",
        employeeNo: "1002",
        employeeName: "Sara Ali",
        score: 7,
        totalMarks: 10,
      },
    ],
  },
  {
    id: "la2",
    assignedQuizId: "AQ-2002",
    quizName: "Extinguisher Types Quiz",
    quizType: "post-test",
    assignedAt: "2026-10-01T14:15:00.000Z",
    validFrom: "2026-10-01T00:00:00.000Z",
    validTo: "2027-04-30T23:59:59.999Z",
    scores: [
      {
        id: "s3",
        employeeNo: "1003",
        employeeName: "Omar Siddiqui",
        score: 9,
        totalMarks: 10,
      },
    ],
  },
  {
    id: "la3",
    assignedQuizId: "AQ-2003",
    quizName: "PPE Usage Quiz",
    quizType: "pre-test",
    assignedAt: "2026-08-15T09:00:00.000Z",
    validFrom: "2026-08-15T00:00:00.000Z",
    validTo: "2026-09-01T23:59:59.999Z",
    scores: [],
  },
];
