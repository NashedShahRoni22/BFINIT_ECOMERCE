import { BsShop } from "react-icons/bs";

export default function NoStoreSelected({ description }) {
  return (
    <div className="mt-8 flex flex-col items-center justify-center rounded-lg border-gray-300 bg-gray-50 p-12 text-center">
      <BsShop className="mx-auto size-12 text-gray-400" />
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        No store selected
      </h3>
      <p className="mt-2 text-gray-500">{description}</p>
    </div>
  );
}
