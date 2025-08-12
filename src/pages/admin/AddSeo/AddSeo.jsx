import { useState } from "react";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import { useSearchParams } from "react-router";
import useGetStores from "../../../hooks/stores/useGetStores";
import { BsInfoCircle, BsShop } from "react-icons/bs";
import ActionBtn from "../../../components/admin/buttons/ActionBtn";
import toast from "react-hot-toast";
import FormInput from "../../../components/admin/FormInput";

export default function AddSeo() {
  // fetch all stores
  const { data: stores } = useGetStores();
  const [searchParams, setSearchParams] = useSearchParams();
  const storeId = searchParams.get("storeId") || "";

  const [selectedStore, setSelectedStore] = useState({
    storeId,
    storeName: "",
  });
  const [formData, setFormData] = useState({
    metaTitle: "",
    metaDescription: "",
  });

  const isDisabled = !formData.metaTitle || !formData.metaDescription;

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle textarea change for description
  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, metaDescription: value }));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.metaTitle || !formData.metaDescription) {
      return toast.error("Please fill in all required fields");
    }

    console.log(formData);
  };

  return (
    <section>
      <PageHeading heading="Add SEO & Meta" />

      {/* Store Selection */}
      <div className="my-6 flex flex-wrap items-center justify-between">
        {selectedStore.storeId ? (
          <h3 className="text-lg font-semibold">
            Configuring SEO & Meta for:{" "}
            <span className="font-semibold">{selectedStore.storeName}</span>
          </h3>
        ) : (
          <h3 className="text-lg font-semibold">
            Select a Store to Manage SEO & Meta
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

      {selectedStore.storeId ? (
        <>
          <div className="mt-8 flex items-center justify-end gap-1 text-xs font-medium text-red-600/80">
            <BsInfoCircle className="size-4" />
            <p>* Required fields</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-6">
            {/* Meta Title */}
            <div>
              <FormInput
                label="Meta Title"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                placeholder="Enter meta title for your store"
                required
                maxLength={60}
              />

              <div className="mt-1 flex items-center justify-between text-xs text-neutral-500">
                <p>
                  This appears as the page title in search results and browser
                  tabs
                </p>
                <p
                  className={`${formData.metaTitle.length > 60 ? "text-red-500" : ""}`}
                >
                  {formData.metaTitle.length}/60
                </p>
              </div>
            </div>

            {/* Meta Description */}
            <div>
              <label
                htmlFor="metaDescription"
                className="mb-1.5 block text-sm font-medium"
              >
                Meta Description: <span className="text-red-600">*</span>
              </label>
              <textarea
                id="metaDescription"
                name="metaDescription"
                placeholder="Enter meta description for your store"
                rows={4}
                maxLength={160}
                required
                onChange={handleDescriptionChange}
                value={formData.metaDescription}
                className="w-full resize-none rounded border border-neutral-200 bg-neutral-50 px-4 py-3 outline-none focus:border-neutral-400"
              />
              <div className="mt-1 flex items-center justify-between text-xs text-neutral-500">
                <p>This appears as the description snippet in search results</p>
                <p
                  className={`${formData.metaDescription.length > 160 ? "text-red-500" : ""}`}
                >
                  {formData.metaDescription.length}/160
                </p>
              </div>
            </div>

            {/* Preview Section */}
            <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-3 text-sm font-semibold text-gray-700">
                Search Engine Preview Example:
              </h3>
              <div className="rounded border bg-white p-4">
                <div className="cursor-pointer text-lg font-medium text-blue-600 hover:underline">
                  {"Your Store Title"}
                </div>
                <div className="mt-1 text-sm text-green-700">
                  https://yourstore.com
                </div>
                <div className="mt-2 text-sm leading-relaxed text-gray-600">
                  {"Your store description will appear here..."}
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                type="button"
                // onClick={() => navigate("/seo")}
                className="min-h-10 rounded border border-gray-400 px-6 py-2 text-gray-800 transition-all duration-200 ease-linear hover:bg-gray-200 active:scale-[0.98]"
              >
                Cancel
              </button>

              <ActionBtn type="submit" disabled={isDisabled}>
                Add SEO & Meta Tags
              </ActionBtn>
            </div>
          </form>
        </>
      ) : (
        <div className="mt-8 flex flex-col items-center justify-center rounded-lg border-gray-300 bg-gray-50 p-12 text-center">
          <BsShop className="mx-auto size-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No store selected
          </h3>
          <p className="mt-2 text-gray-500">
            Please select a store to add or update meta tags.
          </p>
        </div>
      )}
    </section>
  );
}
