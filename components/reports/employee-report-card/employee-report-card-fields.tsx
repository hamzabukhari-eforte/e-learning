"use client";

import type { FormEvent } from "react";
import { SearchableSelect } from "@/components/registration/searchable-select";
import { Button } from "@/components/ui/button";
import type { SelectOption } from "@/data/registration/types";

type EmployeeReportCardFieldsProps = {
  employeeId: string;
  employees: SelectOption[];
  pending?: boolean;
  error?: string | null;
  onChange: (employeeId: string) => void;
  onSubmit: () => void;
};

export function EmployeeReportCardFields({
  employeeId,
  employees,
  pending,
  error,
  onChange,
  onSubmit,
}: EmployeeReportCardFieldsProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <SearchableSelect
        id="report-card-employee"
        label="Select Employee"
        placeholder="Select employee"
        searchPlaceholder="Search employee..."
        value={employeeId}
        options={employees}
        onChange={onChange}
        required
      />
      <div className="flex items-end justify-end">
        <div className="flex w-full flex-col items-end gap-2">
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" className="min-w-36" disabled={pending}>
            {pending ? "Loading..." : "Show Report"}
          </Button>
        </div>
      </div>
    </form>
  );
}
