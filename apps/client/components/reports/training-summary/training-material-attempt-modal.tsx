"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { MaterialAttemptRow } from "@/data/reports/training-summary-types";

type TrainingMaterialAttemptModalProps = {
  open: boolean;
  employeeName: string;
  materials: MaterialAttemptRow[];
  onClose: () => void;
  onViewMaterialAttempts: (material: MaterialAttemptRow) => void;
};

export function TrainingMaterialAttemptModal({
  open,
  employeeName,
  materials,
  onClose,
  onViewMaterialAttempts,
}: TrainingMaterialAttemptModalProps) {
  return (
    <Modal
      open={open}
      title={`Training Material Attempt Detail${employeeName ? ` — ${employeeName}` : ""}`}
      onClose={onClose}
      size="lg"
      zIndex={60}
    >
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
              {["Sr.No", "Name", "Material Type", "Attempt No.", "Action"].map(
                (header) => (
                  <TableHead key={header}>{header}</TableHead>
                ),
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {materials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-zinc-500">
                  No material attempts found.
                </TableCell>
              </TableRow>
            ) : (
              materials.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={index % 2 === 1 ? "bg-zinc-50" : undefined}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="whitespace-nowrap">{row.name}</TableCell>
                  <TableCell>{row.materialType}</TableCell>
                  <TableCell>{row.attemptNo}</TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-9"
                      onClick={() => onViewMaterialAttempts(row)}
                    >
                      View attempt
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="flex justify-end">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
