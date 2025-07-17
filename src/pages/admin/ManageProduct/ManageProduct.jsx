import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import ProductRow from "../../../components/admin/ProductRow/ProductRow";
import useGetStores from "../../../hooks/stores/useGetStores";
import useGetProductsByStoreId from "../../../hooks/products/useGetProductsByStoreId";
import toast from "react-hot-toast";
import useGetStorePreference from "../../../hooks/stores/useGetStorePreference";
import ManageProductCard from "../../../components/admin/Cards/ManageProductCard";

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
    if (!storeId || !stores?.data) return;

    const matchedStore = stores.data.find((store) => store.storeId === storeId);

    if (!matchedStore) {
      toast.error("Selected store not found");
      setSearchParams({});
      return;
    }

    setSelectedStore({
      storeId,
      storeName: matchedStore.storeName,
    });
  }, [storeId, stores?.data, setSearchParams]);

  // fetch all products by selected storeId
  const { data: products } = useGetProductsByStoreId(selectedStore?.storeId);
  // fetch store preference
  const { data: storePreference } = useGetStorePreference(
    selectedStore?.storeId,
  );

  return (
    <section>
      <PageHeading heading="Manage Product" />

      {/* Store Selection */}
      <div className="my-6 flex flex-wrap items-center justify-between gap-2">
        {selectedStore.storeId ? (
          <h3 className="text-lg font-semibold text-balance">
            Managing{" "}
            <span className="text-dashboard-primary">
              {selectedStore.storeName}{" "}
            </span>
            Products
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
              stores?.data?.length > 0 &&
              stores?.data?.map((store) => (
                <option key={store?.storeId} value={store?.storeId}>
                  {store?.storeName}
                </option>
              ))}
          </select>
        </div>
      </div>

      {products && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          {/* Desktop Table View */}
          {products?.data?.length > 0 && (
            <div className="hidden w-full md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Brand
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {products?.data?.map((product) => (
                    <ProductRow
                      key={product.productId}
                      product={product}
                      storeId={selectedStore?.storeId}
                      currencySymbol={storePreference?.currencySymbol}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Mobile Card View */}
          <div className="md:hidden">
            <div className="divide-y divide-gray-200">
              {products?.data?.map((product) => (
                <ManageProductCard
                  key={product.productId}
                  product={product}
                  storeId={selectedStore?.storeId}
                  currencySymbol={storePreference?.currencySymbol}
                />
              ))}
            </div>
          </div>

          {products &&
            products?.message === "No products found for this store." && (
              <div className="px-4 text-center text-sm text-gray-500">
                No products found for this store. Start by adding a new one.
              </div>
            )}
        </div>
      )}
    </section>
  );
}
