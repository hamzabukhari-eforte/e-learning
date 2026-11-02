import type {
  EmployeeRegistrationInput,
  RegistrationResult,
  SelectOption,
} from "@/data/registration/types";

const HODS: SelectOption[] = [
  { id: "1", label: "Ahmed Khan" },
  { id: "2", label: "Sara Ali" },
  { id: "3", label: "Omar Siddiqui" },
];

export type {
  EmployeeRegistrationInput,
  RegistrationResult,
  SelectOption,
  Gender,
  EmployeeStatus,
} from "@/data/registration/types";

export async function getEmployeeFormOptions(): Promise<{
  departments: SelectOption[];
  designations: SelectOption[];
  hods: SelectOption[];
  countries: SelectOption[];
  cities: SelectOption[];
}> {
  const [
    { getAllCountries },
    { listDepartments },
    { listDesignations },
    { listCities },
  ] = await Promise.all([
    import("@/data/system-setup/countries"),
    import("@/data/system-setup/departments"),
    import("@/data/system-setup/designations"),
    import("@/data/system-setup/cities"),
  ]);

  const [countries, departments, designations, cities] = await Promise.all([
    getAllCountries(),
    listDepartments({ page: 1, pageSize: 100 }),
    listDesignations({ page: 1, pageSize: 100 }),
    listCities({ page: 1, pageSize: 100 }),
  ]);

  return {
    departments: departments.items.map((item) => ({
      id: item.id,
      label: item.name,
    })),
    designations: designations.items.map((item) => ({
      id: item.id,
      label: item.name,
    })),
    hods: HODS,
    countries: countries.map((item) => ({ id: item.id, label: item.name })),
    cities: cities.items.map((item) => ({
      id: item.id,
      label: item.name,
      countryId: item.countryId,
    })),
  };
}

export async function saveEmployee(
  input: EmployeeRegistrationInput,
): Promise<RegistrationResult> {
  const requiredOk =
    input.firstName.trim() &&
    input.lastName.trim() &&
    input.loginId.trim() &&
    input.password.trim() &&
    input.employeeNo.trim() &&
    input.contactNumber.trim() &&
    input.email.trim() &&
    input.departmentId &&
    input.designationId &&
    input.hodId &&
    input.countryId &&
    input.cityId;

  if (!requiredOk) {
    return {
      ok: false,
      message: "All fields are compulsory except profile image and documents.",
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 400));
  console.info("[registration] save employee", input);
  return { ok: true };
}
