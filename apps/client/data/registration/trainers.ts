import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";
import { TRAINER_SEED } from "@/data/registration/trainer-seed";
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

let trainers: Trainer[] = [...TRAINER_SEED];

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
      matchesSearch(item.id, search) ||
      matchesSearch(item.employeeName, search) ||
      matchesSearch(item.trainerType, search) ||
      matchesSearch(item.status, search),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function listTrainerOptions(): Promise<SelectOption[]> {
  const result = await listTrainers({ page: 1, pageSize: 1000 });
  return result.items
    .filter((item) => item.status === "active")
    .map((item) => ({ id: item.id, label: item.employeeName }));
}

export async function createTrainer(input: TrainerInput): Promise<Trainer | null> {
  await delay();
  if (!input.employeeId || !input.trainerType) return null;
  const employee = EMPLOYEES.find((item) => item.id === input.employeeId);
  if (!employee) return null;
  const trainer: Trainer = {
    id: nextTrainerId(),
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

function nextTrainerId() {
  const max = trainers.reduce((highest, item) => {
    const match = /^TR-(\d+)$/.exec(item.id);
    const value = match ? Number(match[1]) : 0;
    return value > highest ? value : highest;
  }, 0);
  return `TR-${String(max + 1).padStart(3, "0")}`;
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
