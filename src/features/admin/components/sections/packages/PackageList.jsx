import PackageCard from "../../cards/PackageCard";

export default function PackageList({ data = [] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {data?.map((pack) => (
        <PackageCard key={pack.id} pack={pack} />
      ))}
    </div>
  );
}
