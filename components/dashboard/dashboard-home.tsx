export function DashboardHome({ name }: { name?: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-black">Dashboard</h1>
      <p className="mt-2 text-sm text-zinc-600">
        {name
          ? `Welcome back, ${name}. Use the sidebar to navigate your modules.`
          : "Use the sidebar to navigate your modules."}
      </p>
    </div>
  );
}
