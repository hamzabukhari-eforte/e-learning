import { listEmployees } from "@/data/registration/employees";
import { listTrainers } from "@/data/registration/trainers";
import { listTrainings } from "@/data/system-setup/trainings";
import { listSentForms } from "@/data/survey/sent-forms";
import { listTestAttemptHistory } from "@/data/reports/test-history";
import type { ChartSlice, DashboardOverview } from "@/data/dashboard/types";

export type { DashboardOverview };

const COLORS = {
  blue: "#042954",
  lightBlue: "#7EB8DA",
  yellow: "#FFA901",
  green: "#8FBF7F",
  gray: "#555555",
  purple: "#8B7EC8",
  red: "#E57373",
};

export async function getDashboardOverview(): Promise<DashboardOverview> {
  const [employees, trainers, trainings, sentForms, history] = await Promise.all([
    listEmployees({ page: 1, pageSize: 10000 }),
    listTrainers({ page: 1, pageSize: 10000 }),
    listTrainings({ page: 1, pageSize: 10000 }),
    listSentForms({ page: 1, pageSize: 10000 }),
    listTestAttemptHistory({ page: 1, pageSize: 10000 }),
  ]);

  const empItems = employees.items;
  const trainerItems = trainers.items;

  return {
    kpis: {
      registeredEmployees: empItems.filter((i) => i.status === "active").length,
      unregisteredEmployees: empItems.filter((i) => i.status === "inactive").length,
      registeredTrainers: trainerItems.filter((i) => i.status === "active").length,
      unregisteredTrainers: trainerItems.filter((i) => i.status === "inactive").length,
    },
    gender: countSlices(
      empItems.map((i) => (i.gender === "male" ? "Male" : "Female")),
      { Male: COLORS.blue, Female: COLORS.yellow },
    ),
    departments: countSlices(
      empItems.map((i) => i.departmentName),
      {},
      [COLORS.blue, COLORS.lightBlue, COLORS.yellow, COLORS.green, COLORS.gray, COLORS.purple],
    ),
    trainerTypes: countSlices(
      trainerItems.map((i) => (i.trainerType === "master" ? "Master" : "Departmental")),
      { Master: COLORS.blue, Departmental: COLORS.yellow },
    ),
    trainingStatus: countSlices(
      trainings.items.map((i) => (i.status === "active" ? "Active" : "Inactive")),
      { Active: COLORS.green, Inactive: COLORS.gray },
    ),
    surveyAttempts: [
      {
        name: "Assigned",
        value: sentForms.items.reduce((sum, i) => sum + i.employeeIds.length, 0),
        color: COLORS.blue,
      },
      {
        name: "Attempted",
        value: sentForms.items.reduce((sum, i) => sum + i.attemptedCount, 0),
        color: COLORS.yellow,
      },
    ],
    testSubmitStatus: countSlices(
      history.items.map((i) =>
        i.submitStatus === "submitted" ? "Submitted" : "Not Submitted",
      ),
      { Submitted: COLORS.green, "Not Submitted": COLORS.red },
    ),
  };
}

function countSlices(
  labels: string[],
  colorMap: Record<string, string>,
  palette: string[] = [COLORS.blue, COLORS.lightBlue, COLORS.yellow, COLORS.green],
): ChartSlice[] {
  const counts = new Map<string, number>();
  for (const label of labels) {
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  let index = 0;
  return [...counts.entries()].map(([name, value]) => ({
    name,
    value,
    color: colorMap[name] ?? palette[index++ % palette.length],
  }));
}
