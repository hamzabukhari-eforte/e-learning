"use client";

import { ProfileImageUpload } from "@/components/registration/profile-image-upload";
import { EmployeeDetailsFields } from "@/components/registration/employee-details-fields";
import type {
  EmployeeRegistrationInput,
  SelectOption,
} from "@/data/registration/employee";

type EmployeeDetailsSectionProps = {
  values: EmployeeRegistrationInput;
  onChange: (values: EmployeeRegistrationInput) => void;
  previewUrl: string | null;
  profileFileName: string | null;
  onProfileChange: (file: File | null) => void;
  departments: SelectOption[];
  designations: SelectOption[];
  hods: SelectOption[];
  countries: SelectOption[];
  cities: SelectOption[];
};

export function EmployeeDetailsSection({
  values,
  onChange,
  previewUrl,
  profileFileName,
  onProfileChange,
  departments,
  designations,
  hods,
  countries,
  cities,
}: EmployeeDetailsSectionProps) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-[#042954]">Employee Details</h2>
        <p className="mt-1 text-sm text-zinc-500">
          All fields are compulsory except profile image and documents.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[10rem_1fr]">
        <ProfileImageUpload
          previewUrl={previewUrl}
          fileName={profileFileName}
          onChange={onProfileChange}
        />
        <EmployeeDetailsFields
          values={values}
          onChange={onChange}
          departments={departments}
          designations={designations}
          hods={hods}
          countries={countries}
          cities={cities}
        />
      </div>
    </section>
  );
}
