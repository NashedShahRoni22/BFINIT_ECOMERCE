import { useState } from "react";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import useGetStores from "../../../hooks/stores/useGetStores";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import BlogRow from "../../../components/admin/BlogRow";

export default function ManageBlog() {
  const [selectedStore, setSelectedStore] = useState({
    storeId: "",
    storeName: "",
  });

  // fetch all stores list
  const { data: stores } = useGetStores();
  // fetch all blogs of currently selected store
  const { data: blogs } = useGetQuery({
    endpoint: `/blog/all/?storeId=${selectedStore?.storeId}`,
    queryKey: ["blogs", selectedStore?.storeId],
    enabled: !!selectedStore?.storeId,
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
      {/* page heading */}
      <PageHeading heading="Manage Blogs" />

      {/* Store Selection */}
      <div className="my-6 flex flex-wrap items-center justify-between">
        {selectedStore ? (
          <h3 className="text-lg font-semibold">
            Manage Blogs to Store {selectedStore.storeName}
          </h3>
        ) : (
          <h3 className="text-lg font-semibold">
            Select a Store to Manage Blog
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

      {/* blogs data table */}
      {blogs && blogs?.data?.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-y border-neutral-200">
                <th className="py-2 text-sm font-medium">Thumbnail</th>
                <th className="py-2 text-sm font-medium">Title</th>
                <th className="py-2 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs &&
                blogs?.data?.length > 0 &&
                blogs?.data?.map((blog) => (
                  <BlogRow
                    key={blog.blogId}
                    blog={blog}
                    storeId={selectedStore?.storeId}
                  />
                ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
