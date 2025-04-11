import { useState } from "react";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import EditableListItem from "../../../components/admin/EditableListItem/EditableListItem";
import useAuth from "../../../hooks/useAuth";
import useCreateSubCategory from "../../../hooks/useCreateSubCategory";
import toast from "react-hot-toast";
import Spinner from "../../../components/admin/loaders/Spinner";
import useGetQuery from "../../../hooks/useGetQuery";

export default function SubCategory() {
  const { user } = useAuth();
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");

  // fetch categories based on storeId
  const { data: categories } = useGetQuery({
    endpoint: `/category/?storeId=${selectedStore?.storeId}`,
    token: user?.token,
    queryKey: ["categories", selectedStore?.storeId],
    enabled: !!selectedStore?.storeId && !!user?.token,
  });

  // create new sub category
  const { mutate, isPending } = useCreateSubCategory({
    storeId: selectedStore?.storeId,
    categoryId: selectedCategory,
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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubCategoryNameChange = (e) => {
    setSubCategoryName(e.target.value);
  };

  // Add New Sub-Catgory
  const handleAddSubCategory = () => {
    /* const subCategoryArr = [subCategoryName];
    const subCategoryFormData = {
      subcategories: 
    };
    subCategoryFormData.append("subcategories", subCategoryArr); */
    /* mutate([subCategoryFormData], {
      onSuccess: () => {
        setSubCategoryName("");
        toast.success("New Sub-category created!");
      },
      onError: () => {
        setSubCategoryName("");
        toast.error("Something went wrong!");
      },
    }); */
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

            {user?.data?.EStore &&
              user?.data?.EStore?.length > 0 &&
              user?.data?.EStore?.map((store) => (
                <option key={store?.storeId} value={store?.storeId}>
                  {store?.storeName}
                </option>
              ))}
          </select>

          {/* select category */}
          {selectedStore && (
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

          {selectedCategory && categories?.data?.length > 0 && (
            <div className="mt-4">
              <label htmlFor="subCategoryName" className="text-sm font-medium">
                Sub-Category Name
              </label>
              <input
                type="text"
                id="subCategoryName"
                name="subCategoryName"
                value={subCategoryName}
                onChange={handleSubCategoryNameChange}
                className="mt-1.5 w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
                placeholder="Enter sub-category name"
              />
              <button
                disabled={!subCategoryName}
                onClick={handleAddSubCategory}
                className={`mt-4 flex min-h-10 w-full items-center justify-center rounded px-4 py-2 transition duration-200 ease-in-out ${!subCategoryName ? "bg-neutral-200 text-neutral-600" : "bg-dashboard-primary/90 hover:bg-dashboard-primary cursor-pointer text-white"}`}
              >
                {isPending ? <Spinner /> : "Add Sub-Category"}
              </button>
            </div>
          )}
        </div>

        {/* Right Side: List of Sub-Categories */}
        <div>
          <p className="rounded bg-neutral-50 px-4 py-2 font-semibold">
            Existing Sub-Categories
          </p>
          {/* {selectedCategory ? (
            <ul className="space-y-2">
              {filteredSubCategories && filteredSubCategories.length > 0 ? (
                filteredSubCategories.map((subCat) => (
                  <EditableListItem key={subCat.id} item={subCat} />
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
          )} */}
        </div>
      </div>
    </section>
  );
}
