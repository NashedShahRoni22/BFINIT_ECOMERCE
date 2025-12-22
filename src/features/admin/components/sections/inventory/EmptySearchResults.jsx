import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptySearchResults({ searchQuery, onClearSearch }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg px-5 pt-7 pb-12">
      <div className="bg-muted/50 mb-3 rounded-full p-3">
        <SearchX className="text-muted-foreground size-6" />
      </div>

      <h3 className="mb-1.5 text-sm font-semibold">No results found</h3>

      <p className="text-muted-foreground mb-6 max-w-md text-center text-xs">
        No products match &quot;{searchQuery}&quot;. Try adjusting your search
        terms.
      </p>

      <Button
        size="sm"
        variant="outline"
        onClick={onClearSearch}
        className="text-xs"
      >
        Clear Search
      </Button>
    </div>
  );
}
