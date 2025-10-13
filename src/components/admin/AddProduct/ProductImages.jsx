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
      className="rounded-lg border bg-white p-8"
    >
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            Product Images
          </h2>
          <p className="mt-1 text-xs text-gray-600">
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
            className="size-6 cursor-pointer text-xs"
          >
            <ChevronUp
              className={`h-3 w-3 transition-transform duration-200 ease-linear ${isOpen ? "rotate-0" : "rotate-180"}`}
            />
          </Button>
        </CollapsibleTrigger>
      </div>

      {/* images main content */}
      <CollapsibleContent className="mt-6 flex flex-col items-center gap-6 md:flex-row md:items-start">
        {/* thumbnail image field */}
        <ThumbnailImage form={form} />
        {/* gallery images */}
        <GalleryImages form={form} />
      </CollapsibleContent>
    </Collapsible>
  );
}
