import { useState } from "react";
import { Link } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CircleX, FolderTree } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import SubCategoryList from "../components/sections/sub-category/SubCategoryList";
import PageHeader from "../components/PageHeader";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import useGetCategories from "../hooks/category/useGetCategories";
import useSelectedStore from "@/hooks/useSelectedStore";
import usePostMutation from "@/hooks/api/usePostMutation";
import useAuth from "@/hooks/auth/useAuth";
import useGetSubCategories from "../hooks/category/useGetSubCategories";
import EmptyStoreState from "../components/EmptyStoreState";

const SUBCATEGORY_BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    dropdown: [
      { label: "Category", href: "/products/category" },
      { label: "Brands", href: "/products/brands" },
      { label: "Add Product", href: "/products/add-product" },
      { label: "Inventory", href: "/products/inventory" },
    ],
  },
  { label: "Subcategory" },
];

export default function SubCategory() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { selectedStore } = useSelectedStore();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryInput, setSubCategoryInput] = useState("");
  const [subCategoires, setSubCategories] = useState([]);

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
    clientId: user?.data?.clientid,
  });

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

  if (!selectedStore) {
    return (
      <EmptyStoreState
        title="No Store Selected"
        description="Create a store before adding subcategories to organize your product catalog."
      />
    );
  }

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={SUBCATEGORY_BREADCRUMB_ITEMS} />

      {/* Page Header */}
      <PageHeader
        icon={FolderTree}
        title="Add Subcategory"
        description="Create and manage subcategories for"
      />

      {selectedStore?.storeId && (
        <div className="mt-6 grid grid-cols-12 gap-y-12 lg:gap-x-12">
          {/* Left Side: Add Sub-Category Form */}
          <div className="col-span-12 h-fit rounded border border-neutral-200 px-4 py-2 lg:col-span-4">
            {/* select category */}
            {categories?.data?.length > 0 && (
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
              <div className="flex flex-col items-center justify-center px-4 py-6 text-center text-sm text-gray-500">
                <p className="mb-4">No categories found for this store.</p>
                <Link
                  to="/products/category"
                  className="bg-dashboard-primary hover:bg-dashboard-primary/90 rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors"
                >
                  Create New Category
                </Link>
              </div>
            )}

            {selectedCategory && categories?.data?.length > 0 && (
              <div className="mt-4">
                <label
                  htmlFor="subCategoryName"
                  className="text-sm font-medium"
                >
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
                    className={`${
                      subCategoryInput
                        ? "bg-dashboard-primary"
                        : "bg-neutral-400"
                    } absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer rounded-r px-4 py-1 text-white`}
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
                        <CircleX className="text-lg" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  disabled={subCategoires.length < 0}
                  onClick={handleAddSubCategory}
                  className={`mt-4 flex min-h-10 w-full items-center justify-center rounded px-4 py-2 transition duration-200 ease-in-out ${
                    subCategoires.length > 0
                      ? "bg-dashboard-primary/90 hover:bg-dashboard-primary cursor-pointer text-white"
                      : "bg-neutral-200 text-neutral-600"
                  }`}
                >
                  {isPending ? <Spinner /> : "Add Sub-Category"}
                </button>
              </div>
            )}
          </div>

          {/* Right Side: List of Sub-Categories */}
          <div className="col-span-12 rounded border border-neutral-200 lg:col-span-8">
            <h3 className="bg-neutral-100 px-4 py-2 font-semibold">
              All Sub-Categories
            </h3>
            {selectedCategory ? (
              <ul>
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
                  <div className="px-4 py-6 text-center text-sm text-gray-500">
                    No sub-categories found for this store. Start by adding a
                    new one.
                  </div>
                )}
              </ul>
            ) : (
              <div className="px-4 py-6 text-center text-sm text-gray-500">
                Select a category to view sub-categories for this store.
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
