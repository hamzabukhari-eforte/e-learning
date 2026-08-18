"use client";

import { SearchableSelect } from "@/components/registration/searchable-select";
import type { SelectOption } from "@/data/registration/types";

type BindingFieldsProps = {
  departmentId: string;
  designationId: string;
  departments: SelectOption[];
  designations: SelectOption[];
  onDepartmentChange: (id: string) => void;
  onDesignationChange: (id: string) => void;
};

export function BindingFields({
  departmentId,
  designationId,
  departments,
  designations,
  onDepartmentChange,
  onDesignationChange,
}: BindingFieldsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <SearchableSelect
        id="bind-department"
        label="Select Department"
        placeholder="Select department"
        searchPlaceholder="Search department..."
        value={departmentId}
        options={departments}
        onChange={onDepartmentChange}
        required
      />
      <SearchableSelect
        id="bind-designation"
        label="Select Designation"
        placeholder="Select designation"
        searchPlaceholder="Search designation..."
        value={designationId}
        options={designations}
        onChange={onDesignationChange}
        required
      />
    </div>
  );
}
