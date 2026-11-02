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
import type { ImprovementPlan } from "@/data/improvement-plan/types";
import { formatDateTime } from "@/lib/datetime";

type ViewRespondModalProps = {
  open: boolean;
  plan: ImprovementPlan | null;
  onClose: () => void;
};

export function ViewRespondModal({
  open,
  plan,
  onClose,
}: ViewRespondModalProps) {
  const responses = plan?.responses ?? [];

  return (
    <Modal
      open={open}
      title={
        plan
          ? `View Respond — ${plan.subTrainingName}`
          : "View Respond"
      }
      onClose={onClose}
    >
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
              {[
                "Serial #",
                "Employee name",
                "Response",
                "Responded at",
              ].map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {responses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-zinc-500">
                  No responses yet.
                </TableCell>
              </TableRow>
            ) : (
              responses.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {item.employeeName}
                  </TableCell>
                  <TableCell className="max-w-md whitespace-pre-wrap">
                    {item.response}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatDateTime(item.respondedAt)}
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
