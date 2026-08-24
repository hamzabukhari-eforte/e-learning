import type { TestAttemptHistory } from "@/data/reports/types";

function row(
  values: TestAttemptHistory,
): TestAttemptHistory {
  return values;
}

export const TEST_HISTORY_SEED: TestAttemptHistory[] = [
  row({
    id: "h1", assignedQuizId: "QZ-001", trainingId: "1",
    trainingName: "Safety Orientation", subTrainingId: "s1",
    subTrainingName: "Workplace Hazards", trainerId: "TR-001", testId: "t1",
    quizName: "Hazards Awareness Quiz", quizType: "pre-test",
    employeeNo: "1001", employeeName: "Ahmed Khan",
    assignDate: "2026-03-01T09:00:00.000Z",
    validFrom: "2026-03-01T09:00:00.000Z", validTill: "2026-03-15T18:00:00.000Z",
    submitStatus: "submitted", attemptDate: "2026-03-03T11:20:00.000Z",
    attemptNo: 1, checkStatus: "checked", totalMarks: 20, obtainedMarks: 16,
    percentage: 80, grade: "A",
  }),
  row({
    id: "h2", assignedQuizId: "QZ-002", trainingId: "1",
    trainingName: "Safety Orientation", subTrainingId: "s1",
    subTrainingName: "Workplace Hazards", trainerId: "TR-001", testId: "t1",
    quizName: "Hazards Awareness Quiz", quizType: "pre-test",
    employeeNo: "1002", employeeName: "Sara Ali",
    assignDate: "2026-03-01T09:00:00.000Z",
    validFrom: "2026-03-01T09:00:00.000Z", validTill: "2026-03-15T18:00:00.000Z",
    submitStatus: "submitted", attemptDate: "2026-03-04T14:05:00.000Z",
    attemptNo: 2, checkStatus: "checked", totalMarks: 20, obtainedMarks: 12,
    percentage: 60, grade: "C",
  }),
  row({
    id: "h3", assignedQuizId: "QZ-003", trainingId: "1",
    trainingName: "Safety Orientation", subTrainingId: "s2",
    subTrainingName: "PPE Usage", trainerId: "TR-001", testId: "t2",
    quizName: "PPE Practical Check", quizType: "post-test",
    employeeNo: "1004", employeeName: "Fatima Noor",
    assignDate: "2026-03-05T10:00:00.000Z",
    validFrom: "2026-03-05T10:00:00.000Z", validTill: "2026-03-20T17:00:00.000Z",
    submitStatus: "not-submitted", attemptDate: "",
    attemptNo: 0, checkStatus: "unchecked", totalMarks: 25, obtainedMarks: 0,
    percentage: 0, grade: "—",
  }),
  row({
    id: "h4", assignedQuizId: "QZ-004", trainingId: "2",
    trainingName: "Fire Fighting", subTrainingId: "s4",
    subTrainingName: "Extinguisher Types", trainerId: "TR-002", testId: "t3",
    quizName: "Extinguisher Selection Test", quizType: "pre-test",
    employeeNo: "1003", employeeName: "Omar Siddiqui",
    assignDate: "2026-03-08T08:00:00.000Z",
    validFrom: "2026-03-08T08:00:00.000Z", validTill: "2026-03-22T16:00:00.000Z",
    submitStatus: "submitted", attemptDate: "2026-03-10T09:40:00.000Z",
    attemptNo: 1, checkStatus: "unchecked", totalMarks: 15, obtainedMarks: 11,
    percentage: 73, grade: "B",
  }),
];
