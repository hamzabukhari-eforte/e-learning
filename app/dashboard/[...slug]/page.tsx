import { DashboardPlaceholder } from "@/components/dashboard/dashboard-placeholder";

type DashboardCatchAllProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function DashboardCatchAllPage({
  params,
}: DashboardCatchAllProps) {
  const { slug } = await params;
  const title = slug
    .map((part) =>
      part
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    )
    .join(" / ");

  return <DashboardPlaceholder title={title} />;
}
