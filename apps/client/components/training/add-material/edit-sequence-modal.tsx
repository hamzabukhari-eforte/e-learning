"use client";

import { useEffect, useState } from "react";
import { ExportButtons } from "@/components/survey/export-buttons";
import { SEQUENCE_EXPORT_COLUMNS } from "@/components/training/add-material/sequence-export";
import { reorderSlideSequence } from "@/components/training/add-material/sequence-utils";
import { Button } from "@/components/ui/button";
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
import type { MaterialSlide, TrainingMaterial } from "@/data/training/types";

type EditSequenceModalProps = {
  open: boolean;
  material: TrainingMaterial | null;
  pending?: boolean;
  onClose: () => void;
  onSave: (slides: MaterialSlide[]) => void;
};

export function EditSequenceModal({
  open,
  material,
  pending,
  onClose,
  onSave,
}: EditSequenceModalProps) {
  const [slides, setSlides] = useState<MaterialSlide[]>([]);

  useEffect(() => {
    if (!open || !material) {
      setSlides([]);
      return;
    }
    setSlides(material.slides.map((slide) => ({ ...slide })));
  }, [open, material]);

  const maxSequence = slides.length;

  function handleSequenceChange(slideId: string, value: string) {
    const next = Number(value);
    setSlides((current) => reorderSlideSequence(current, slideId, next));
  }

  return (
    <Modal open={open} title="Edit Sequence" onClose={onClose}>
      <div className="space-y-4">
        <div className="flex flex-wrap justify-end">
          <ExportButtons
            title="Edit Sequence"
            filename="edit-sequence"
            columns={SEQUENCE_EXPORT_COLUMNS}
            getRows={async () => slides}
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-0 bg-[#042954] hover:bg-[#042954]">
              {["Sr.No", "File Name", "Date", "Slide Sequence", "Minutes", "Seconds"].map(
                (header) => (
                  <TableHead key={header}>{header}</TableHead>
                ),
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {slides.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-zinc-500">
                  No files found for this material.
                </TableCell>
              </TableRow>
            ) : (
              slides.map((slide, index) => (
                <TableRow key={slide.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{slide.fileName}</TableCell>
                  <TableCell className="whitespace-nowrap">{slide.date}</TableCell>
                  <TableCell>
                    <Select
                      value={String(slide.sequence)}
                      onValueChange={(value) => handleSequenceChange(slide.id, value)}
                    >
                      <SelectTrigger aria-label="Slide sequence" className="h-9 w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: maxSequence }, (_, i) => i + 1).map(
                          (option) => (
                            <SelectItem key={option} value={String(option)}>
                              {option}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{slide.minutes}</TableCell>
                  <TableCell>{slide.seconds}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            disabled={pending || !material}
            onClick={() => onSave(slides)}
          >
            {pending ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
