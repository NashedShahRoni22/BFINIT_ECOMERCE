import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParam } from "@/features/admin/hooks/searchAndPagination/useSearchParam";

export default function CategoryToolbar({ onOpen }) {
  const { search, handleSearch } = useSearchParam();

  return (
    <div className="flex items-center justify-end gap-4">
      <div className="relative w-full max-w-72">
        <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
        <Input
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search categories..."
          value={search}
          className="pl-7 placeholder:text-xs md:text-xs"
        />
      </div>

      <Button onClick={onOpen} size="sm">
        <Plus /> Add Category
      </Button>
    </div>
  );
}
