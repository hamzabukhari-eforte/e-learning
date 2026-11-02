"use client";

import { Pagination } from "@/components/shared/pagination";
import { SearchField } from "@/components/shared/search-field";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PLATFORM_USER_ROLE_LABEL,
  PLATFORM_USER_STATUS_LABEL,
  type PlatformUser,
} from "@/data/users/types";
import { formatDate } from "@/lib/datetime";

type UserTableProps = {
  rows: PlatformUser[];
  search: string;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onEdit: (row: PlatformUser) => void;
  onDelete: (row: PlatformUser) => void;
};

export function UserTable({
  rows,
  search,
  page,
  pageSize,
  total,
  totalPages,
  onSearchChange,
  onPageChange,
  onEdit,
  onDelete,
}: UserTableProps) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3">
        <SearchField
          value={search}
          onChange={onSearchChange}
          placeholder="Search users..."
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
            <TableHead>Serial #</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Login ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="py-8 text-center text-zinc-500">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.loginId}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{PLATFORM_USER_ROLE_LABEL[row.role]}</TableCell>
                <TableCell>{PLATFORM_USER_STATUS_LABEL[row.status]}</TableCell>
                <TableCell>{formatDate(row.createdAt)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(row)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(row)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Pagination
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </>
  );
}
