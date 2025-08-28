import { Link } from "react-router";
import { Eye, PanelsTopLeft, Settings } from "lucide-react";

export default function StoreCard({ storeData }) {
  const { storeId, storeName, storeLogo } = storeData;

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-4">
      {/* Header with store logo and info */}
      <div className="relative flex-1">
        <div className="flex gap-4">
          <div className="mb-3 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white ring-1 ring-slate-200">
            <img
              src={`https://ecomback.bfinit.com/${storeLogo}`}
              alt={storeName}
              className="h-12 w-12 object-contain"
            />
          </div>

          <h3 className="text-sm font-medium text-gray-900">{storeName}</h3>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="mt-4 flex flex-col gap-3">
        {/* Primary Action - Layout Customization */}
        <Link
          to={`/customize-store/${storeId}`}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-gray-700 to-gray-800 px-3 py-2 text-xs font-medium text-white shadow-sm transition-all duration-200 ease-linear hover:from-gray-800 hover:to-gray-900 hover:shadow-md active:scale-[0.98]"
        >
          <PanelsTopLeft size={16} />
          Layout Customization
        </Link>

        {/* Secondary Actions Row */}
        <div className="grid grid-cols-2 gap-2">
          <Link
            to={`/update-store/${storeId}`}
            className="flex items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
          >
            <Settings size={14} />
            Settings
          </Link>

          <Link
            to={`/preview/${storeId}`}
            target="_blank"
            className="flex items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
          >
            <Eye size={14} />
            Preview
          </Link>
        </div>
      </div>
    </div>
  );
}
