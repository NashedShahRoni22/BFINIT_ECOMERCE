import { Link } from "react-router";
import { FaLock } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import useAuth from "../../../hooks/auth/useAuth";

export default function StoreLimitCard() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-[250px] w-[250px] flex-col rounded border border-neutral-200 bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="relative">
          <FaLock className="text-5xl text-gray-600" />
          <HiOutlineExclamationCircle className="absolute -top-2 -right-2 text-xl text-red-500" />
        </div>
      </div>

      <div className="mt-2 text-center">
        <h3 className="text-sm font-semibold text-gray-800">
          📦 Store Limit Reached
        </h3>
        <p className="mt-1 text-xs text-gray-600">
          You’ve hit your plan’s limit of {user?.data?.storeLimit} stores.
        </p>
      </div>

      <Link
        to="https://bfinit.com/contact"
        target="_blanck"
        className="mt-4 block w-full rounded-md bg-gradient-to-r from-gray-700 to-gray-800 px-3 py-2 text-center text-xs font-medium text-white shadow-sm transition-all duration-200 ease-linear active:scale-95"
      >
        Upgrade Plan
      </Link>
    </div>
  );
}
