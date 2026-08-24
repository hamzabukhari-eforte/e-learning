import {
  matchesSearch,
  paginateItems,
  type EntityStatus,
  type PaginatedResult,
  type Training,
} from "@/data/system-setup/types";

let trainings: Training[] = [
  { id: "1", trainingId: "TRN-001", name: "Safety Orientation", status: "active" },
  { id: "2", trainingId: "TRN-002", name: "Fire Fighting", status: "active" },
  { id: "3", trainingId: "TRN-003", name: "First Aid Basics", status: "active" },
  { id: "4", trainingId: "TRN-004", name: "Customer Service", status: "inactive" },
  { id: "5", trainingId: "TRN-005", name: "Leadership Skills", status: "active" },
  { id: "6", trainingId: "TRN-006", name: "Compliance Training", status: "active" },
];

export type TrainingInput = {
  trainingId: string;
  name: string;
  status: EntityStatus;
};

export async function listTrainings(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<Training>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = trainings.filter(
    (item) =>
      matchesSearch(item.name, search) ||
      matchesSearch(item.trainingId, search),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function listTrainingOptions() {
  const result = await listTrainings({ page: 1, pageSize: 1000 });
  return result.items
    .filter((item) => item.status === "active")
    .map((item) => ({ id: item.id, label: item.name }));
}

export async function createTraining(input: TrainingInput): Promise<Training> {
  await delay();
  const training: Training = {
    id: String(Date.now()),
    trainingId: input.trainingId.trim(),
    name: input.name.trim(),
    status: input.status,
  };
  trainings = [training, ...trainings];
  return training;
}

export async function updateTraining(
  id: string,
  input: TrainingInput,
): Promise<Training | null> {
  await delay();
  const index = trainings.findIndex((item) => item.id === id);
  if (index < 0) return null;
  trainings[index] = {
    ...trainings[index],
    trainingId: input.trainingId.trim(),
    name: input.name.trim(),
    status: input.status,
  };
  return trainings[index];
}

export async function deleteTraining(id: string): Promise<boolean> {
  await delay();
  const before = trainings.length;
  trainings = trainings.filter((item) => item.id !== id);
  return trainings.length < before;
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
