import { Link } from "react-router";
import { Plus, Store } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreateStoreCard() {
  return (
    <div className="bg-card group rounded-lg border p-6">
      {/* Store Logo - Centered, Square with Rounded Corners */}
      <div className="mb-4 flex items-center justify-center">
        <div className="from-primary/10 to-primary/5 flex size-14 items-center justify-center rounded-md bg-linear-to-br p-2.5">
          <div className="relative">
            <Store className="group-hover:text-dashboard-primary h-full w-full text-gray-400 transition-all duration-200 ease-linear" />
            <Plus className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full bg-gray-600 p-0.5 text-white" />
          </div>
        </div>
      </div>

      {/* Store Name - Centered */}
      <p className="block truncate text-center text-sm font-semibold">
        Create New Store
      </p>

      {/* Action Buttons */}
      <div className="mt-6">
        <Button size="sm" variant="" className="w-full text-xs" asChild>
          <Link target="_blank" to="/stores/create">
            <Plus className="h-3.5 w-3.5" />
            Get Started
          </Link>
        </Button>
      </div>
    </div>
  );
}
