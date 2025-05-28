import { Link } from "react-router";
import { FaLock } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const StoreLimitCard = () => {
  return (
    <div className="w-[250px] rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm">
      {/* Icon */}
      <div className="flex h-[120px] flex-col items-center justify-center">
        <div className="relative">
          <FaLock className="text-5xl text-gray-400" />
          <HiOutlineExclamationCircle className="absolute -top-2 -right-2 text-xl text-amber-500" />
        </div>
      </div>

      {/* Message */}
      <div className="mt-2 text-center">
        <h3 className="text-sm font-semibold text-gray-900">
          📦 Store Limit Reached
        </h3>
        <p className="mt-1 text-xs text-gray-600">
          You&apos;ve reached your current plan&apos;s limit of 2 stores.
        </p>
      </div>

      {/* CTA Button */}
      <Link
        to="/pricing"
        className="mt-4 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-xs font-medium text-white hover:bg-blue-700"
      >
        Upgrade Plan
      </Link>
    </div>
  );
};

export default StoreLimitCard;
