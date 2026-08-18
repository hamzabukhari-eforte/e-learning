import type { TrainerTrainingAssignment } from "@/data/assign-training/types";

let assignments: TrainerTrainingAssignment[] = [
  { trainerId: "1", trainingIds: ["1", "2"] },
  { trainerId: "2", trainingIds: ["3", "5"] },
];

export async function getAssignedTrainingIds(
  trainerId: string,
): Promise<string[]> {
  await delay();
  return assignments.find((item) => item.trainerId === trainerId)?.trainingIds ?? [];
}

export async function assignTrainingsToTrainer(
  trainerId: string,
  trainingIds: string[],
): Promise<TrainerTrainingAssignment | null> {
  await delay();
  if (!trainerId || trainingIds.length === 0) return null;
  const uniqueIds = [...new Set(trainingIds)];
  const index = assignments.findIndex((item) => item.trainerId === trainerId);
  const next = { trainerId, trainingIds: uniqueIds };
  if (index < 0) assignments = [next, ...assignments];
  else assignments[index] = next;
  return next;
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
