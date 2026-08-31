import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
  type SubTraining,
} from "@/data/system-setup/types";
import { listTrainings } from "@/data/system-setup/trainings";

let subTrainings: SubTraining[] = [
  {
    id: "s1",
    trainingId: "1",
    trainingName: "Safety Orientation",
    name: "Workplace Hazards",
    description: "Identify common workplace hazards and mitigation steps.",
    studyMaterialName: "workplace-hazards.pdf",
  },
  {
    id: "s2",
    trainingId: "1",
    trainingName: "Safety Orientation",
    name: "PPE Usage",
    description: "Proper selection and use of personal protective equipment.",
    studyMaterialName: "ppe-guide.pdf",
  },
  {
    id: "s3",
    trainingId: "1",
    trainingName: "Safety Orientation",
    name: "Emergency Exits",
    description: "Emergency exit routes and assembly point procedures.",
    studyMaterialName: "emergency-exits.pdf",
  },
  {
    id: "s4",
    trainingId: "2",
    trainingName: "Fire Fighting",
    name: "Extinguisher Types",
    description: "Types of fire extinguishers and when to use each.",
    studyMaterialName: "extinguisher-types.pdf",
  },
  {
    id: "s5",
    trainingId: "2",
    trainingName: "Fire Fighting",
    name: "Evacuation Drill",
    description: "Evacuation drill roles and communication protocols.",
    studyMaterialName: "evacuation-drill.pdf",
  },
  {
    id: "s6",
    trainingId: "3",
    trainingName: "First Aid Basics",
    name: "CPR",
    description: "Cardiopulmonary resuscitation steps for adults.",
    studyMaterialName: "cpr-basics.pdf",
  },
  {
    id: "s7",
    trainingId: "3",
    trainingName: "First Aid Basics",
    name: "Wound Care",
    description: "Basic wound cleaning, dressing, and infection control.",
    studyMaterialName: "wound-care.pdf",
  },
  {
    id: "s8",
    trainingId: "4",
    trainingName: "Customer Service",
    name: "Phone Etiquette",
    description: "Professional phone handling and call closing techniques.",
    studyMaterialName: "phone-etiquette.pdf",
  },
  {
    id: "s9",
    trainingId: "4",
    trainingName: "Customer Service",
    name: "Complaint Handling",
    description: "De-escalation and resolution strategies for complaints.",
    studyMaterialName: "complaint-handling.pdf",
  },
  {
    id: "s10",
    trainingId: "5",
    trainingName: "Leadership Skills",
    name: "Team Building",
    description: "Activities and practices that strengthen team collaboration.",
    studyMaterialName: "team-building.pdf",
  },
  {
    id: "s11",
    trainingId: "5",
    trainingName: "Leadership Skills",
    name: "Conflict Resolution",
    description: "Mediation techniques for workplace disagreements.",
    studyMaterialName: "conflict-resolution.pdf",
  },
  {
    id: "s12",
    trainingId: "6",
    trainingName: "Compliance Training",
    name: "Code of Conduct",
    description: "Organizational ethics and expected employee behavior.",
    studyMaterialName: "code-of-conduct.pdf",
  },
  {
    id: "s13",
    trainingId: "6",
    trainingName: "Compliance Training",
    name: "Data Privacy",
    description: "Handling sensitive data in line with privacy policies.",
    studyMaterialName: "data-privacy.pdf",
  },
];

export type SubTrainingInput = {
  trainingId: string;
  title: string;
  description: string;
  studyMaterialName: string;
};

export async function listSubTrainings(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
  trainingId?: string;
}): Promise<PaginatedResult<SubTraining>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = subTrainings.filter((item) => {
    if (params?.trainingId && item.trainingId !== params.trainingId) return false;
    return (
      matchesSearch(item.name, search) ||
      matchesSearch(item.trainingName, search) ||
      matchesSearch(item.description, search)
    );
  });
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function listSubTrainingOptions(trainingId?: string) {
  const result = await listSubTrainings({
    page: 1,
    pageSize: 1000,
    trainingId,
  });
  return result.items.map((item) => ({ id: item.id, label: item.name }));
}

export async function createSubTraining(
  input: SubTrainingInput,
): Promise<SubTraining> {
  await delay();
  const trainingName = await resolveTrainingName(input.trainingId);
  const item: SubTraining = {
    id: `s${Date.now()}`,
    trainingId: input.trainingId,
    trainingName,
    name: input.title.trim(),
    description: input.description.trim(),
    studyMaterialName: input.studyMaterialName.trim(),
  };
  subTrainings = [item, ...subTrainings];
  return item;
}

export async function updateSubTraining(
  id: string,
  input: SubTrainingInput,
): Promise<SubTraining | null> {
  await delay();
  const index = subTrainings.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const trainingName = await resolveTrainingName(input.trainingId);
  subTrainings[index] = {
    ...subTrainings[index],
    trainingId: input.trainingId,
    trainingName,
    name: input.title.trim(),
    description: input.description.trim(),
    studyMaterialName: input.studyMaterialName.trim(),
  };
  return subTrainings[index];
}

export async function deleteSubTraining(id: string): Promise<boolean> {
  await delay();
  const before = subTrainings.length;
  subTrainings = subTrainings.filter((item) => item.id !== id);
  return subTrainings.length < before;
}

async function resolveTrainingName(trainingId: string) {
  const result = await listTrainings({ page: 1, pageSize: 1000 });
  return result.items.find((item) => item.id === trainingId)?.name ?? "";
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
