import { Link } from "react-router";
import { Plus, Store } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreateStoreCard() {
  return (
    <div className="group bg-card flex w-full flex-col overflow-hidden rounded-lg border p-4">
      <div className="relative flex-1">
        <div className="flex gap-4">
          <div className="mb-3 flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-gray-50 ring-1 ring-slate-200">
            <div className="relative">
              <Store className="group-hover:text-dashboard-primary h-6 w-6 text-gray-400 transition-all duration-200 ease-linear" />
              <Plus className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full bg-gray-600 p-0.5 text-white" />
            </div>
          </div>

          <h3 className="text-sm font-medium text-gray-900">
            Create New Store
          </h3>
        </div>
      </div>

      <Button asChild size="sm" className="text-xs">
        <Link to="/stores/create">
          <Plus /> Get Started
        </Link>
      </Button>
    </div>
  );
}
