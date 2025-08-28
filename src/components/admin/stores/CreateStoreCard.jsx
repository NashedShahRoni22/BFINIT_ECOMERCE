import { Link } from "react-router";
import { LuPlus, LuStore } from "react-icons/lu";

export default function CreateStoreCard() {
  return (
    <div className="group flex w-full flex-col overflow-hidden rounded-lg border border-dashed border-gray-200 bg-white p-4">
      {/* Header Section - Same structure as store card */}
      <div className="relative flex-1">
        <div className="flex gap-4">
          {/* Icon container - same size as store logo */}
          <div className="mb-3 flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-gray-50 ring-1 ring-slate-200">
            <div className="relative">
              <LuStore className="group-hover:text-dashboard-primary h-6 w-6 text-gray-400 transition-all duration-200 ease-linear" />
              <LuPlus className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full bg-gray-600 p-0.5 text-white" />
            </div>
          </div>

          <h3 className="text-sm font-medium text-gray-900">
            Create New Store
          </h3>
        </div>
      </div>

      {/* Action Section - Same structure as store card */}
      <div className="flex flex-col gap-3">
        {/* Primary Action Button - Same styling */}
        <Link
          to="/create-store"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-gray-700 to-gray-800 px-3 py-2 text-xs font-medium text-white shadow-sm transition-all duration-200 ease-linear hover:from-gray-800 hover:to-gray-900 hover:shadow-md active:scale-[0.98]"
        >
          <LuPlus className="h-4 w-4" />
          Get Started
        </Link>

        {/* Info text - replaces secondary buttons */}
        <div className="rounded-md bg-gray-50 px-0.5 py-2 text-center">
          <p className="text-xs text-gray-600">
            Set up your online store in minutes
          </p>
        </div>
      </div>
    </div>
  );
}
