export default function ProductCardSkeletonGrid({ count = 5 }) {
  return (
    <div className="grid grid-cols-2 gap-5 md:mt-10 md:grid-cols-3 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="h-72 animate-pulse rounded-md bg-gray-200"
        />
      ))}
    </div>
  );
}
