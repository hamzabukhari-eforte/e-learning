import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";
import { EMPLOYEE_SEED } from "@/data/registration/employee-seed";
import {
  employeeFullName,
  type Employee,
  type EmployeeRegistrationInput,
} from "@/data/registration/types";

export type { Employee };

let employees: Employee[] = [...EMPLOYEE_SEED];

export async function listEmployees(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<Employee>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = employees.filter((item) => matchesEmployee(item, search));
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function updateEmployee(
  id: string,
  input: EmployeeRegistrationInput,
  labels: {
    departmentName: string;
    designationName: string;
    hodName: string;
  },
): Promise<Employee | null> {
  await delay();
  const index = employees.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const current = employees[index];
  employees[index] = {
    ...current,
    firstName: input.firstName,
    middleName: input.middleName,
    lastName: input.lastName,
    loginId: input.loginId,
    password: input.password.trim() ? input.password : current.password,
    employeeNo: input.employeeNo,
    contactNumber: input.contactNumber,
    email: input.email,
    departmentId: input.departmentId,
    departmentName: labels.departmentName,
    designationId: input.designationId,
    designationName: labels.designationName,
    hodId: input.hodId,
    hodName: labels.hodName,
    countryId: input.countryId,
    cityId: input.cityId,
    gender: input.gender,
    status: input.status,
    documentNames: input.documentNames ?? current.documentNames,
    profileImageName: input.profileImageName ?? current.profileImageName,
  };
  return employees[index];
}

export async function unregisterEmployee(id: string): Promise<boolean> {
  await delay();
  const before = employees.length;
  employees = employees.filter((item) => item.id !== id);
  return employees.length < before;
}

function matchesEmployee(item: Employee, search: string) {
  const haystack = [
    item.id,
    employeeFullName(item),
    item.employeeNo,
    item.email,
    item.contactNumber,
    item.departmentName,
    item.designationName,
    item.hodName,
    item.registrationDate,
    item.gender,
    item.status,
    item.documentNames.join(" "),
  ].join(" ");
  return matchesSearch(haystack, search);
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
