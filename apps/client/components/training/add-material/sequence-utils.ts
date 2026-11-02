import type { MaterialSlide } from "@/data/training/types";

export function reorderSlideSequence(
  slides: MaterialSlide[],
  slideId: string,
  newSequence: number,
): MaterialSlide[] {
  const updated = slides.map((slide) => ({ ...slide }));
  const current = updated.find((slide) => slide.id === slideId);
  if (!current) return slides;

  const other = updated.find(
    (slide) => slide.id !== slideId && slide.sequence === newSequence,
  );
  if (other) other.sequence = current.sequence;
  current.sequence = newSequence;

  return updated.sort((a, b) => a.sequence - b.sequence);
}
