"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { SearchableMultiSelect } from "@/components/registration/searchable-multi-select";
import { SearchableSelect } from "@/components/registration/searchable-select";
import { DateTimeField } from "@/components/survey/send-form/datetime-field";
import { FormTypeSelect } from "@/components/survey/send-form/form-type-select";
import type { SelectOption } from "@/data/registration/types";
import type { SendFormInput, SentFormType } from "@/data/survey/types";

type SendFormFieldsProps = {
  values: SendFormInput;
  employees: SelectOption[];
  forms: SelectOption[];
  pending?: boolean;
  error?: string | null;
  onChange: (values: SendFormInput) => void;
  onSubmit: () => void;
};

export function SendFormFields({
  values,
  employees,
  forms,
  pending,
  error,
  onChange,
  onSubmit,
}: SendFormFieldsProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-3" onSubmit={handleSubmit}>
      <SearchableMultiSelect
        id="send-employee"
        label="Select Employee"
        placeholder="Select employees"
        searchPlaceholder="Search employee..."
        values={values.employeeIds}
        options={employees}
        onChange={(employeeIds) => onChange({ ...values, employeeIds })}
        required
      />
      <SearchableSelect
        id="send-form"
        label="Select Form"
        placeholder="Select form"
        searchPlaceholder="Search form..."
        value={values.formId}
        options={forms}
        onChange={(formId) => onChange({ ...values, formId })}
        required
      />
      <FormTypeSelect
        value={values.formType}
        onChange={(formType: SentFormType) => onChange({ ...values, formType })}
      />
      <DateTimeField
        id="valid-from"
        label="Validity From"
        value={values.validFrom}
        onChange={(validFrom) => onChange({ ...values, validFrom })}
        required
      />
      <DateTimeField
        id="valid-to"
        label="Validity To"
        value={values.validTo}
        minValue={values.validFrom}
        onChange={(validTo) => onChange({ ...values, validTo })}
        required
      />
      {error ? (
        <p className="text-sm text-red-600 md:col-span-3">{error}</p>
      ) : null}
      <div className="flex justify-end md:col-span-3">
        <Button type="submit" variant="solid" className="min-w-28" disabled={pending}>
          {pending ? "Sending..." : "Send"}
        </Button>
      </div>
    </form>
  );
}
