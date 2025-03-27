import { useState } from "react";
import BtnSubmit from "../../../components/admin/buttons/BtnSubmit";
import EditableListItem from "../../../components/admin/EditableListItem/EditableListItem";
import ImageField from "../../../components/admin/ImageField/ImageField";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import { handleImgChange } from "../../../utils/admin/handleImgChange";
import { handleRemoveImg } from "../../../utils/admin/handleRemoveImg";

export default function Brands() {
  const [brands, setBrands] = useState([
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
    brandIcon: null,
  });
  const [selectedStore, setSelectedStore] = useState("");

  const handleStoreChange = (e) => {
    setSelectedStore(e.target.value);
  };

  return (
    <section>
      <PageHeading heading="Create & Manage Brands" />

      <div className="mt-6 grid grid-cols-12 lg:gap-x-12">
        {/* image & category name field container */}
        <form className="col-span-12 lg:col-span-4">
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
                <BtnSubmit label="Add New Brand" />
              </div>
            </>
          )}
        </form>

        {/* all brand lists container */}
        <div className="col-span-12 lg:col-span-8">
          {selectedStore ? (
            <>
              <p className="rounded bg-neutral-50 px-4 py-2 font-semibold">
                Store {selectedStore} Brands
              </p>
              <ul className="space-y-2">
                {brands && brands.length > 0 ? (
                  brands.map((brand) => (
                    <EditableListItem key={brand.id} item={brand} />
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
