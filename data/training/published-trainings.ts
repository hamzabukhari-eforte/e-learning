import { EMPLOYEE_SEED } from "@/data/registration/employee-seed";
import { employeeFullName } from "@/data/registration/types";
import { listSubTrainings } from "@/data/system-setup/sub-trainings";
import {
  matchesSearch,
  paginateItems,
  type EntityStatus,
  type PaginatedResult,
} from "@/data/system-setup/types";
import { listTrainings } from "@/data/system-setup/trainings";
import type {
  AssignPurpose,
  PublishedEmployee,
  PublishedTraining,
  PublishTrainingInput,
} from "@/data/training/publish-types";
import { toEndOfDayIso, toIso, toStartOfDayIso } from "@/lib/datetime";

let published: PublishedTraining[] = [
  {
    id: "pt1",
    trainingId: "1",
    trainingName: "Safety Orientation",
    subTrainingId: "s1",
    subTrainingName: "Workplace Hazards",
    validityFrom: "2026-06-01T00:00:00.000Z",
    validityTo: "2026-06-30T23:59:59.999Z",
    employeeCount: 3,
    purpose: "training",
    assignedAt: "2026-05-15T16:54:22.000Z",
    status: "active",
    employees: buildEmployees(3, 0),
  },
  {
    id: "pt2",
    trainingId: "2",
    trainingName: "Fire Fighting",
    subTrainingId: "s4",
    subTrainingName: "Extinguisher Types",
    validityFrom: "2026-07-01T00:00:00.000Z",
    validityTo: "2026-07-31T23:59:59.999Z",
    employeeCount: 2,
    purpose: "quiz",
    assignedAt: "2026-05-20T10:30:00.000Z",
    status: "inactive",
    employees: buildEmployees(2, 3),
  },
];

export async function listPublishedTrainings(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<PublishedTraining>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = published.filter(
    (item) =>
      matchesSearch(item.trainingName, search) ||
      matchesSearch(item.subTrainingName, search),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function getPublishedTraining(id: string) {
  await delay();
  return published.find((item) => item.id === id) ?? null;
}

export async function createPublishedTraining(
  input: PublishTrainingInput,
): Promise<PublishedTraining> {
  await delay();
  const titles = await resolveTitles(input);
  const count = Number(input.employeeCount);
  const item: PublishedTraining = {
    id: `pt${Date.now()}`,
    trainingId: input.trainingId,
    trainingName: titles.trainingName,
    subTrainingId: input.subTrainingId,
    subTrainingName: titles.subTrainingName,
    validityFrom: toStartOfDayIso(new Date(input.validityFrom)),
    validityTo: toEndOfDayIso(new Date(input.validityTo)),
    employeeCount: count,
    purpose: input.purpose as AssignPurpose,
    assignedAt: toIso(new Date()),
    status: "active",
    employees: buildEmployees(count, published.length * 2),
  };
  published = [item, ...published];
  return item;
}

export async function togglePublishedTrainingStatus(
  id: string,
): Promise<PublishedTraining | null> {
  await delay();
  const index = published.findIndex((item) => item.id === id);
  if (index < 0) return null;
  published[index] = {
    ...published[index],
    status: published[index].status === "active" ? "inactive" : "active",
  };
  return published[index];
}

export async function updatePublishedEmployeeStatus(
  publishId: string,
  employeeId: string,
  status: EntityStatus,
): Promise<PublishedTraining | null> {
  await delay();
  const index = published.findIndex((item) => item.id === publishId);
  if (index < 0) return null;
  published[index] = {
    ...published[index],
    employees: published[index].employees.map((employee) =>
      employee.id === employeeId ? { ...employee, status } : employee,
    ),
  };
  return published[index];
}

function buildEmployees(count: number, offset: number): PublishedEmployee[] {
  return EMPLOYEE_SEED.slice(offset, offset + count).map((employee) => ({
    id: employee.id,
    employeeNo: employee.employeeNo,
    name: employeeFullName(employee),
    department: employee.departmentName,
    designation: employee.designationName,
    email: employee.email,
    status: employee.status,
  }));
}

async function resolveTitles(input: PublishTrainingInput) {
  const [trainings, subTrainings] = await Promise.all([
    listTrainings({ page: 1, pageSize: 1000 }),
    listSubTrainings({ page: 1, pageSize: 1000, trainingId: input.trainingId }),
  ]);
  return {
    trainingName:
      trainings.items.find((item) => item.id === input.trainingId)?.name ?? "",
    subTrainingName:
      subTrainings.items.find((item) => item.id === input.subTrainingId)?.name ??
      "",
  };
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
