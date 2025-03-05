import { useState } from "react";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import ImageField from "../../../components/admin/ImageField/ImageField";
import { handleImgChange } from "../../../utils/admin/handleImgChange";
import { handleRemoveImg } from "../../../utils/admin/handleRemoveImg";
import BtnSubmit from "../../../components/admin/buttons/BtnSubmit";

export default function Category() {
  const [selectedImages, setSelectedImages] = useState({
    categoryIcon: null,
  });

  return (
    <section>
      <PageHeading heading="Add New Category" />

      <div className="mt-6 grid grid-cols-12 lg:gap-x-12">
        {/* image & category name field container */}
        <form className="col-span-12 lg:col-span-4">
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
              className="mt-1.5 w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
            />
          </div>

          <div className="mt-8 text-center">
            <BtnSubmit label="Add New Category" />
          </div>
        </form>

        {/* all category lists container */}
        <div className="col-span-12 lg:col-span-8">
          <h6 className="rounded bg-neutral-50 px-4 py-2 font-semibold">
            List of Categories
          </h6>
        </div>
      </div>
    </section>
  );
}
