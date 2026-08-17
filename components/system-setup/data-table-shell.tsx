"use client";

import type { ReactNode } from "react";
import { SearchField } from "@/components/system-setup/search-field";
import { TablePagination } from "@/components/system-setup/table-pagination";
import type { PageSizeOption } from "@/components/system-setup/use-paged-list";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DataTableShellProps = {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  headers: string[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  toolbar?: ReactNode;
  pageSizeId?: string;
  children: ReactNode;
};

export function DataTableShell({
  search,
  onSearchChange,
  searchPlaceholder,
  headers,
  page,
  pageSize,
  totalPages,
  total,
  onPageChange,
  onPageSizeChange,
  toolbar,
  pageSizeId,
  children,
}: DataTableShellProps) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3">
        <SearchField
          value={search}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
        />
        {toolbar}
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </Table>
      <TablePagination
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        total={total}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        pageSizeId={pageSizeId}
      />
    </div>
  );
}
