import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";
import type { AssignedTrainer } from "@/data/assign-training/types";
import { listTrainers } from "@/data/registration/trainers";
import { listTrainings } from "@/data/system-setup/trainings";

export type { AssignedTrainer, TrainerTrainingAssignment } from "@/data/assign-training/types";

let assignments: { trainerId: string; trainingIds: string[] }[] = [
  { trainerId: "TR-001", trainingIds: ["1", "2"] },
  { trainerId: "TR-002", trainingIds: ["3", "5"] },
];

export async function getAssignedTrainingIds(
  trainerId: string,
): Promise<string[]> {
  await delay();
  return (
    assignments.find((item) => item.trainerId === trainerId)?.trainingIds ?? []
  );
}

export async function assignTrainingsToTrainer(
  trainerId: string,
  trainingIds: string[],
): Promise<{ trainerId: string; trainingIds: string[] } | null> {
  await delay();
  if (!trainerId || trainingIds.length === 0) return null;
  const uniqueIds = [...new Set(trainingIds)];
  const index = assignments.findIndex((item) => item.trainerId === trainerId);
  const next = { trainerId, trainingIds: uniqueIds };
  if (index < 0) assignments = [next, ...assignments];
  else assignments[index] = next;
  return next;
}

export async function listAssignedTrainers(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<AssignedTrainer>> {
  await delay();
  const [trainers, trainings] = await Promise.all([
    listTrainers({ page: 1, pageSize: 1000 }),
    listTrainings({ page: 1, pageSize: 1000 }),
  ]);
  const trainingName = new Map(
    trainings.items.map((item) => [item.id, item.name]),
  );
  const trainerName = new Map(
    trainers.items.map((item) => [item.id, item.employeeName]),
  );
  const rows: AssignedTrainer[] = assignments
    .filter((item) => item.trainingIds.length > 0)
    .map((item) => ({
      trainerId: item.trainerId,
      name: trainerName.get(item.trainerId) ?? "Unknown",
      courses: item.trainingIds
        .map((id) => trainingName.get(id) ?? id)
        .filter(Boolean),
    }));
  const search = params?.search ?? "";
  const filtered = rows.filter(
    (item) =>
      matchesSearch(item.trainerId, search) ||
      matchesSearch(item.name, search) ||
      item.courses.some((course) => matchesSearch(course, search)),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function unassignTrainer(trainerId: string): Promise<boolean> {
  await delay();
  const before = assignments.length;
  assignments = assignments.filter((item) => item.trainerId !== trainerId);
  return assignments.length < before;
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
