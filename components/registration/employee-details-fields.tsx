"use client";

import { TextField } from "@/components/registration/text-field";
import { OptionSelect } from "@/components/registration/option-select";
import { RadioGroup } from "@/components/ui/radio-group";
import type {
  EmployeeRegistrationInput,
  SelectOption,
} from "@/data/registration/employee";

type EmployeeDetailsFieldsProps = {
  values: EmployeeRegistrationInput;
  onChange: (values: EmployeeRegistrationInput) => void;
  departments: SelectOption[];
  designations: SelectOption[];
  hods: SelectOption[];
  countries: SelectOption[];
  cities: SelectOption[];
};

export function EmployeeDetailsFields({
  values,
  onChange,
  departments,
  designations,
  hods,
  countries,
  cities,
}: EmployeeDetailsFieldsProps) {
  function set<K extends keyof EmployeeRegistrationInput>(
    key: K,
    value: EmployeeRegistrationInput[K],
  ) {
    onChange({ ...values, [key]: value });
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <TextField id="first-name" label="First Name" value={values.firstName} onChange={(v) => set("firstName", v)} placeholder="Enter first name" required />
      <TextField id="middle-name" label="Middle Name" value={values.middleName} onChange={(v) => set("middleName", v)} placeholder="Enter middle name" />
      <TextField id="last-name" label="Last Name" value={values.lastName} onChange={(v) => set("lastName", v)} placeholder="Enter last name" required />
      <TextField id="login-id" label="Employee Login Id" value={values.loginId} onChange={(v) => set("loginId", v)} placeholder="Enter login ID" required />
      <TextField id="password" label="Password" type="password" value={values.password} onChange={(v) => set("password", v)} placeholder="Enter password" required />
      <TextField id="employee-no" label="Employee No#" value={values.employeeNo} onChange={(v) => set("employeeNo", v)} placeholder="Enter employee number" required />
      <TextField id="contact" label="Contact Number (without - )" value={values.contactNumber} onChange={(v) => set("contactNumber", v)} placeholder="Enter contact number" required />
      <TextField id="email" label="Email Address" type="email" value={values.email} onChange={(v) => set("email", v)} placeholder="Enter email address" required />
      <OptionSelect id="department" label="Department" placeholder="Select Department" value={values.departmentId} options={departments} onChange={(v) => set("departmentId", v)} />
      <OptionSelect id="designation" label="Designation" placeholder="Select Designation" value={values.designationId} options={designations} onChange={(v) => set("designationId", v)} />
      <OptionSelect id="hod" label="HOD" placeholder="Select HOD" value={values.hodId} options={hods} onChange={(v) => set("hodId", v)} />
      <OptionSelect id="country" label="Country" placeholder="Select Country" value={values.countryId} options={countries} onChange={(v) => onChange({ ...values, countryId: v, cityId: "" })} />
      <OptionSelect id="city" label="City" placeholder="Select City" value={values.cityId} options={cities} onChange={(v) => set("cityId", v)} disabled={!values.countryId} />
      <RadioGroup name="gender" label="Gender" value={values.gender} onChange={(v) => set("gender", v)} options={[{ value: "male", label: "Male" }, { value: "female", label: "Female" }]} />
      <RadioGroup name="status" label="Status" value={values.status} onChange={(v) => set("status", v)} options={[{ value: "active", label: "Active" }, { value: "inactive", label: "InActive" }]} />
    </div>
  );
}
