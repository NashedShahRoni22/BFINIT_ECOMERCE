import { useContext, useState } from "react";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import ImageField from "../../../components/admin/ImageField/ImageField";
import { handleImgChange } from "../../../utils/admin/handleImgChange";
import { handleRemoveImg } from "../../../utils/admin/handleRemoveImg";
import BtnSubmit from "../../../components/admin/buttons/BtnSubmit";
import EditableListItem from "../../../components/admin/EditableListItem/EditableListItem";
import { AuthContext } from "../../../Providers/AuthProvider";
import { getCategories } from "../../../api/categories";

export default function Category() {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState({
    categoryIcon: null,
  });
  const [categoryName, setCategoryName] = useState("");
  const [selectedStore, setSelectedStore] = useState("");

  // handle store selectionId dropdown change
  const handleStoreChange = async (e) => {
    const selectedStoreId = e.target.value;
    const foundStore = user?.data?.EStore?.find(
      (store) => store.storeId === selectedStoreId,
    );

    setSelectedStore(foundStore);

    try {
      const categories = await getCategories(selectedStoreId, user?.token);
      if (categories.message === "categories retrived succesfully") {
        setCategories(categories.data);
      }
    } catch (err) {
      console.error(`get categories error: ${err}`);
    }
  };

  // create new category
  const createNewCategory = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!categoryName) {
      return window.alert("Category Name is required!");
    }

    const formDataObj = new FormData();
    formDataObj.append("categoryName", categoryName);
    formDataObj.append("categoryImage", selectedImages.categoryIcon);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/category/create/${selectedStore?.storeId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: formDataObj,
        },
      );
      const data = await res.json();
      if (data.message === "category created successfully") {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("category name create error", error);
    } finally {
      form.reset();
    }
  };

  console.log("all categories:", categories);

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
                <BtnSubmit label="Add New Category" />
              </div>
            </>
          )}
        </form>

        {/* all category lists container */}
        <div className="col-span-12 lg:col-span-8">
          {selectedStore ? (
            <>
              <p className="bg-neutral-50 px-4 py-2">
                Categories at{" "}
                <span className="font-semibold text-gray-900">
                  {selectedStore?.storeName}
                </span>
              </p>

              <ul className="space-y-2">
                {categories && categories.length > 0 ? (
                  categories.map((category) => (
                    <EditableListItem
                      key={category.id}
                      category={category}
                      selectedStore={selectedStore}
                    />
                  ))
                ) : (
                  <p className="bg-neutral-50 px-4 pb-2">
                    No categories found. Start by adding a new one.
                  </p>
                )}
              </ul>
            </>
          ) : (
            <p className="bg-neutral-50 px-4 py-2">
              <span className="font-medium">Select a Store</span> to view all
              Categories.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
