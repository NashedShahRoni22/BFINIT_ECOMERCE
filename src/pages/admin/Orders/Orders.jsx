import { useState } from "react";
import { HiOutlineEye } from "react-icons/hi2";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

export default function Orders() {
  const [selectedStore, setSelectedStore] = useState("all");

  const handleStoreChange = (e) => {
    setSelectedStore(e.target.value);
  };

  return (
    <section>
      <PageHeading heading="Manage Orders" />

      {/* Store Selection */}
      <div className="my-6 flex flex-wrap items-center justify-between">
        {selectedStore === "all" ? (
          <h3 className="text-lg font-semibold">All Store: Order Management</h3>
        ) : (
          <h3 className="text-lg font-semibold">
            Store {selectedStore}: Order Management
          </h3>
        )}

        <div className="relative">
          <label htmlFor="storeSelect" className="sr-only">
            Select Store
          </label>
          <select
            id="storeSelect"
            onChange={handleStoreChange}
            className="rounded-md border border-neutral-300 p-2 text-sm focus:outline-none"
          >
            <option value="all">All Stores</option>
            {Array.from({ length: 5 }).map((_, i) => (
              <option key={i} value={i + 1}>
                Store {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Responsive Table */}
      <table className="mt-6 w-full">
        <thead>
          <tr className="border-y border-neutral-200 bg-neutral-50">
            <th className="border-r border-neutral-200 py-3.5 text-sm font-medium">
              Product
            </th>
            <th className="border-r border-neutral-200 py-3.5 text-sm font-medium">
              Status
            </th>
            <th className="border-r border-neutral-200 py-3.5 text-sm font-medium">
              Preview
            </th>
            <th className="py-3.5 text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 2 }, (_, i) => (
            <tr
              key={i}
              className="border-y border-neutral-200 text-center last:border-y-0"
            >
              <td className="text-sm">
                <div className="flex items-center gap-2.5 py-1.5">
                  <img
                    src="https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    loading="lazy"
                    className="size-11 rounded-full object-cover"
                  />
                  <p>Mouse Pad</p>
                </div>
              </td>
              <td>
                <p className="mx-auto w-fit rounded-full border border-green-200 bg-green-100 px-3 py-0.5 text-xs text-green-500">
                  Active
                </p>
              </td>
              <td>
                <p className="flex justify-center">
                  <HiOutlineEye className="cursor-pointer text-xl" />
                </p>
              </td>
              <td className="text-sm">
                <div className="space-x-2">
                  <button className="cursor-pointer">
                    <MdOutlineEdit className="hover:text-dashboard-primary text-xl transition-all duration-200 ease-in-out" />
                  </button>
                  <button className="cursor-pointer">
                    <MdOutlineDelete className="text-xl transition-all duration-200 ease-in-out hover:text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
