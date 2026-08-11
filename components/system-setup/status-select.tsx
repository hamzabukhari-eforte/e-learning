"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { EntityStatus } from "@/data/system-setup/types";

type StatusSelectProps = {
  value: EntityStatus;
  onChange: (value: EntityStatus) => void;
  id?: string;
};

export function StatusSelect({
  value,
  onChange,
  id = "status",
}: StatusSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Status</Label>
      <Select
        value={value}
        onValueChange={(next) => onChange(next as EntityStatus)}
      >
        <SelectTrigger id={id} aria-label="Status">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
