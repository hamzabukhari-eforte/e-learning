import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";
import type {
  SelectOption,
  Trainer,
  TrainerInput,
  TrainerStatus,
  TrainerType,
} from "@/data/registration/types";

export type { Trainer, TrainerInput, TrainerStatus, TrainerType };

const EMPLOYEES: SelectOption[] = [
  { id: "e1", label: "Ahmed Khan" },
  { id: "e2", label: "Sara Ali" },
  { id: "e3", label: "Omar Siddiqui" },
  { id: "e4", label: "Fatima Noor" },
  { id: "e5", label: "Hassan Raza" },
  { id: "e6", label: "Ayesha Malik" },
  { id: "e7", label: "Bilal Ahmed" },
  { id: "e8", label: "Zainab Hussain" },
];

let trainers: Trainer[] = [
  {
    id: "1",
    employeeId: "e1",
    employeeName: "Ahmed Khan",
    trainerType: "master",
    status: "active",
  },
  {
    id: "2",
    employeeId: "e2",
    employeeName: "Sara Ali",
    trainerType: "departmental",
    status: "active",
  },
  {
    id: "3",
    employeeId: "e4",
    employeeName: "Fatima Noor",
    trainerType: "departmental",
    status: "inactive",
  },
];

export async function listEmployeesForTrainer(): Promise<SelectOption[]> {
  await delay();
  return [...EMPLOYEES];
}

export async function listTrainers(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<Trainer>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = trainers.filter(
    (item) =>
      matchesSearch(item.employeeName, search) ||
      matchesSearch(item.trainerType, search) ||
      matchesSearch(item.status, search),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function createTrainer(input: TrainerInput): Promise<Trainer | null> {
  await delay();
  if (!input.employeeId || !input.trainerType) return null;
  const employee = EMPLOYEES.find((item) => item.id === input.employeeId);
  if (!employee) return null;
  const trainer: Trainer = {
    id: String(Date.now()),
    employeeId: input.employeeId,
    employeeName: employee.label,
    trainerType: input.trainerType,
    status: input.status,
  };
  trainers = [trainer, ...trainers];
  return trainer;
}

export async function updateTrainer(
  id: string,
  input: TrainerInput,
): Promise<Trainer | null> {
  await delay();
  if (!input.employeeId || !input.trainerType) return null;
  const index = trainers.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const employee = EMPLOYEES.find((item) => item.id === input.employeeId);
  if (!employee) return null;
  trainers[index] = {
    ...trainers[index],
    employeeId: input.employeeId,
    employeeName: employee.label,
    trainerType: input.trainerType,
    status: input.status,
  };
  return trainers[index];
}

export async function deleteTrainer(id: string): Promise<boolean> {
  await delay();
  const before = trainers.length;
  trainers = trainers.filter((item) => item.id !== id);
  return trainers.length < before;
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
