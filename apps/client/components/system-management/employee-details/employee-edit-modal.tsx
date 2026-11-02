"use client";

import { useMemo, useState, type FormEvent } from "react";
import { EmployeeDetailsFields } from "@/components/registration/employee-details-fields";
import { EmployeeDocumentsSection } from "@/components/registration/employee-documents-section";
import { useEmployeeFormOptions } from "@/components/registration/use-employee-form-options";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type {
  Employee,
  EmployeeRegistrationInput,
} from "@/data/registration/types";

type EmployeeEditModalProps = {
  open: boolean;
  employee: Employee;
  pending?: boolean;
  onClose: () => void;
  onSave: (values: EmployeeRegistrationInput) => void;
};

function toFormValues(employee: Employee): EmployeeRegistrationInput {
  return {
    firstName: employee.firstName,
    middleName: employee.middleName,
    lastName: employee.lastName,
    loginId: employee.loginId,
    password: "",
    employeeNo: employee.employeeNo,
    contactNumber: employee.contactNumber,
    email: employee.email,
    departmentId: employee.departmentId,
    designationId: employee.designationId,
    hodId: employee.hodId,
    countryId: employee.countryId,
    cityId: employee.cityId,
    gender: employee.gender,
    status: employee.status,
    profileImageName: employee.profileImageName,
    documentNames: employee.documentNames,
  };
}

export function EmployeeEditModal({
  open,
  employee,
  pending,
  onClose,
  onSave,
}: EmployeeEditModalProps) {
  const options = useEmployeeFormOptions();
  const [values, setValues] = useState(() => toFormValues(employee));
  const [documentNames, setDocumentNames] = useState(employee.documentNames);

  const cities = useMemo(
    () => options.cities.filter((city) => city.countryId === values.countryId),
    [options.cities, values.countryId],
  );

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSave({ ...values, documentNames });
  }

  return (
    <Modal open={open} title="Edit Employee Details" onClose={onClose}>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <EmployeeDetailsFields
          values={values}
          onChange={setValues}
          departments={options.departments}
          designations={options.designations}
          hods={options.hods}
          countries={options.countries}
          cities={cities}
          requirePassword={false}
        />
        <EmployeeDocumentsSection
          fileNames={documentNames}
          onChange={(files) =>
            setDocumentNames(files ? Array.from(files).map((f) => f.name) : [])
          }
        />
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" className="min-w-28" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="min-w-28" disabled={pending}>
            {pending ? "Saving..." : "Update"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
