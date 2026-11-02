"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PageNumbersProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function getVisiblePages(
  current: number,
  total: number,
): Array<number | "ellipsis"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const pages: Array<number | "ellipsis"> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) pages.push("ellipsis");
  for (let value = start; value <= end; value += 1) pages.push(value);
  if (end < total - 1) pages.push("ellipsis");
  pages.push(total);

  return pages;
}

export function PageNumbers({
  page,
  totalPages,
  onPageChange,
}: PageNumbersProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-1">
      {getVisiblePages(page, totalPages).map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="px-1 text-sm text-zinc-400"
          >
            …
          </span>
        ) : (
          <Button
            key={item}
            type="button"
            variant={item === page ? "solid" : "outline"}
            className={cn("min-w-10 px-0", item === page && "pointer-events-none")}
            onClick={() => onPageChange(item)}
            aria-current={item === page ? "page" : undefined}
          >
            {item}
          </Button>
        ),
      )}
    </div>
  );
}
