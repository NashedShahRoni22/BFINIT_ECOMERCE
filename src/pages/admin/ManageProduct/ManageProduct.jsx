import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import ProductRow from "../../../components/admin/ProductRow/ProductRow";
import useGetStores from "../../../hooks/stores/useGetStores";
import useGetProductsByStoreId from "../../../hooks/products/useGetProductsByStoreId";
import toast from "react-hot-toast";

export default function ManageProduct() {
  const [searchParams, setSearchParams] = useSearchParams();
  const storeId = searchParams.get("storeId") || "";
  // fetch stores using custom hook
  const { data: stores } = useGetStores();
  const [selectedStore, setSelectedStore] = useState({
    storeId,
    storeName: "",
  });

  // store select dropdown
  const handleStoreChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex];
    const newStoreId = e.target.value;

    setSearchParams({ storeId: newStoreId });

    setSelectedStore({
      storeId: newStoreId,
      storeName: selectedOption.text,
    });
  };

  useEffect(() => {
    if (!storeId || !stores?.storeData) return;

    const matchedStore = stores.storeData.find(
      (store) => store.storeId === storeId,
    );

    if (!matchedStore) {
      toast.error("Selected store not found");
      setSearchParams({});
      return;
    }

    setSelectedStore({
      storeId,
      storeName: matchedStore.storeName,
    });
  }, [storeId, stores?.storeData, setSearchParams]);

  // fetch all products by selected storeId
  const { data: products } = useGetProductsByStoreId(selectedStore?.storeId);

  return (
    <section>
      <PageHeading heading="Manage Product" />

      {/* Store Selection */}
      <div className="my-6 flex flex-wrap items-center justify-between">
        {selectedStore.storeId ? (
          <h3 className="text-lg font-semibold">
            Manage Product of Store {selectedStore.storeName}
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

        {products &&
          products?.message === "No products found for this store." && (
            <div className="px-4 text-center text-sm text-gray-500">
              No products found for this store. Start by adding a new one.
            </div>
          )}
      </div>
    </section>
  );
}
