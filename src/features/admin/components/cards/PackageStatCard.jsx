export default function PackageStatCard({ title, value }) {
  return (
    <div className="bg-card space-y-1 rounded-md border px-4 py-2.5">
      <p className="text-muted-foreground text-xs">{title}</p>
      <h3 className="text-xl font-semibold">{value}</h3>
    </div>
  );
}
