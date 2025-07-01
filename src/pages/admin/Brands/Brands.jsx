import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import BtnSubmit from "../../../components/admin/buttons/BtnSubmit";
import ImageField from "../../../components/admin/ImageField/ImageField";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import useAuth from "../../../hooks/auth/useAuth";
import usePostMutation from "../../../hooks/mutations/usePostMutation";
import useGetStores from "../../../hooks/stores/useGetStores";
import useGetBrands from "../../../hooks/brands/useGetBrands";
import { handleImgChange } from "../../../utils/admin/handleImgChange";
import { handleRemoveImg } from "../../../utils/admin/handleRemoveImg";
import BrandList from "../../../components/admin/BrandList";

export default function Brands() {
  const [searchParams, setSearchParams] = useSearchParams();
  const storeId = searchParams.get("storeId") || "";
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [selectedImages, setSelectedImages] = useState({
    brandIcon: null,
  });
  const [selectedStore, setSelectedStore] = useState({
    storeId,
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
    clientId: user?.data?.clientid,
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

      {/* Store Selection */}
      <div className="my-6 flex flex-wrap items-center justify-between">
        {selectedStore.storeId ? (
          <h3 className="text-lg font-semibold">
            Managing brands for:{" "}
            <span className="text-dashboard-primary">
              {selectedStore.storeName}
            </span>
          </h3>
        ) : (
          <h3 className="text-lg font-semibold">
            Select a store to view and manage its brands
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

      {selectedStore.storeId && (
        <div className="mt-6 grid grid-cols-12 gap-y-12 lg:gap-x-12">
          {/* image & category name field container */}
          <form
            onSubmit={handleFormSubmit}
            className="col-span-12 h-fit rounded border border-neutral-200 px-4 py-2 lg:col-span-4"
          >
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
                Brand Name: <span className="text-red-600">*</span>
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
          </form>

          {/* all brand lists container */}
          <div className="col-span-12 rounded border border-neutral-200 lg:col-span-8">
            <h3 className="bg-neutral-100 px-4 py-2 font-semibold">
              All Brands
            </h3>

            <ul>
              {brands && brands?.data?.length > 0 ? (
                brands?.data?.map((brand) => (
                  <BrandList
                    key={brand.id}
                    brand={brand}
                    storeId={selectedStore?.storeId}
                  />
                ))
              ) : (
                <div className="px-4 py-6 text-center text-sm text-gray-500">
                  No brands found for this store. Start by adding a new one.
                </div>
              )}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
