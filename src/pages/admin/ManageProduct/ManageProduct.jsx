import { useState } from "react";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import ProductRow from "../../../components/admin/ProductRow/ProductRow";
import useGetStores from "../../../hooks/stores/useGetStores";
import useGetProductsByStoreId from "../../../hooks/products/useGetProductsByStoreId";

export default function ManageProduct() {
  // fetch stores using custom hook
  const { data: stores } = useGetStores();
  const [selectedStore, setSelectedStore] = useState({
    storeId: "",
    storeName: "",
  });

  // store select dropdown
  const handleStoreChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex];

    setSelectedStore({
      storeId: e.target.value,
      storeName: selectedOption.text,
    });
  };

  // fetch all products by selected storeId
  const { data: products } = useGetProductsByStoreId(selectedStore?.storeId);

  return (
    <section>
      <PageHeading heading="Manage Product" />

      {/* Store Selection */}
      <div className="my-6 flex flex-wrap items-center justify-between">
        {selectedStore ? (
          <h3 className="text-lg font-semibold">
            Add New Product to Store {selectedStore.storeName}
          </h3>
        ) : (
          <h3 className="text-lg font-semibold">
            Select a Store to Add New Product
          </h3>
        )}

        <div className="relative">
          <label htmlFor="storeSelect" className="sr-only">
            Select Store
          </label>
          <select
            id="storeSelect"
            value={selectedStore.storeId}
            onChange={handleStoreChange}
            className="rounded-md border border-neutral-300 p-2 text-sm focus:outline-none"
          >
            <option value="" disabled>
              Select Store
            </option>
            {stores &&
              stores?.storeData?.length > 0 &&
              stores?.storeData?.map((store) => (
                <option key={store?.storeId} value={store?.storeId}>
                  {store?.storeName}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        {products && products?.data?.length > 0 && (
          <table className="w-full">
            <thead>
              <tr className="border-y border-neutral-200 text-left">
                <th className="py-2 text-center text-sm font-medium">Name</th>
                <th className="py-2 text-center text-sm font-medium">SKU</th>
                <th className="py-2 text-center text-sm font-medium">
                  Quantity
                </th>
                <th className="py-2 text-center text-sm font-medium">
                  Category
                </th>
                <th className="py-2 text-center text-sm font-medium">
                  Sub Category
                </th>
                <th className="py-2 text-center text-sm font-medium">Brand</th>
                <th className="py-2 text-center text-sm font-medium">Price</th>
                <th className="py-2 text-center text-sm font-medium">
                  Discount Price
                </th>
                <th className="py-2 text-center text-sm font-medium">Status</th>
                <th className="py-2 text-center text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.data?.map((product) => (
                <ProductRow
                  key={product.productId}
                  product={product}
                  storeId={selectedStore?.storeId}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
