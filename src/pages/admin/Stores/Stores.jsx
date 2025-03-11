import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import CreateStoreCard from "../../../components/admin/stores/CreateStoreCard";
import StoreCard from "../../../components/admin/stores/StoreCard";
import { HiOutlineEye } from "react-icons/hi2";

export default function Stores() {
  return (
    <section>
      <PageHeading heading="Manage Stores" />
      {/* stores overveiw */}
      <div className="mt-6">
        <h5 className="font-semibold">Manage Stores (2/5) </h5>
        <div className="mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
          <StoreCard />
          <StoreCard />
          <CreateStoreCard />
        </div>
      </div>

      {/* stores details table */}
      <div className="mt-6 overflow-x-auto">
        <h5 className="font-semibold">Stores</h5>
        <table className="mt-4 w-full">
          <thead>
            <tr className="border-y border-neutral-200">
              <th className="py-2 text-sm font-medium">Store Name</th>
              <th className="py-2 text-sm font-medium">Status</th>
              <th className="py-2 text-sm font-medium">Preview</th>
              <th className="py-2 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 2 }, (_, i) => (
              <tr key={i} className="border-y border-neutral-200 text-center">
                <td className="text-sm">
                  <div className="flex items-center gap-2.5 py-1.5">
                    <img
                      src="https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      loading="lazy"
                      className="size-11 rounded-full object-cover"
                    />
                    <p>Amazon Lite</p>
                  </div>
                </td>
                <td className="text-sm">Active</td>
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
      </div>
    </section>
  );
}
