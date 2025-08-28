import { Link } from "react-router";
import useAuth from "../../../hooks/auth/useAuth";
import { LuCircleAlert, LuLock } from "react-icons/lu";

export default function StoreLimitCard({ createdStore }) {
  const { user } = useAuth();

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-4">
      {/* Header Section - Same structure as other cards */}
      <div className="relative flex-1">
        <div className="flex gap-4">
          {/* Icon container - same size as store logo */}
          <div className="mb-3 flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-red-50 ring-1 ring-red-200">
            <div className="relative">
              <LuLock className="h-6 w-6 text-red-400" />
              <LuCircleAlert className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full bg-red-500 p-0.5 text-white" />
            </div>
          </div>

          <h3 className="text-sm font-medium text-gray-900">
            Store Limit Reached
          </h3>
        </div>
      </div>

      {/* Action Section - Same structure as other cards */}
      <div className="flex flex-col gap-3">
        {/* Primary Action Button - Same styling */}
        <Link
          to="https://bfinit.com/contact"
          target="_blank"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-gray-700 to-gray-800 px-3 py-2 text-xs font-medium text-white shadow-sm transition-all duration-200 ease-linear hover:from-gray-800 hover:to-gray-900 hover:shadow-md active:scale-[0.98]"
        >
          <LuLock className="h-4 w-4" />
          Upgrade Plan
        </Link>

        {/* Info text - replaces secondary buttons */}
        <div className="rounded-md border border-red-200 bg-amber-50 px-0.5 py-2 text-center text-xs text-red-500">
          You&apos;ve hit your stores limit of {createdStore}/
          {user?.data?.storeLimit}
        </div>
      </div>
    </div>
  );
}
