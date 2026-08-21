"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Modal } from "@/components/ui/modal";
import type { BindingReportRow } from "@/data/assign-training/binding-types";

type UnbindModalProps = {
  open: boolean;
  row: BindingReportRow;
  pending?: boolean;
  onClose: () => void;
  onConfirm: (subTrainingIds: string[]) => void;
};

export function UnbindModal({
  open,
  row,
  pending,
  onClose,
  onConfirm,
}: UnbindModalProps) {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(id: string) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <Modal
      open={open}
      title="Unbind Sub-Trainings"
      onClose={onClose}
      size="md"
    >
      <div className="space-y-4">
        <p className="text-sm text-zinc-600">
          Select sub-trainings to unbind from{" "}
          <span className="font-medium text-black">{row.trainingName}</span>{" "}
          ({row.departmentName} / {row.designationName}).
        </p>
        <ul className="divide-y divide-zinc-200 rounded-md border border-zinc-200">
          {row.subTrainings.map((sub) => {
            const checked = selected.includes(sub.id);
            return (
              <li key={sub.id}>
                <label className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-zinc-50">
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => toggle(sub.id)}
                    aria-label={`Unbind ${sub.name}`}
                  />
                  <span className="text-sm text-black">{sub.name}</span>
                </label>
              </li>
            );
          })}
        </ul>
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="min-w-28"
            onClick={onClose}
            disabled={pending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="min-w-28 bg-red-600 hover:bg-red-700"
            disabled={pending || selected.length === 0}
            onClick={() => onConfirm(selected)}
          >
            {pending ? "Unbinding..." : "Unbind"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
