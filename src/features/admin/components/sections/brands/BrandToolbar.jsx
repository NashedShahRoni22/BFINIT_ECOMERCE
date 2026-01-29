import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BrandToolbar({ search, setSearch, onOpen }) {
  return (
    <div className="flex items-center justify-end gap-4">
      <div className="relative w-full max-w-72">
        <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
        <Input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search brands..."
          value={search}
          className="pl-7 placeholder:text-xs md:text-xs"
        />
      </div>

      <Button onClick={onOpen} size="sm" className="text-xs">
        <Plus /> Add Brand
      </Button>
    </div>
  );
}
