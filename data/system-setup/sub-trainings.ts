import {
  matchesSearch,
  paginateItems,
  type PaginatedResult,
  type SubTraining,
} from "@/data/system-setup/types";

let subTrainings: SubTraining[] = [
  { id: "s1", trainingId: "1", trainingName: "Safety Orientation", name: "Workplace Hazards" },
  { id: "s2", trainingId: "1", trainingName: "Safety Orientation", name: "PPE Usage" },
  { id: "s3", trainingId: "1", trainingName: "Safety Orientation", name: "Emergency Exits" },
  { id: "s4", trainingId: "2", trainingName: "Fire Fighting", name: "Extinguisher Types" },
  { id: "s5", trainingId: "2", trainingName: "Fire Fighting", name: "Evacuation Drill" },
  { id: "s6", trainingId: "3", trainingName: "First Aid Basics", name: "CPR" },
  { id: "s7", trainingId: "3", trainingName: "First Aid Basics", name: "Wound Care" },
  { id: "s8", trainingId: "4", trainingName: "Customer Service", name: "Phone Etiquette" },
  { id: "s9", trainingId: "4", trainingName: "Customer Service", name: "Complaint Handling" },
  { id: "s10", trainingId: "5", trainingName: "Leadership Skills", name: "Team Building" },
  { id: "s11", trainingId: "5", trainingName: "Leadership Skills", name: "Conflict Resolution" },
  { id: "s12", trainingId: "6", trainingName: "Compliance Training", name: "Code of Conduct" },
  { id: "s13", trainingId: "6", trainingName: "Compliance Training", name: "Data Privacy" },
];

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
      matchesSearch(item.trainingName, search)
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

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
