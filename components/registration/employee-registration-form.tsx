"use client";

import { useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { EmployeeDetailsSection } from "@/components/registration/employee-details-section";
import { EmployeeDocumentsSection } from "@/components/registration/employee-documents-section";
import { EMPTY_EMPLOYEE_FORM } from "@/components/registration/employee-form-defaults";
import { useEmployeeFormOptions } from "@/components/registration/use-employee-form-options";
import { Button } from "@/components/ui/button";
import {
  saveEmployee,
  type EmployeeRegistrationInput,
} from "@/data/registration/employee";

export function EmployeeRegistrationForm() {
  const options = useEmployeeFormOptions();
  const [values, setValues] = useState<EmployeeRegistrationInput>(EMPTY_EMPLOYEE_FORM);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [profileFileName, setProfileFileName] = useState<string | null>(null);
  const [documentNames, setDocumentNames] = useState<string[]>([]);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filteredCities = useMemo(
    () => options.cities.filter((city) => city.countryId === values.countryId),
    [options.cities, values.countryId],
  );

  function handleProfileChange(file: File | null) {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
    setProfileFileName(file?.name ?? null);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    setMessage(null);
    const result = await saveEmployee({
      ...values,
      profileImageName: profileFileName ?? undefined,
      documentNames,
    });
    setPending(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setMessage("Employee registered successfully.");
    setValues(EMPTY_EMPLOYEE_FORM);
    handleProfileChange(null);
    setDocumentNames([]);
  }

  return (
    <motion.form
      className="space-y-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <EmployeeDetailsSection
        values={values}
        onChange={setValues}
        previewUrl={previewUrl}
        profileFileName={profileFileName}
        onProfileChange={handleProfileChange}
        departments={options.departments}
        designations={options.designations}
        hods={options.hods}
        countries={options.countries}
        cities={filteredCities}
      />
      <EmployeeDocumentsSection
        fileNames={documentNames}
        onChange={(files) =>
          setDocumentNames(files ? Array.from(files).map((f) => f.name) : [])
        }
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {message ? <p className="text-sm text-[#042954]">{message}</p> : null}
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="solid"
          className="min-w-28"
          disabled={pending}
        >
          {pending ? "Saving..." : "Save"}
        </Button>
      </div>
    </motion.form>
  );
}
