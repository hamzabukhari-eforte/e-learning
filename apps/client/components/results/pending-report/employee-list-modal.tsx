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
import type { PendingResultEmployee } from "@/data/results/types";

type EmployeeListModalProps = {
  open: boolean;
  title: string;
  employees: PendingResultEmployee[];
  onClose: () => void;
};

export function EmployeeListModal({
  open,
  title,
  employees,
  onClose,
}: EmployeeListModalProps) {
  return (
    <Modal open={open} title={title} onClose={onClose} size="md">
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
              {["Serial #", "Employee name"].map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="py-8 text-center text-zinc-500">
                  No employees found.
                </TableCell>
              </TableRow>
            ) : (
              employees.map((employee, index) => (
                <TableRow key={employee.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{employee.name}</TableCell>
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
