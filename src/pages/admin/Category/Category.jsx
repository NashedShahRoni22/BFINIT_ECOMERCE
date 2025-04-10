import { useContext, useState } from "react";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import ImageField from "../../../components/admin/ImageField/ImageField";
import { handleImgChange } from "../../../utils/admin/handleImgChange";
import { handleRemoveImg } from "../../../utils/admin/handleRemoveImg";
import EditableListItem from "../../../components/admin/EditableListItem/EditableListItem";
import { AuthContext } from "../../../Providers/AuthProvider";
import useCategoryQuery from "../../../hooks/useGetCategoryQuery";
import ListItemSkeleton from "../../../components/admin/loaders/ListItemSkeleton";
import useCreateCategory from "../../../hooks/useCreateCategory";
import toast from "react-hot-toast";
import Spinner from "../../../components/admin/loaders/Spinner";
import { useQueryClient } from "@tanstack/react-query";

export default function Category() {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const [selectedImages, setSelectedImages] = useState({
    categoryIcon: null,
  });
  const [categoryName, setCategoryName] = useState("");
  const [selectedStore, setSelectedStore] = useState("");

  // fetch categories based on storeId
  const {
    isLoading,
    isError,
    data: categories,
  } = useCategoryQuery({
    storeId: selectedStore?.storeId,
    token: user?.token,
  });

  // create new category
  const { mutate, isPending } = useCreateCategory({
    storeId: selectedStore?.storeId,
    token: user?.token,
  });

  // Handle store select dropdown
  const handleStoreChange = async (e) => {
    const selectedStoreId = e.target.value;
    const foundStore = user?.data?.EStore?.find(
      (store) => store.storeId === selectedStoreId,
    );
    setSelectedStore(foundStore);
  };

  // create new category
  const createNewCategory = async (e) => {
    e.preventDefault();
    if (!categoryName || selectedImages.categoryIcon === null) {
      return toast.error("Category Name & Image is required!");
    }

    const formDataObj = new FormData();
    formDataObj.append("categoryName", categoryName);
    formDataObj.append("categoryImage", selectedImages.categoryIcon);

    mutate(formDataObj, {
      onSuccess: (newCategory) => {
        setCategoryName("");
        setSelectedImages({ categoryIcon: null });
        // update cached categories with new category
        queryClient.setQueryData(["categories", selectedStore?.storeId], () => {
          return {
            data: newCategory.categories,
          };
        });
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

      <div className="mt-6 grid grid-cols-12 lg:gap-x-12">
        {/* image & category name field container */}
        <form
          onSubmit={createNewCategory}
          className="col-span-12 lg:col-span-4"
        >
          <label htmlFor="store" className="text-sm text-gray-600">
            Select Store
          </label>
          <select
            id="store"
            name="store"
            value={selectedStore?.storeId || ""}
            onChange={handleStoreChange}
            className="mt-1 mb-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
          >
            <option value="" disabled>
              Select a store
            </option>

            {user?.data?.EStore &&
              user?.data?.EStore?.length > 0 &&
              user?.data?.EStore?.map((store) => (
                <option key={store?.storeId} value={store?.storeId}>
                  {store?.storeName}
                </option>
              ))}
          </select>

          {selectedStore && (
            <>
              <ImageField
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
                  Category Name:
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
            </>
          )}
        </form>

        {/* all category lists container */}
        <div className="col-span-12 lg:col-span-8">
          {selectedStore ? (
            <p className="bg-neutral-50 px-4 py-2">
              Categories at{" "}
              <span className="font-semibold text-gray-900">
                {selectedStore?.storeName}
              </span>
            </p>
          ) : (
            <p className="bg-neutral-50 px-4 py-2">
              <span className="font-medium">Select a Store</span> to view all
              Categories.
            </p>
          )}

          {selectedStore && !isError && (isLoading || !categories?.data)
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

          {selectedStore &&
            !isError &&
            !isLoading &&
            !categories?.data?.length > 0 && (
              <p>No category found. Please create a new one.</p>
            )}

          {isError && (
            <p className="flex items-center text-red-500">
              <span className="mr-1">⚠️</span>
              Something went wrong! Please try again.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
