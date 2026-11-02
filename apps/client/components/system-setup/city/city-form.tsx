"use client";

import type { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusSelect } from "@/components/system-setup/status-select";
import { FormActions } from "@/components/system-setup/form-actions";
import type { Country, EntityStatus } from "@/data/system-setup/types";

export type CityFormValues = {
  countryId: string;
  name: string;
  status: EntityStatus;
};

type CityFormProps = {
  values: CityFormValues;
  countries: Country[];
  onChange: (values: CityFormValues) => void;
  isEditing: boolean;
  pending?: boolean;
  onSubmit: () => void;
  onCancel: () => void;
};

export function CityForm({
  values,
  countries,
  onChange,
  isEditing,
  pending,
  onSubmit,
  onCancel,
}: CityFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="grid gap-4 md:grid-cols-3" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="city-country">Select Country</Label>
        <Select
          value={values.countryId || undefined}
          onValueChange={(countryId) => onChange({ ...values, countryId })}
        >
          <SelectTrigger id="city-country" aria-label="Select Country">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.id} value={country.id}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="city-name">City Name</Label>
        <Input
          id="city-name"
          value={values.name}
          onChange={(event) =>
            onChange({ ...values, name: event.target.value })
          }
          placeholder="Enter city name"
          required
        />
      </div>
      <StatusSelect
        value={values.status}
        onChange={(status) => onChange({ ...values, status })}
      />
      <div className="md:col-span-3">
        <FormActions
          isEditing={isEditing}
          pending={pending}
          onCancel={onCancel}
        />
      </div>
    </form>
  );
}
