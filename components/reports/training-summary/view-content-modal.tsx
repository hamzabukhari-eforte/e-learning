"use client";

import { useEffect, useState } from "react";
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
import type { TrainingSummarySlide } from "@/data/reports/training-summary-types";

type ViewContentModalProps = {
  open: boolean;
  title: string;
  slides: TrainingSummarySlide[];
  onClose: () => void;
};

export function ViewContentModal({
  open,
  title,
  slides,
  onClose,
}: ViewContentModalProps) {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!open) setPreviewIndex(null);
  }, [open]);

  useEffect(() => {
    if (previewIndex === null) return;
    if (previewIndex >= slides.length) setPreviewIndex(null);
  }, [previewIndex, slides.length]);

  const current =
    previewIndex !== null ? (slides[previewIndex] ?? null) : null;
  const hasPrev = previewIndex !== null && previewIndex > 0;
  const hasNext =
    previewIndex !== null && previewIndex < slides.length - 1;

  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      size={current ? "xl" : "md"}
    >
      {current ? (
        <div className="flex min-h-[75vh] flex-col gap-4">
          <div className="flex min-h-[65vh] flex-1 items-center justify-center rounded-md bg-black p-8 text-center text-white">
            <div className="space-y-2">
              <p className="text-sm text-zinc-300">Content preview</p>
              <p className="text-lg font-medium">{current.title}</p>
              <p className="text-base text-zinc-200">{current.fileName}</p>
              <p className="text-sm text-zinc-400">
                Slide {current.sequence} of {slides.length}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPreviewIndex(null)}
            >
              Back to list
            </Button>
            {hasPrev ? (
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setPreviewIndex((index) =>
                    index === null ? null : Math.max(0, index - 1),
                  )
                }
              >
                Previous
              </Button>
            ) : null}
            {hasNext ? (
              <Button
                type="button"
                className="bg-[#FFA901] text-white hover:bg-[#e69801]"
                onClick={() =>
                  setPreviewIndex((index) =>
                    index === null
                      ? null
                      : Math.min(slides.length - 1, index + 1),
                  )
                }
              >
                Next
              </Button>
            ) : null}
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
                {["Serial #", "Title", "File"].map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {slides.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="py-8 text-center text-zinc-500"
                  >
                    No content available.
                  </TableCell>
                </TableRow>
              ) : (
                slides.map((slide, index) => (
                  <TableRow key={slide.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{slide.title}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <button
                        type="button"
                        className="cursor-pointer text-left text-[#042954] underline underline-offset-2 hover:text-[#FFA901]"
                        onClick={() => setPreviewIndex(index)}
                      >
                        {slide.fileName}
                      </button>
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
      )}
    </Modal>
  );
}
