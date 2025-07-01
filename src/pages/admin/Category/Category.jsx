import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import ImageField from "../../../components/admin/ImageField/ImageField";
import { handleRemoveImg } from "../../../utils/admin/handleRemoveImg";
import EditableListItem from "../../../components/admin/EditableListItem/EditableListItem";
import { AuthContext } from "../../../Providers/AuthProvider";
import ListItemSkeleton from "../../../components/admin/loaders/ListItemSkeleton";
import Spinner from "../../../components/admin/loaders/Spinner";
import usePostMutation from "../../../hooks/mutations/usePostMutation";
import useGetCategories from "../../../hooks/categories/useGetCategories";
import { handleImgChange } from "../../../utils/admin/handleImgChange";
import useGetStores from "../../../hooks/stores/useGetStores";
import { useSearchParams } from "react-router";

export default function Category() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const storeId = searchParams.get("storeId") || "";
  const { user } = useContext(AuthContext);
  const imageFieldRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState({
    categoryIcon: null,
  });
  const [categoryName, setCategoryName] = useState("");
  const [selectedStore, setSelectedStore] = useState({
    storeId,
    storeName: "",
  });

  // fetch stores
  const { data: stores } = useGetStores();
  // fetch categories based on storeId
  const {
    data: categories,
    isLoading,
    isError,
  } = useGetCategories(selectedStore?.storeId);

  // on component mount or page reload keep the store name
  useEffect(() => {
    if (stores && stores?.data?.length > 0) {
      const foundStore = stores.data.find((store) => store.storeId === storeId);
      if (foundStore) {
        setSelectedStore({
          storeId,
          storeName: foundStore.storeName,
        });
      }
    }
  }, [stores, storeId]);

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

  // custom post hooks
  const { mutate, isPending } = usePostMutation({
    endpoint: `/category/create/${selectedStore?.storeId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  // create new category
  const createNewCategory = async (e) => {
    e.preventDefault();

    // category icon & name validation
    if (selectedImages.categoryIcon === null) {
      return toast.error("Category icon is required!");
    } else if (!categoryName) {
      return toast.error("Category name is required!");
    }

    const formDataObj = new FormData();
    formDataObj.append("categoryName", categoryName);
    formDataObj.append("categoryImage", selectedImages.categoryIcon);

    mutate(formDataObj, {
      onSuccess: () => {
        setCategoryName("");
        setSelectedImages({ categoryIcon: null });

        // update cached categories with new category
        queryClient.invalidateQueries(["categories", selectedStore?.storeId]);
        toast.success("New category created!");
      },

      onError: () => {
        setCategoryName("");
        setSelectedImages({ categoryIcon: null });
        toast.error("Something went wrong!");
      },
    });
  };

  return (
    <section>
      <PageHeading heading="Add New Category" />

      {/* Store Selection */}
      <div className="my-6 flex flex-wrap items-center justify-between">
        {selectedStore.storeId ? (
          <h3 className="text-lg font-semibold">
            Manage categories of:{" "}
            <span className="text-dashboard-primary">
              {selectedStore.storeName}
            </span>
          </h3>
        ) : (
          <h3 className="text-lg font-semibold">
            Select a store to add new category
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

      {selectedStore?.storeId && (
        <div className="mt-6 grid grid-cols-12 gap-y-12 lg:gap-x-12">
          {/* image & category name field container */}
          <form
            onSubmit={createNewCategory}
            className="col-span-12 h-fit rounded border border-neutral-200 px-4 py-2 lg:col-span-4"
          >
            <ImageField
              ref={imageFieldRef}
              id="categoryIcon"
              label="Category Icon"
              selectedImg={selectedImages.categoryIcon}
              handleImgChange={(e) =>
                handleImgChange(e, "categoryIcon", setSelectedImages)
              }
              handleRemoveImg={() =>
                handleRemoveImg("categoryIcon", setSelectedImages)
              }
            />

            <div className="mt-4">
              <label htmlFor="category" className="text-sm font-medium">
                Category Name: <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="category"
                id="category"
                required
                onChange={(e) => setCategoryName(e.target.value)}
                value={categoryName}
                className="mt-1.5 w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
              />
            </div>

            <div className="mt-8 text-center">
              <button
                className="bg-dashboard-primary/90 hover:bg-dashboard-primary flex w-full cursor-pointer items-center justify-center rounded px-4 py-2 text-white transition-all duration-200 ease-in-out"
                type="submit"
                disabled={isPending}
              >
                {isPending ? <Spinner /> : "Add New Category"}
              </button>
            </div>
          </form>

          {/* all category lists container */}
          <div className="col-span-12 rounded border border-neutral-200 lg:col-span-8">
            <h3 className="bg-neutral-100 px-4 py-2 font-semibold">
              All Categories
            </h3>

            <ul>
              {selectedStore?.storeId &&
              !isError &&
              (isLoading || !categories?.data)
                ? Array.from({ length: 4 }).map((_, i) => (
                    <ListItemSkeleton key={`skeleton-${i}`} />
                  ))
                : categories?.data?.map((category) => (
                    <EditableListItem
                      key={category.id}
                      category={category}
                      selectedStore={selectedStore}
                    />
                  ))}
            </ul>

            {selectedStore?.storeId &&
              !isError &&
              !isLoading &&
              !categories?.data?.length > 0 && (
                <div className="px-4 py-6 text-center text-sm text-gray-500">
                  No categories found for this store. Start by adding a new one.
                </div>
              )}

            {isError && (
              <p className="flex items-center text-red-500">
                <span className="mr-1">⚠️</span>
                Something went wrong! Please try again.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
