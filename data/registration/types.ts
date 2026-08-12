export type Gender = "male" | "female";
export type EmployeeStatus = "active" | "inactive";
export type TrainerType = "master" | "departmental";
export type TrainerStatus = "active" | "inactive";

export type Trainer = {
  id: string;
  employeeId: string;
  employeeName: string;
  trainerType: TrainerType;
  status: TrainerStatus;
};

export type TrainerInput = {
  employeeId: string;
  trainerType: TrainerType | "";
  status: TrainerStatus;
};

export type EmployeeRegistrationInput = {
  firstName: string;
  middleName: string;
  lastName: string;
  loginId: string;
  password: string;
  employeeNo: string;
  contactNumber: string;
  email: string;
  departmentId: string;
  designationId: string;
  hodId: string;
  countryId: string;
  cityId: string;
  gender: Gender;
  status: EmployeeStatus;
  profileImageName?: string;
  documentNames?: string[];
};

export type SelectOption = {
  id: string;
  label: string;
  countryId?: string;
};

export type RegistrationResult =
  | { ok: true }
  | { ok: false; message: string };
