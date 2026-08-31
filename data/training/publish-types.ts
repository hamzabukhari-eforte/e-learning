import type { EntityStatus } from "@/data/system-setup/types";

export type AssignPurpose = "training" | "quiz";

export type PublishedEmployee = {
  id: string;
  employeeNo: string;
  name: string;
  department: string;
  designation: string;
  email: string;
  status: EntityStatus;
};

export type PublishedTraining = {
  id: string;
  trainingId: string;
  trainingName: string;
  subTrainingId: string;
  subTrainingName: string;
  validityFrom: string;
  validityTo: string;
  employeeCount: number;
  purpose: AssignPurpose;
  assignedAt: string;
  status: EntityStatus;
  employees: PublishedEmployee[];
};

export type PublishTrainingInput = {
  trainingId: string;
  subTrainingId: string;
  validityFrom: string;
  validityTo: string;
  employeeCount: string;
  purpose: AssignPurpose | "";
};

export const PURPOSE_OPTIONS: { value: AssignPurpose; label: string }[] = [
  { value: "training", label: "For training" },
  { value: "quiz", label: "For quiz" },
];

export function purposeLabel(purpose: AssignPurpose) {
  return PURPOSE_OPTIONS.find((item) => item.value === purpose)?.label ?? purpose;
}
