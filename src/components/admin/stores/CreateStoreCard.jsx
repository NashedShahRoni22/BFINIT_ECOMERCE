import { Link } from "react-router";
import { BsPlusLg } from "react-icons/bs";

export default function CreateStoreCard() {
  return (
    <Link
      to="/create-store"
      className="group hover:border-dashboard-primary relative block min-h-[250px] w-[250px] rounded border border-dashed border-neutral-200 bg-white p-4 transition-all duration-200 hover:bg-[#f5f8fc]"
    >
      {/* Plus icon with animated circle */}
      <div className="flex h-[180px] flex-col items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 scale-0 rounded-full bg-[#E0EAF5] transition-all duration-300 group-hover:scale-100" />
          <BsPlusLg className="group-hover:text-dashboard-primary relative z-10 text-5xl text-gray-500 transition-all duration-200 group-hover:rotate-90" />
        </div>
      </div>

      {/* Text with subtle hover effect */}
      <div className="text-center">
        <h5 className="group-hover:text-dashboard-primary text-sm font-medium text-gray-700 transition-colors duration-200">
          Create New Store
        </h5>
        <p className="mt-1 text-xs text-gray-500">Click to add another store</p>
      </div>

      {/* Optional: Premium badge if applicable */}
      {/* <div className="absolute top-2 right-2 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">
        PRO
      </div> */}
    </Link>
  );
}
