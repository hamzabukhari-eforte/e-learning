import type {
  TestWiseAttemptDetail,
  TestWiseTraining,
} from "@/data/reports/test-wise-analysis-types";

const ATTEMPTS_A: TestWiseAttemptDetail[] = [
  {
    id: "att-1",
    employeeNo: "1001",
    employeeName: "Ahmed Khan",
    attemptNo: 1,
    attemptDate: "2026-06-05T09:20:00.000Z",
    score: 16,
    totalMarks: 20,
    status: "submitted",
  },
  {
    id: "att-2",
    employeeNo: "1002",
    employeeName: "Sara Bibi Ali",
    attemptNo: 1,
    attemptDate: "2026-06-06T10:15:00.000Z",
    score: 14,
    totalMarks: 20,
    status: "submitted",
  },
  {
    id: "att-3",
    employeeNo: "1004",
    employeeName: "Fatima Noor",
    attemptNo: 0,
    attemptDate: "",
    score: 0,
    totalMarks: 20,
    status: "not-submitted",
  },
];

const ATTEMPTS_B: TestWiseAttemptDetail[] = [
  {
    id: "att-4",
    employeeNo: "1001",
    employeeName: "Ahmed Khan",
    attemptNo: 1,
    attemptDate: "2026-06-18T11:00:00.000Z",
    score: 18,
    totalMarks: 20,
    status: "submitted",
  },
  {
    id: "att-5",
    employeeNo: "1002",
    employeeName: "Sara Bibi Ali",
    attemptNo: 1,
    attemptDate: "2026-06-19T09:45:00.000Z",
    score: 17,
    totalMarks: 20,
    status: "submitted",
  },
];

export const TEST_WISE_ANALYSIS_SEED: TestWiseTraining[] = [
  {
    id: "1",
    name: "Safety Orientation",
    subTrainings: [
      {
        id: "s1",
        name: "Workplace Hazards",
        assessments: [
          {
            id: "a1",
            testName: "Hazards Awareness Quiz",
            testType: "pre-test",
            validFrom: "2026-06-01T09:00:00.000Z",
            validTill: "2026-06-15T18:00:00.000Z",
            assignedDate: "2026-05-28T10:00:00.000Z",
            totalAssignedEmployees: 24,
            totalAttemptedEmployees: 18,
            averageScore: 78.5,
            attempts: ATTEMPTS_A,
          },
          {
            id: "a2",
            testName: "Hazards Post Assessment",
            testType: "post-test",
            validFrom: "2026-06-16T09:00:00.000Z",
            validTill: "2026-06-30T18:00:00.000Z",
            assignedDate: "2026-06-10T11:00:00.000Z",
            totalAssignedEmployees: 24,
            totalAttemptedEmployees: 12,
            averageScore: 84.2,
            attempts: ATTEMPTS_B,
          },
        ],
      },
      {
        id: "s2",
        name: "PPE Usage",
        assessments: [
          {
            id: "a3",
            testName: "PPE Practical Check",
            testType: "post-test",
            validFrom: "2026-07-01T09:00:00.000Z",
            validTill: "2026-07-20T18:00:00.000Z",
            assignedDate: "2026-06-25T09:30:00.000Z",
            totalAssignedEmployees: 20,
            totalAttemptedEmployees: 15,
            averageScore: 81.0,
            attempts: [
              {
                id: "att-6",
                employeeNo: "1004",
                employeeName: "Fatima Noor",
                attemptNo: 1,
                attemptDate: "2026-07-05T14:00:00.000Z",
                score: 16,
                totalMarks: 20,
                status: "submitted",
              },
            ],
          },
        ],
      },
      {
        id: "s3",
        name: "Emergency Exits",
        assessments: [
          {
            id: "a4",
            testName: "Evacuation Readiness Quiz",
            testType: "pre-test",
            validFrom: "2026-08-01T09:00:00.000Z",
            validTill: "2026-08-14T18:00:00.000Z",
            assignedDate: "2026-07-28T14:00:00.000Z",
            totalAssignedEmployees: 30,
            totalAttemptedEmployees: 22,
            averageScore: 72.4,
            attempts: ATTEMPTS_A,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Fire Fighting",
    subTrainings: [
      {
        id: "s4",
        name: "Extinguisher Types",
        assessments: [
          {
            id: "a5",
            testName: "Extinguisher Types Quiz",
            testType: "post-test",
            validFrom: "2026-07-05T09:00:00.000Z",
            validTill: "2026-07-15T18:00:00.000Z",
            assignedDate: "2026-07-01T10:00:00.000Z",
            totalAssignedEmployees: 16,
            totalAttemptedEmployees: 10,
            averageScore: 88.0,
            attempts: ATTEMPTS_B,
          },
        ],
      },
      {
        id: "s5",
        name: "Evacuation Drill",
        assessments: [
          {
            id: "a6",
            testName: "Drill Coordination Test",
            testType: "pre-test",
            validFrom: "2026-08-10T09:00:00.000Z",
            validTill: "2026-08-25T18:00:00.000Z",
            assignedDate: "2026-08-05T08:00:00.000Z",
            totalAssignedEmployees: 18,
            totalAttemptedEmployees: 8,
            averageScore: 69.5,
            attempts: ATTEMPTS_A.slice(0, 2),
          },
          {
            id: "a7",
            testName: "Drill Follow-up Assessment",
            testType: "post-test",
            validFrom: "2026-08-26T09:00:00.000Z",
            validTill: "2026-09-05T18:00:00.000Z",
            assignedDate: "2026-08-20T12:00:00.000Z",
            totalAssignedEmployees: 18,
            totalAttemptedEmployees: 5,
            averageScore: 75.0,
            attempts: ATTEMPTS_B.slice(0, 1),
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "First Aid Basics",
    subTrainings: [
      {
        id: "s6",
        name: "CPR",
        assessments: [
          {
            id: "a8",
            testName: "CPR Knowledge Check",
            testType: "pre-test",
            validFrom: "2026-04-10T09:00:00.000Z",
            validTill: "2026-04-20T18:00:00.000Z",
            assignedDate: "2026-04-05T09:00:00.000Z",
            totalAssignedEmployees: 12,
            totalAttemptedEmployees: 12,
            averageScore: 91.3,
            attempts: ATTEMPTS_A,
          },
        ],
      },
      {
        id: "s7",
        name: "Wound Care",
        assessments: [],
      },
    ],
  },
];
