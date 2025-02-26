import { useState } from "react";
import PageHeading from "./PageHeading";
import AddImages from "../AddImages/AddImages";

export default function AddProduct() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  return (
    <section>
      <PageHeading />

      <form className="mt-6 grid grid-cols-12 gap-5 px-5">
        {/* General Info */}
        <div className="col-span-12 rounded-md border border-neutral-200 px-4 pt-6 pb-4 lg:col-span-8">
          <h4 className="mb-6 font-semibold">General Information</h4>
          <label htmlFor="title" className={`text-sm text-gray-600`}>
            Product Name
          </label>
          <br />
          <input
            className="mt-1 mb-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
            type="text"
            id="title"
          />
          <br />
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="category" className={`text-sm text-gray-600`}>
                Category
              </label>
              <br />
              <select
                id="category"
                className="mt-1 mb-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
                defaultValue={""}
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="cpu">CPU</option>
                <option value="gpu">Graphics Card</option>
              </select>
            </div>
            <div className="w-1/2">
              <label htmlFor="subcategory" className={`text-sm text-gray-600`}>
                Subcategory
              </label>
              <br />
              <select
                id="subcategory"
                className="mt-1 mb-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
                defaultValue={""}
              >
                <option value="" disabled>
                  Select Subcategory
                </option>
                <option value="cpu">Computer Parts</option>
                <option value="gpu">Graphics</option>
              </select>
            </div>
          </div>
        </div>

        {/* Add Image */}
        <AddImages
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          imagePreviews={imagePreviews}
          setImagePreviews={setImagePreviews}
        />

        {/* Pricing */}
        <div className="col-span-12 rounded-lg border border-neutral-200 bg-white px-4 pt-6 pb-4 lg:col-span-8">
          <h4 className="mb-6 font-semibold">Pricing</h4>
          <div className="flex items-center gap-4">
            <div className="w-full">
              <label
                htmlFor="originalPrice"
                className={`text-sm text-gray-600`}
              >
                Base Price
              </label>
              <br />
              <div className="relative w-full">
                <input
                  className="mt-1 mb-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-6 py-1.5 outline-none"
                  type="text"
                  id="originalPrice"
                />
                <span className="absolute top-1/2 left-2 -translate-y-1/2 pb-1 text-lg">
                  $
                </span>
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="discount_percent"
                className="text-sm text-gray-600"
              >
                Discount Percentage (%)
              </label>
              <br />
              <input
                className="mt-1 mb-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
                type="text"
                id="discount_percent"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="discount_percent"
                className="text-sm text-gray-600"
              >
                Quantity
              </label>
              <br />
              <input
                className="mt-1 mb-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
                type="text"
                id="discount_percent"
              />
            </div>
          </div>
        </div>

        {/* Brand & Status */}
        <div className="col-span-12 rounded-lg border border-neutral-200 px-4 pt-6 pb-4 lg:col-span-4">
          <h4 className="mb-6 font-semibold">Brand & Status</h4>
          <label htmlFor="category" className="text-sm text-gray-600">
            Select Brand
          </label>
          <br />
          <select
            className="mt-1 mb-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
            id="category"
            defaultValue=""
          >
            <option value="" disabled>
              Select Brand
            </option>
            <option value="">Intel</option>
            <option value="">AMD</option>
          </select>
          <br />

          {/* Status */}
          <label htmlFor="is_new" className="text-sm text-gray-600">
            Status
          </label>
          <br />
          <div className="mt-1 mb-2 flex w-full items-center gap-4 px-2 py-1.5">
            <div>
              <input type="checkbox" name="new" id="new" /> Active
            </div>
            <div>
              <input type="checkbox" name="new" id="new" /> Deactive
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
