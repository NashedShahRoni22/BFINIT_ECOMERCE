import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import OrderRow from "../../../components/admin/OrderRow/OrderRow";
import { useState } from "react";
import useGetStores from "../../../hooks/stores/useGetStores";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import useAuth from "../../../hooks/auth/useAuth";

export default function Orders() {
  const { user } = useAuth();
  // fetch all stores
  const { data: stores } = useGetStores();
  const [selectedStore, setSelectedStore] = useState({
    storeId: "",
    storeName: "",
  });

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

    setSelectedStore({
      storeId: e.target.value,
      storeName: selectedOption.text,
    });
  };

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
                Order Status
              </th>
              <th className="py-2 text-center text-sm font-medium">
                Total Amount
              </th>
              <th className="py-2 text-center text-sm font-medium">
                Payment Status
              </th>
              <th className="py-2 text-center text-sm font-medium">
                Delivery Status
              </th>
              <th className="py-2 text-center text-sm font-medium">
                Payment Method
              </th>
              <th className="py-2 text-center text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.OrdersData?.map((order) => (
              <OrderRow key={order?.orderId} order={order} />
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
