import {
  matchesSearch,
  paginateItems,
  type Department,
  type EntityStatus,
  type PaginatedResult,
} from "@/data/system-setup/types";

let departments: Department[] = [
  { id: "1", name: "Human Resources", status: "active" },
  { id: "2", name: "Information Technology", status: "active" },
  { id: "3", name: "Finance", status: "active" },
  { id: "4", name: "Operations", status: "inactive" },
  { id: "5", name: "Training & Development", status: "active" },
  { id: "6", name: "Quality Assurance", status: "active" },
];

export type DepartmentInput = {
  name: string;
  status: EntityStatus;
};

export async function listDepartments(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<Department>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = departments.filter((item) =>
    matchesSearch(item.name, search),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function listDepartmentOptions() {
  const result = await listDepartments({ page: 1, pageSize: 1000 });
  return result.items
    .filter((item) => item.status === "active")
    .map((item) => ({ id: item.id, label: item.name }));
}

export async function createDepartment(
  input: DepartmentInput,
): Promise<Department> {
  await delay();
  const department: Department = {
    id: String(Date.now()),
    name: input.name.trim(),
    status: input.status,
  };
  departments = [department, ...departments];
  return department;
}

export async function updateDepartment(
  id: string,
  input: DepartmentInput,
): Promise<Department | null> {
  await delay();
  const index = departments.findIndex((item) => item.id === id);
  if (index < 0) return null;
  departments[index] = {
    ...departments[index],
    name: input.name.trim(),
    status: input.status,
  };
  return departments[index];
}

export async function deleteDepartment(id: string): Promise<boolean> {
  await delay();
  const before = departments.length;
  departments = departments.filter((item) => item.id !== id);
  return departments.length < before;
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
