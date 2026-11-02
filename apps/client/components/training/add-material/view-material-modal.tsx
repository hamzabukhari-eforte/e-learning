"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import {
  materialTypeLabel,
  type TrainingMaterial,
} from "@/data/training/types";

type ViewMaterialModalProps = {
  open: boolean;
  material: TrainingMaterial | null;
  onClose: () => void;
};

export function ViewMaterialModal({
  open,
  material,
  onClose,
}: ViewMaterialModalProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (!open) setSlideIndex(0);
  }, [open]);

  useEffect(() => {
    if (!material) return;
    if (slideIndex >= material.slides.length) setSlideIndex(0);
  }, [material, slideIndex]);

  const slides = material?.slides ?? [];
  const current = slides[slideIndex];
  const hasNext = slideIndex < slides.length - 1;

  return (
    <Modal open={open} title="View Material" onClose={onClose} size="xl">
      <div className="flex min-h-[75vh] flex-col gap-4">
        {current ? (
          <>
            <div className="flex min-h-[65vh] flex-1 items-center justify-center rounded-md bg-black p-8 text-center text-white">
              <div className="space-y-2">
                <p className="text-sm text-zinc-300">
                  {material ? materialTypeLabel(material.materialType) : ""} preview
                </p>
                <p className="text-lg font-medium">{current.fileName}</p>
                <p className="text-sm text-zinc-400">
                  Slide {current.sequence} of {slides.length}
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              {hasNext ? (
                <Button
                  type="button"
                  className="bg-[#FFA901] text-white hover:bg-[#e69801]"
                  onClick={() => setSlideIndex((index) => index + 1)}
                >
                  Next
                </Button>
              ) : null}
              <Button type="button" variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </>
        ) : (
          <p className="py-8 text-center text-sm text-zinc-500">
            No material slides available to preview.
          </p>
        )}
      </div>
    </Modal>
  );
}
