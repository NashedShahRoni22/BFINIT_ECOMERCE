import PackageStatCard from "../../cards/PackageStatCard";

export default function PackageStats({ data = [] }) {
  const totalPackages = data?.length;

  const activePackages = data?.reduce((acc, curr) => {
    return acc + (curr?.is_active ? 1 : 0);
  }, 0);

  const inactivePackages = data?.reduce((acc, curr) => {
    return acc + (!curr?.is_active ? 1 : 0);
  }, 0);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      <PackageStatCard title="Total Packages" value={totalPackages} />
      <PackageStatCard title="Active" value={activePackages} />
      <PackageStatCard title="Inactive" value={inactivePackages} />
    </div>
  );
}
