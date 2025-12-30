import { AlertCircle, Search } from "lucide-react";

export default function SearchEnginePreview({
  metaTitle,
  metaDescription,
  selectedStore,
}) {
  return (
    <div className="bg-muted border-border rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Search className="text-muted-foreground h-4 w-4" />
        <h3 className="text-sm font-medium">Search Engine Preview</h3>
      </div>

      <div className="bg-background border-border space-y-1 rounded-md border p-4">
        {/* Title */}
        <h4 className="line-clamp-1 cursor-pointer text-lg leading-tight text-[#1a0dab] hover:underline">
          {metaTitle ||
            `${selectedStore?.storeName} - Premium Products & Services`}
        </h4>

        {/* URL */}
        <p className="text-sm text-[#006621]">https://yourstore.com</p>

        {/* Description */}
        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
          {metaDescription ||
            "Discover our wide selection of quality products. Fast shipping, excellent customer service and competitive prices. Shop now for the best deals!"}
        </p>
      </div>

      {/* Character warnings */}
      <div className="mt-3 space-y-2">
        {metaTitle?.length > 60 && (
          <div className="text-warning flex items-center gap-1.5 text-xs">
            <AlertCircle className="h-3 w-3 shrink-0" />
            <span>
              Title exceeds 60 characters and may be truncated in search results
            </span>
          </div>
        )}
        {metaDescription?.length > 160 && (
          <div className="text-warning flex items-center gap-1.5 text-xs">
            <AlertCircle className="h-3 w-3 shrink-0" />
            <span>
              Description exceeds 160 characters and may be truncated in search
              results
            </span>
          </div>
        )}
        {metaTitle?.length < 30 && metaTitle.length > 0 && (
          <div className="text-info flex items-center gap-1.5 text-xs">
            <AlertCircle className="h-3 w-3 shrink-0" />
            <span>
              Consider making your title longer for better SEO (recommended:
              50-60 characters)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
