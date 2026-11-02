"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageNumbers } from "@/components/system-setup/page-numbers";
import {
  PAGE_SIZE_OPTIONS,
  type PageSizeOption,
} from "@/components/system-setup/use-paged-list";

type TablePaginationProps = {
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSizeOption) => void;
  pageSizeId?: string;
};

export function TablePagination({
  page,
  pageSize,
  totalPages,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeId = "page-size",
}: TablePaginationProps) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 px-4 py-3">
      <div className="flex flex-wrap items-center gap-4">
        <p className="text-sm text-zinc-600">
          Showing <span className="font-medium text-black">{from}</span>–
          <span className="font-medium text-black">{to}</span> of{" "}
          <span className="font-medium text-black">{total}</span>
        </p>
        <div className="flex items-center gap-2">
          <Label htmlFor={pageSizeId} className="whitespace-nowrap text-zinc-600">
            Rows per page
          </Label>
          <Select
            value={String(pageSize)}
            onValueChange={(value) =>
              onPageSizeChange(Number(value) as PageSizeOption)
            }
          >
            <SelectTrigger id={pageSizeId} className="h-10 w-[88px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="z-[80]">
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </Button>
        <PageNumbers
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
