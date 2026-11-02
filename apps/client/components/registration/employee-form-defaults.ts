import type { EmployeeRegistrationInput } from "@/data/registration/employee";

export const EMPTY_EMPLOYEE_FORM: EmployeeRegistrationInput = {
  firstName: "",
  middleName: "",
  lastName: "",
  loginId: "",
  password: "",
  employeeNo: "",
  contactNumber: "",
  email: "",
  departmentId: "",
  designationId: "",
  hodId: "",
  countryId: "",
  cityId: "",
  gender: "male",
  status: "active",
};
