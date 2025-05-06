import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import toast from "react-hot-toast";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import OrderRow from "../../../components/admin/OrderRow/OrderRow";
import useAuth from "../../../hooks/auth/useAuth";
import useGetStores from "../../../hooks/stores/useGetStores";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import useGetStorePreference from "../../../hooks/stores/useGetStorePreference";

export default function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const storeId = searchParams.get("storeId") || "";
  const { user } = useAuth();
  const [selectedStore, setSelectedStore] = useState({
    storeId,
    storeName: "",
  });

  // fetch all stores
  const { data: stores } = useGetStores();
  // fetch store preference
  const { data: storePreference } = useGetStorePreference(
    selectedStore?.storeId,
  );

  // fetch orders of selected store
  const { data: orders } = useGetQuery({
    endpoint: `/orders/all/${selectedStore?.storeId}`,
    token: user?.token,
    queryKey: ["orders", selectedStore?.storeId],
    enabled: !!selectedStore?.storeId && !!user?.token,
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

  // keep the store name and id on component mount or reload on store select
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

  return (
    <section>
      <PageHeading heading="Manage Orders" />

      {/* Store Selection */}
      <div className="my-6 flex flex-wrap items-center justify-between">
        {selectedStore.storeId ? (
          <h3 className="text-lg font-semibold">
            Manage Orders of Store: {selectedStore.storeName}
          </h3>
        ) : (
          <h3 className="text-lg font-semibold">
            Select a Store to Manage Orders
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

      {/* Responsive Table */}
      {orders && orders?.OrdersData?.length > 0 && (
        <table className="mt-6 w-full">
          <thead>
            <tr className="border-y border-neutral-200 text-left">
              <th className="py-2 text-sm font-medium">Order ID</th>
              <th className="py-2 text-center text-sm font-medium">
                Total Amount
              </th>
              <th className="py-2 text-center text-sm font-medium">
                Payment Method
              </th>
              <th className="py-2 text-center text-sm font-medium">
                Payment Status
              </th>
              <th className="py-2 text-center text-sm font-medium">
                Order Status
              </th>
              <th className="py-2 text-center text-sm font-medium">
                Delivery Status
              </th>
              <th className="py-2 text-center text-sm font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders?.OrdersData?.map((order) => (
              <OrderRow
                key={order?.orderId}
                order={order}
                currencySymbol={storePreference?.currencySymbol}
                storeId={selectedStore?.storeId}
              />
            ))}
          </tbody>
        </table>
      )}

      {/* no order message */}
      {orders && orders?.message === "No orders available for this store" && (
        <p className="mt-12 text-center text-lg">
          You haven&apos;t received any orders yet. When you do, they&apos;ll
          appear here.
        </p>
      )}
    </section>
  );
}
