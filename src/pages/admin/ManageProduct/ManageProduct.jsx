import { useState } from "react";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import ProductRow from "../../../components/admin/ProductRow/ProductRow";

export default function ManageProduct() {
  const [selectedStore, setSelectedStore] = useState("");

  // Handle store select change
  const handleStoreChange = (e) => {
    setSelectedStore(e.target.value);
  };

  return (
    <section>
      <PageHeading heading="Manage Product" />

      {/* Store Selection */}
      <div className="my-6 flex flex-wrap items-center justify-between">
        {selectedStore ? (
          <h3 className="text-lg font-semibold">
            Store {selectedStore} Product Management
          </h3>
        ) : (
          <h3 className="text-lg font-semibold">
            Select a Store to Manage Product
          </h3>
        )}

        <div className="relative">
          <label htmlFor="storeSelect" className="sr-only">
            Select Store
          </label>
          <select
            id="storeSelect"
            value={selectedStore}
            onChange={handleStoreChange}
            className="rounded-md border border-neutral-300 p-2 text-sm focus:outline-none"
          >
            <option value="" disabled>
              Select Store
            </option>
            {Array.from({ length: 5 }).map((_, i) => (
              <option key={i} value={i + 1}>
                Store {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedStore && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-y border-neutral-200">
                <th className="py-2 text-sm font-medium">Name</th>
                <th className="py-2 text-sm font-medium">Category</th>
                <th className="py-2 text-sm font-medium">SKU</th>
                <th className="py-2 text-sm font-medium">Quantity</th>
                <th className="py-2 text-sm font-medium">Price</th>
                <th className="py-2 text-sm font-medium">Status</th>
                <th className="py-2 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }, (_, i) => (
                <ProductRow key={i} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
