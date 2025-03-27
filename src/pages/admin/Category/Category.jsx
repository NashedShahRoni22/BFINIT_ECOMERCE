import { useContext, useState } from "react";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import ImageField from "../../../components/admin/ImageField/ImageField";
import { handleImgChange } from "../../../utils/admin/handleImgChange";
import { handleRemoveImg } from "../../../utils/admin/handleRemoveImg";
import BtnSubmit from "../../../components/admin/buttons/BtnSubmit";
import EditableListItem from "../../../components/admin/EditableListItem/EditableListItem";
import { AuthContext } from "../../../Providers/AuthProvider";

export default function Category() {
  const storeId = "67e4f15d94735d0dc19928cb";
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Category 1",
      img: "https://img.icons8.com/fluency/36/image--v1.png",
    },
    {
      id: 2,
      name: "Category 2",
      img: "https://img.icons8.com/fluency/36/image--v1.png",
    },
    {
      id: 3,
      name: "Category 3",
      img: "https://img.icons8.com/fluency/36/image--v1.png",
    },
  ]);
  const [selectedImages, setSelectedImages] = useState({
    categoryIcon: null,
  });
  const [categoryName, setCategoryName] = useState("");

  const [selectedStore, setSelectedStore] = useState("");

  const handleStoreChange = (e) => {
    setSelectedStore(e.target.value);
  };

  // create new category
  const createNewCategory = async (e) => {
    e.preventDefault();

    if (!categoryName) {
      return window.alert("Category Name is required!");
    }

    const formDataObj = new FormData();

    formDataObj.append("categoryName", JSON.stringify(categoryName));
    formDataObj.append("categoryImage", selectedImages.categoryIcon);

    try {
      const res = await fetch(
        `https://ecomback.bfinit.com/category/create/${storeId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: formDataObj,
        },
      );
      const data = await res.json();
      console.log("category name create:", data);
    } catch (error) {
      console.error("category name create error", error);
    }
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
            value={selectedStore}
            onChange={handleStoreChange}
            className="mt-1 mb-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
          >
            <option value="" disabled>
              Select a store
            </option>
            {Array.from({ length: 5 }).map((_, i) => (
              <option key={i} value={i + 1}>
                Store {i + 1}
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
                Store {selectedStore} Categories
              </p>

              <ul className="space-y-2">
                {categories && categories.length > 0 ? (
                  categories.map((subCat) => (
                    <EditableListItem key={subCat.id} item={subCat} />
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
              Categories.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
