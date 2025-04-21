import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { MdOutlineClose } from "react-icons/md";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import Spinner from "../../../components/admin/loaders/Spinner";
import useAuth from "../../../hooks/auth/useAuth";
import usePostMutation from "../../../hooks/mutations/usePostMutation";
import useGetCategories from "../../../hooks/categories/useGetCategories";
import useGetSubCategories from "../../../hooks/categories/subCategories/useGetSubCategories";
import useGetStores from "../../../hooks/stores/useGetStores";
import SubCategoryList from "../../../components/admin/SubCategoryList";

export default function SubCategory() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [selectedStore, setSelectedStore] = useState({
    storeId: "",
    storeName: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryInput, setSubCategoryInput] = useState("");
  const [subCategoires, setSubCategories] = useState([]);

  // fetch stores
  const { data: stores } = useGetStores();
  // fetch categories based on storeId
  const { data: categories } = useGetCategories(selectedStore?.storeId);
  // fetch sub-categories based on storeId & categoryId
  const { data: subCategoriesData } = useGetSubCategories(
    selectedStore?.storeId,
    selectedCategory,
  );

  // custom hooks to create new sub-category
  const { mutate, isPending } = usePostMutation({
    endpoint: `/subcategory/create/${selectedStore?.storeId}/${selectedCategory}`,
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

  // handle category select dropdown
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // handle add sub-categories array in local state
  const handleSubCategories = (e) => {
    if (!subCategoryInput) {
      return;
    }

    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      setSubCategories([...subCategoires, subCategoryInput]);
      setSubCategoryInput("");
    }
  };

  // remove sub-category from local subCategories array
  const removeSubCategory = (indexToRemove) => {
    const filteredSubCategories = subCategoires.filter(
      (_, index) => index !== indexToRemove,
    );
    setSubCategories(filteredSubCategories);
  };

  // Add New Sub-Catgory
  const handleAddSubCategory = () => {
    const subCategoriesObj = {
      subcategories: subCategoires,
    };

    mutate(subCategoriesObj, {
      onSuccess: () => {
        setSubCategories([]);
        toast.success("New Sub-category created!");
        queryClient.invalidateQueries([
          "subCategories",
          selectedStore?.storeId,
          selectedCategory,
        ]);
      },
      onError: () => {
        setSubCategories([]);
        toast.error("Something went wrong!");
      },
    });
  };

  return (
    <section>
      <PageHeading heading="Add Sub-Category" />
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {/* Left Side: Add Sub-Category Form */}
        <div>
          {/* select store */}
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

            {stores &&
              stores?.storeData?.length > 0 &&
              stores?.storeData?.map((store) => (
                <option key={store?.storeId} value={store?.storeId}>
                  {store?.storeName}
                </option>
              ))}
          </select>

          {/* select category */}
          {selectedStore?.storeId && categories?.data?.length > 0 && (
            <>
              <label htmlFor="category" className="text-sm text-gray-600">
                Select Category
              </label>
              <select
                id="category"
                name="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="mt-1 mb-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
              >
                <option value="">Select a category</option>
                {categories &&
                  categories?.data &&
                  categories?.data?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </>
          )}

          {selectedStore?.storeId && !categories?.data?.length > 0 && (
            <div>
              <p className="text-gray-600">No categories found</p>
            </div>
          )}

          {selectedCategory && categories?.data?.length > 0 && (
            <div className="mt-4">
              <label htmlFor="subCategoryName" className="text-sm font-medium">
                Sub-Category Name
              </label>
              <div className="relative mt-1.5">
                <input
                  type="text"
                  id="subCategoryName"
                  name="subCategoryName"
                  value={subCategoryInput}
                  onChange={(e) => setSubCategoryInput(e.target.value)}
                  onKeyDown={handleSubCategories}
                  className="w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
                  placeholder="Enter sub-category name"
                />
                <button
                  className={`${subCategoryInput ? "bg-dashboard-primary" : "bg-neutral-400"} absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer rounded-r px-4 py-1 text-white`}
                  onClick={handleSubCategories}
                >
                  Add
                </button>
              </div>
              {/* sub-categories */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {subCategoires.map((subCat, i) => (
                  <div
                    key={i}
                    className="bg-dashboard-primary/85 hover:bg-dashboard-primary inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-sm text-white transition-all duration-200 ease-linear"
                  >
                    <p>{subCat}</p>
                    <button
                      className="cursor-pointer"
                      onClick={() => removeSubCategory(i)}
                    >
                      <MdOutlineClose className="text-lg" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                disabled={subCategoires.length < 0}
                onClick={handleAddSubCategory}
                className={`mt-4 flex min-h-10 w-full items-center justify-center rounded px-4 py-2 transition duration-200 ease-in-out ${subCategoires.length > 0 ? "bg-dashboard-primary/90 hover:bg-dashboard-primary cursor-pointer text-white" : "bg-neutral-200 text-neutral-600"}`}
              >
                {isPending ? <Spinner /> : "Add Sub-Category"}
              </button>
            </div>
          )}
        </div>

        {/* Right Side: List of Sub-Categories */}
        <div>
          <p className="mb-2 rounded bg-neutral-50 px-4 py-2 font-semibold">
            Existing Sub-Categories
          </p>
          {selectedCategory ? (
            <ul className="space-y-2">
              {subCategoriesData && subCategoriesData?.data?.length > 0 ? (
                subCategoriesData?.data?.map((subCategory, i) => (
                  <SubCategoryList
                    key={i}
                    subCategory={subCategory}
                    categoryId={selectedCategory}
                    storeId={selectedStore?.storeId}
                  />
                ))
              ) : (
                <p className="bg-neutral-50 px-4 pb-2">
                  No sub-categories found. Start by adding a new one.
                </p>
              )}
            </ul>
          ) : (
            <p className="bg-neutral-50 px-4 pb-2">
              Select a category to view sub-categories.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
