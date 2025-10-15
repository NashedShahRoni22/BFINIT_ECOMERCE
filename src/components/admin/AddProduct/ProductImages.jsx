import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import ThumbnailImage from "./ThumbnailImage";
import GalleryImages from "./GalleryImages";

export default function ProductImages({ form }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-lg border bg-white p-4 md:p-6"
    >
      {/* header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-gray-900">
            Product Images
          </h2>
          <p className="mt-1 text-xs text-gray-500 md:text-sm">
            Upload high-quality images to showcase your product (recommended:
            1000x1000px minimum)
          </p>
        </div>
        {/* section collapse toggle button */}
        <CollapsibleTrigger asChild>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="size-8 shrink-0 cursor-pointer md:size-6"
          >
            <ChevronUp
              className={`h-4 w-4 transition-transform duration-200 ease-linear md:h-3 md:w-3 ${isOpen ? "rotate-0" : "rotate-180"}`}
            />
          </Button>
        </CollapsibleTrigger>
      </div>

      {/* images main content */}
      <CollapsibleContent className="mt-4 flex flex-col items-center gap-4 md:mt-6 md:flex-row md:items-start md:gap-6">
        {/* thumbnail image field */}
        <ThumbnailImage form={form} />
        {/* gallery images */}
        <GalleryImages form={form} />
      </CollapsibleContent>
    </Collapsible>
  );
}
