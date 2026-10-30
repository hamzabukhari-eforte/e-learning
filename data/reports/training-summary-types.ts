import type { EntityStatus } from "@/data/system-setup/types";

export type TrainingProgressStatus =
  | "not-started"
  | "in-progress"
  | "completed"
  | "expired";

export type MaterialTypeLabel = "PPT Slide" | "Video" | "MCQs";

export type MaterialAttemptTiming = {
  id: string;
  attemptNo: number;
  totalDuration: string;
  startTime: string;
  endTime: string;
  stayDuration: string;
};

export type MaterialAttemptRow = {
  id: string;
  name: string;
  materialType: MaterialTypeLabel;
  attemptNo: number;
  timings: MaterialAttemptTiming[];
};

export type TrainingAttemptEmployee = {
  id: string;
  employeeNo: string;
  name: string;
  department: string;
  designation: string;
  subTrainingName: string;
  startDateTime: string;
  endDateTime: string;
  totalSlidesAttached: number;
  totalSlidesAttempts: number;
  firstAttemptDate: string;
  totalTimeExpected: string;
  totalTimeSpent: string;
  materials: MaterialAttemptRow[];
};

export type TrainingSummarySlide = {
  id: string;
  sequence: number;
  title: string;
  fileName: string;
};

export type TrainingSummaryRow = {
  id: string;
  trainingName: string;
  subTrainingName: string;
  description: string;
  publishDate: string;
  startDate: string;
  endDate: string;
  publishedBy: string;
  assignedEmployees: number;
  attemptedByEmployees: number;
  totalSlides: number;
  status: EntityStatus;
  trainingStatus: TrainingProgressStatus;
  averageTimeSpent: string;
  content: TrainingSummarySlide[];
  assignedAttempts: TrainingAttemptEmployee[];
  attemptedAttempts: TrainingAttemptEmployee[];
};

export const TRAINING_PROGRESS_STATUS_LABEL: Record<
  TrainingProgressStatus,
  string
> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  completed: "Completed",
  expired: "Expired",
};
