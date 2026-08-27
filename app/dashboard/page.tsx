import { DashboardHome } from "@/components/dashboard/dashboard-home";
import { getSession } from "@/data/auth";
import { getDashboardOverview } from "@/data/dashboard/overview";

export default async function DashboardPage() {
  const [session, overview] = await Promise.all([
    getSession(),
    getDashboardOverview(),
  ]);

  return <DashboardHome name={session?.name} overview={overview} />;
}
