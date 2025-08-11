import { Link } from "react-router";
import { LuStore } from "react-icons/lu";

export default function CreateStoreCard() {
  return (
    <Link
      to="/create-store"
      className="group hover:border-dashboard-primary relative block min-h-[250px] w-full rounded border border-dashed border-neutral-200 bg-white p-4 transition-all duration-200 hover:bg-[#f5f8fc] md:w-[250px]"
    >
      {/* Plus icon with animated circle */}
      <div className="flex h-[180px] flex-col items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 z-0 scale-0 rounded-full bg-[#E0EAF5] transition-all duration-300 group-hover:scale-200" />
          <LuStore className="group-hover:text-dashboard-primary relative z-10 text-5xl text-gray-500 transition-all duration-200" />
        </div>
      </div>

      {/* Text with subtle hover effect */}
      <div className="text-center">
        <h5 className="group-hover:text-dashboard-primary text-sm font-medium text-gray-700 transition-colors duration-200">
          Create New Store
        </h5>
        <p className="mt-1 text-xs text-gray-500">
          Set up your online store in minutes
        </p>
      </div>
    </Link>
  );
}
