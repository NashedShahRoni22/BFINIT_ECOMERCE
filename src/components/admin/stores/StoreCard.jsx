import { Link } from "react-router";
import { BiEdit } from "react-icons/bi";

export default function StoreCard({ storeData }) {
  const { storeId, storeName, storeLogo } = storeData;

  return (
    <div className="flex min-h-[250px] w-[250px] flex-col overflow-hidden rounded border border-neutral-200">
      <Link
        to={`/preview/${storeId}`}
        target="_blank"
        className="flex flex-1 items-center justify-center bg-[#f5f8fc] px-2"
      >
        <img
          className="h-auto w-full rounded border border-neutral-200 object-contain"
          src={`https://ecomback.bfinit.com${storeLogo}`}
          alt=""
        />
      </Link>

      <div className="mt-2.5 flex min-w-full items-center justify-between px-4 pb-2">
        <Link
          to={`/preview/${storeId}`}
          target="_blank"
          className="hover:text-dashboard-primary hover:decoration-dashboard-primary text-sm font-semibold text-gray-900 transition-all duration-200 hover:underline hover:underline-offset-2"
        >
          {storeName}
        </Link>
        <Link
          to={`/customize-store/${storeId}`}
          className="bg-dashboard-primary rounded-full p-2.5 transition-all duration-200 ease-linear hover:bg-blue-500 active:scale-95"
        >
          <BiEdit className="text-xl text-white" />
        </Link>
      </div>
    </div>
  );
}
