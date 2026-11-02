export type MaterialType = "video" | "presentation" | "mcqs" | "youtube";

export type MaterialSlide = {
  id: string;
  fileName: string;
  date: string;
  sequence: number;
  minutes: string;
  seconds: string;
};

export type TrainingMaterial = {
  id: string;
  trainingId: string;
  trainingTitle: string;
  subTrainingId: string;
  subTrainingTitle: string;
  materialType: MaterialType;
  slides: MaterialSlide[];
};

export type TrainingMaterialInput = {
  trainingId: string;
  subTrainingId: string;
  materialType: MaterialType;
};

export const MATERIAL_TYPE_OPTIONS: {
  value: MaterialType;
  label: string;
}[] = [
  { value: "video", label: "Video" },
  { value: "presentation", label: "Presentation" },
  { value: "mcqs", label: "MCQs" },
  { value: "youtube", label: "Youtube Video URL" },
];

export function materialTypeLabel(type: MaterialType) {
  return MATERIAL_TYPE_OPTIONS.find((item) => item.value === type)?.label ?? type;
}
