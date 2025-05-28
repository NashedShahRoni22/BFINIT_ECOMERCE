import { useState } from "react";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import useGetStores from "../../../hooks/stores/useGetStores";
import BlogForm from "../../../components/admin/BlogForm";

export default function AddBlog() {
  // fetch all stores list
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

  return (
    <section>
      <PageHeading heading="Add New Blog" />

      {/* Store Selection */}
      <div className="my-6 flex flex-wrap items-center justify-between">
        {selectedStore ? (
          <h3 className="text-lg font-semibold">
            Add New Blog to Store {selectedStore.storeName}
          </h3>
        ) : (
          <h3 className="text-lg font-semibold">
            Select a Store to Add New Blog
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

      {/* Blog form */}
      {selectedStore?.storeId && <BlogForm storeId={selectedStore?.storeId} />}
    </section>
  );
}
