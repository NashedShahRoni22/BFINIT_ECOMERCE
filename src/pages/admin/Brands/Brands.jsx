import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import BtnSubmit from "../../../components/admin/buttons/BtnSubmit";
import EditableListItem from "../../../components/admin/EditableListItem/EditableListItem";
import ImageField from "../../../components/admin/ImageField/ImageField";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import useAuth from "../../../hooks/useAuth";
import usePostMutation from "../../../hooks/usePostMutation";
import useGetStores from "../../../hooks/useGetStores";
import useGetBrands from "../../../hooks/useGetBrands";
import { handleImgChange } from "../../../utils/admin/handleImgChange";
import { handleRemoveImg } from "../../../utils/admin/handleRemoveImg";

export default function Brands() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [selectedImages, setSelectedImages] = useState({
    brandIcon: null,
  });
  const [selectedStore, setSelectedStore] = useState({
    storeId: "",
    storeName: "",
  });

  // fetch all stores list
  const { data: stores } = useGetStores();

  // fetch all brands
  const { data: brands } = useGetBrands(selectedStore.storeId);

  // custom hook to crete new brand
  const { mutate, isPending } = usePostMutation({
    endpoint: `/brand/create/${selectedStore.storeId}`,
    token: user?.token,
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

  // form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const brandFormData = new FormData();
    brandFormData.append("brandName", form.brand.value);
    brandFormData.append("brandImage", selectedImages.brandIcon);

    mutate(brandFormData, {
      onSuccess: () => {
        toast.success("New brand created!");
        setSelectedImages({ brandIcon: null });
        form.reset();
        queryClient.invalidateQueries(["brands", selectedStore.storeId]);
      },
      onError: () => {
        toast.success("Something went wrong!");
        setSelectedImages({ brandIcon: null });
        form.reset();
      },
    });
  };

  return (
    <section>
      <PageHeading heading="Create & Manage Brands" />

      <div className="mt-6 grid grid-cols-12 lg:gap-x-12">
        {/* image & category name field container */}
        <form onSubmit={handleFormSubmit} className="col-span-12 lg:col-span-4">
          <label htmlFor="store" className="text-sm text-gray-600">
            Select Store
          </label>
          <select
            id="store"
            name="store"
            value={selectedStore.storeId}
            onChange={handleStoreChange}
            className="mt-1 mb-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
          >
            <option value="" disabled>
              Select a store
            </option>
            {stores &&
              stores?.storeData?.length > 0 &&
              stores?.storeData?.map((store) => (
                <option key={store.id} value={store?.storeId}>
                  {store?.storeName}
                </option>
              ))}
          </select>
          {selectedStore.storeId && (
            <>
              <ImageField
                id="brandIcon"
                label="Brand Icon"
                selectedImg={selectedImages.brandIcon}
                handleImgChange={(e) =>
                  handleImgChange(e, "brandIcon", setSelectedImages)
                }
                handleRemoveImg={() =>
                  handleRemoveImg("brandIcon", setSelectedImages)
                }
              />

              <div className="mt-4">
                <label htmlFor="brand" className="text-sm font-medium">
                  Brand Name:
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  required
                  className="mt-1.5 w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
                />
              </div>

              <div className="mt-8 text-center">
                <BtnSubmit isPending={isPending} label="Add New Brand" />
              </div>
            </>
          )}
        </form>

        {/* all brand lists container */}
        <div className="col-span-12 lg:col-span-8">
          {selectedStore.storeId ? (
            <>
              <p className="rounded bg-neutral-50 px-4 py-2 font-semibold">
                Store {selectedStore.storeName} Brands
              </p>
              <ul className="space-y-2">
                {brands && brands?.data?.length > 0 ? (
                  brands?.data?.map((brand) => (
                    <EditableListItem key={brand.id} category={brand} />
                  ))
                ) : (
                  <p className="bg-neutral-50 px-4 pb-2">
                    No sub-categories found. Start by adding a new one.
                  </p>
                )}
              </ul>
            </>
          ) : (
            <p className="bg-neutral-50 px-4 py-2">
              <span className="font-medium">Select a Store</span> to view all
              Brands.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
