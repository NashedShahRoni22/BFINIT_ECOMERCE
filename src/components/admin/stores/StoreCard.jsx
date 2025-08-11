import { Link } from "react-router";
import { LuExternalLink, LuPanelsTopLeft, LuStore } from "react-icons/lu";

export default function StoreCard({ storeData }) {
  const { storeId, storeName, storeLogo } = storeData;

  return (
    <div className="group flex w-full flex-col overflow-hidden rounded border border-neutral-200">
      {/* Header with store logo and info */}
      <div className="relative bg-blue-50 py-2.5 text-center">
        {/* Store Logo */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white p-2 shadow-sm">
          <img
            src={`https://ecomback.bfinit.com${storeLogo}`}
            alt={storeName}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Store Name */}
        <h3 className="mb-2 text-xl font-semibold text-gray-900">
          {storeName}
        </h3>

        {/* Preview Link */}
        <Link
          to={`/preview/${storeId}`}
          className="absolute top-4 right-4 p-2 text-gray-400 transition-all duration-200 ease-linear hover:text-gray-600 active:scale-95"
        >
          <LuExternalLink />
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col gap-2.5 px-4">
        <Link
          to={`/customize-store/${storeId}`}
          className="bg-dashboard-primary hover:bg-dashboard-primary-hover flex w-full items-center justify-center gap-1 rounded px-4 py-1.5 text-white transition-all duration-200 ease-linear active:scale-95"
        >
          <LuPanelsTopLeft /> Layout
        </Link>
        <Link
          to={`/store-settings/${storeId}`}
          className="flex w-full items-center justify-center gap-1 rounded bg-neutral-200 px-4 py-1.5 text-neutral-600 transition-all duration-200 ease-linear hover:bg-neutral-300 hover:text-neutral-800 active:scale-95"
        >
          <LuStore />
          Settings
        </Link>
      </div>
    </div>
  );
}
