import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
} from "@/data/system-setup/types";
import { listSubTrainings } from "@/data/system-setup/sub-trainings";
import { listTrainings } from "@/data/system-setup/trainings";
import type {
  MaterialSlide,
  MaterialType,
  TrainingMaterial,
  TrainingMaterialInput,
} from "@/data/training/types";

let materials: TrainingMaterial[] = [
  {
    id: "m1",
    trainingId: "1",
    trainingTitle: "Safety Orientation",
    subTrainingId: "s1",
    subTrainingTitle: "Workplace Hazards",
    materialType: "presentation",
    slides: [
      {
        id: "sl1",
        fileName: "How to start your day.",
        date: "15-05-2026 16:54:22",
        sequence: 1,
        minutes: "00",
        seconds: "00",
      },
      {
        id: "sl2",
        fileName: "Hazard identification basics.",
        date: "15-05-2026 16:55:10",
        sequence: 2,
        minutes: "01",
        seconds: "30",
      },
      {
        id: "sl3",
        fileName: "Reporting unsafe conditions.",
        date: "15-05-2026 16:56:05",
        sequence: 3,
        minutes: "02",
        seconds: "15",
      },
    ],
  },
  {
    id: "m2",
    trainingId: "2",
    trainingTitle: "Fire Fighting",
    subTrainingId: "s4",
    subTrainingTitle: "Extinguisher Types",
    materialType: "video",
    slides: [
      {
        id: "sl4",
        fileName: "Fire extinguisher demo.mp4",
        date: "10-06-2026 09:12:00",
        sequence: 1,
        minutes: "05",
        seconds: "00",
      },
    ],
  },
  {
    id: "m3",
    trainingId: "3",
    trainingTitle: "First Aid Basics",
    subTrainingId: "s6",
    subTrainingTitle: "CPR",
    materialType: "mcqs",
    slides: [
      {
        id: "sl5",
        fileName: "CPR knowledge check — set 1",
        date: "20-06-2026 11:00:00",
        sequence: 1,
        minutes: "03",
        seconds: "00",
      },
      {
        id: "sl6",
        fileName: "CPR knowledge check — set 2",
        date: "20-06-2026 11:05:00",
        sequence: 2,
        minutes: "03",
        seconds: "00",
      },
    ],
  },
];

export async function listTrainingMaterials(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<TrainingMaterial>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = materials.filter(
    (item) =>
      matchesSearch(item.trainingTitle, search) ||
      matchesSearch(item.subTrainingTitle, search),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function getTrainingMaterial(id: string) {
  await delay();
  return materials.find((item) => item.id === id) ?? null;
}

export async function createTrainingMaterial(
  input: TrainingMaterialInput,
): Promise<TrainingMaterial> {
  await delay();
  const { trainingTitle, subTrainingTitle } = await resolveTitles(input);
  const item: TrainingMaterial = {
    id: `m${Date.now()}`,
    trainingId: input.trainingId,
    trainingTitle,
    subTrainingId: input.subTrainingId,
    subTrainingTitle,
    materialType: input.materialType,
    slides: createDefaultSlides(input.materialType),
  };
  materials = [item, ...materials];
  return item;
}

export async function deleteTrainingMaterial(id: string): Promise<boolean> {
  await delay();
  const before = materials.length;
  materials = materials.filter((item) => item.id !== id);
  return materials.length < before;
}

export async function updateMaterialSlides(
  id: string,
  slides: MaterialSlide[],
): Promise<TrainingMaterial | null> {
  await delay();
  const index = materials.findIndex((item) => item.id === id);
  if (index < 0) return null;
  materials[index] = { ...materials[index], slides };
  return materials[index];
}

async function resolveTitles(input: TrainingMaterialInput) {
  const [trainings, subTrainings] = await Promise.all([
    listTrainings({ page: 1, pageSize: 1000 }),
    listSubTrainings({ page: 1, pageSize: 1000, trainingId: input.trainingId }),
  ]);
  return {
    trainingTitle:
      trainings.items.find((item) => item.id === input.trainingId)?.name ?? "",
    subTrainingTitle:
      subTrainings.items.find((item) => item.id === input.subTrainingId)?.name ??
      "",
  };
}

function createDefaultSlides(materialType: MaterialType): MaterialSlide[] {
  const date = formatNow();
  const base = Date.now();
  const templates: Record<MaterialType, string[]> = {
    video: ["Training video.mp4"],
    presentation: [
      "How to start your day.",
      "Key learning objectives.",
      "Summary and next steps.",
    ],
    mcqs: ["Assessment — question set 1", "Assessment — question set 2"],
    youtube: ["Youtube training link"],
  };
  return templates[materialType].map((fileName, index) => ({
    id: `sl-${base}-${index + 1}`,
    fileName,
    date,
    sequence: index + 1,
    minutes: "00",
    seconds: "00",
  }));
}

function formatNow() {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
