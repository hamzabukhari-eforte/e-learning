export type FeedbackStatus = "positive" | "improvement-required";

export const FEEDBACK_STATUS_OPTIONS: {
  value: FeedbackStatus;
  label: string;
}[] = [
  { value: "positive", label: "Positive" },
  { value: "improvement-required", label: "Improvement Required" },
];

export function feedbackStatusLabel(status: FeedbackStatus) {
  return (
    FEEDBACK_STATUS_OPTIONS.find((item) => item.value === status)?.label ??
    status
  );
}

export type FeedbackComment = {
  id: string;
  comment: string;
  commentedBy: string;
  commentedAt: string;
};

export type AssignedFeedback = {
  id: string;
  trainingId: string;
  trainingName: string;
  subTrainingId: string;
  subTrainingName: string;
  assignedTrainingId: string;
  startDate: string;
  endDate: string;
  employeeId: string;
  employeeName: string;
  status: FeedbackStatus;
  details: string;
  assignedAt: string;
  comments: FeedbackComment[];
};

export type AssignFeedbackInput = {
  trainingId: string;
  subTrainingId: string;
  dateFrom: string;
  dateTo: string;
  assignedTrainingId: string;
  employeeId: string;
  status: FeedbackStatus | "";
  details: string;
};
