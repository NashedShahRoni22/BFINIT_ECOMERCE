import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import OrderRow from "../../../components/admin/OrderRow/OrderRow";
import { useState } from "react";

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
          <tr className="border-y border-neutral-200 text-left">
            <th className="py-2 text-sm font-medium">Order ID</th>
            <th className="py-2 text-sm font-medium">Product</th>
            <th className="py-2 text-sm font-medium">Quantity</th>
            <th className="py-2 text-sm font-medium">Price</th>
            <th className="py-2 text-sm font-medium">Status</th>
            <th className="py-2 text-sm font-medium">Customer</th>
            <th className="py-2 text-sm font-medium">Address</th>
            <th className="py-2 text-sm font-medium">Payments</th>
            <th className="py-2 text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 2 }, (_, i) => (
            <OrderRow key={i} />
          ))}
        </tbody>
      </table>
    </section>
  );
}
