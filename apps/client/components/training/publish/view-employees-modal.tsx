"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updatePublishedEmployeeStatus } from "@/data/training/published-trainings";
import type { EntityStatus } from "@/data/system-setup/types";
import type { PublishedEmployee, PublishedTraining } from "@/data/training/publish-types";

type ViewEmployeesModalProps = {
  open: boolean;
  publish: PublishedTraining | null;
  onClose: () => void;
  onUpdated: (publish: PublishedTraining) => void;
};

export function ViewEmployeesModal({
  open,
  publish,
  onClose,
  onUpdated,
}: ViewEmployeesModalProps) {
  const [employees, setEmployees] = useState<PublishedEmployee[]>([]);
  const [pendingId, setPendingId] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !publish) {
      setEmployees([]);
      return;
    }
    setEmployees(publish.employees.map((employee) => ({ ...employee })));
  }, [open, publish]);

  async function handleStatusChange(employeeId: string, status: EntityStatus) {
    if (!publish) return;
    setPendingId(employeeId);
    const updated = await updatePublishedEmployeeStatus(
      publish.id,
      employeeId,
      status,
    );
    setPendingId(null);
    if (!updated) return;
    setEmployees(updated.employees.map((employee) => ({ ...employee })));
    onUpdated(updated);
  }

  return (
    <Modal open={open} title="View Employees" onClose={onClose}>
      <Table>
        <TableHeader>
          <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
            {[
              "Serial #",
              "Employee No",
              "Name",
              "Department",
              "Designation",
              "Email",
              "Status",
            ].map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="py-8 text-center text-zinc-500">
                No employees assigned.
              </TableCell>
            </TableRow>
          ) : (
            employees.map((employee, index) => (
              <TableRow key={employee.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{employee.employeeNo}</TableCell>
                <TableCell className="whitespace-nowrap">{employee.name}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>
                  <Select
                    value={employee.status}
                    onValueChange={(status) =>
                      void handleStatusChange(employee.id, status as EntityStatus)
                    }
                    disabled={pendingId === employee.id}
                  >
                    <SelectTrigger
                      aria-label="Employee status"
                      className="h-9 w-28"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Modal>
  );
}
