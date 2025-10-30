import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Settings2, ExternalLink } from "lucide-react";
import themeImg from "@/assets/placeholder/preview.webp";
import useSelectedStore from "@/hooks/stores/useSelectedStore";

export default function ThemeOverview() {
  const { selectedStore } = useSelectedStore();

  return (
    <div className="grid grid-cols-12 gap-6 rounded-lg border bg-white p-6">
      {/* Theme preview */}
      <div className="col-span-8">
        <div className="overflow-hidden rounded-lg border">
          <img
            src={themeImg}
            alt="Modern Minimal Theme Preview"
            className="w-full"
          />
        </div>
      </div>

      {/* Details */}
      <div className="col-span-4 flex flex-col">
        <h2 className="text-xl font-semibold">Modern Minimal</h2>
        <p className="mt-1 text-sm text-gray-500">
          Last modified: January 25, 2025
        </p>

        <div className="mt-6 space-y-2">
          <Button asChild className="w-full">
            <Link
              to={`/store/${selectedStore?.storeId}/themes/wsia2w782/editor`}
            >
              <Settings2 className="mr-2 h-4 w-4" />
              Customize Theme
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full">
            <Link to="/preview" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Store
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
