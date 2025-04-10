const ListItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 last:border-b-0">
      <div className="flex items-center gap-2">
        <div className="size-9 animate-pulse rounded-full bg-neutral-200"></div>
        <div className="h-4 w-32 animate-pulse rounded bg-neutral-200"></div>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-5 w-5 animate-pulse rounded bg-neutral-200"></div>
        <div className="h-5 w-5 animate-pulse rounded bg-neutral-200"></div>
      </div>
    </div>
  );
};

export default ListItemSkeleton;
