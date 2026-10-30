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
import type { GroupChat } from "@/data/group-chat/types";

type SentListModalProps = {
  open: boolean;
  chat: GroupChat | null;
  onClose: () => void;
};

export function SentListModal({ open, chat, onClose }: SentListModalProps) {
  const members = chat?.members ?? [];

  return (
    <Modal
      open={open}
      title={chat ? `Sent List — ${chat.title}` : "Sent List"}
      onClose={onClose}
      size="md"
    >
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
              {["Serial #", "Employee Number", "Employee Name"].map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="py-8 text-center text-zinc-500">
                  No employees found.
                </TableCell>
              </TableRow>
            ) : (
              members.map((member, index) => (
                <TableRow key={member.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{member.employeeNo}</TableCell>
                  <TableCell>{member.name}</TableCell>
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
