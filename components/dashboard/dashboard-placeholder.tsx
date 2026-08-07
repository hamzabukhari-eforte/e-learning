export function DashboardPlaceholder({ title }: { title: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-black">{title}</h1>
      <p className="mt-2 text-sm text-zinc-600">
        This module will be available once the backend is connected.
      </p>
    </div>
  );
}
