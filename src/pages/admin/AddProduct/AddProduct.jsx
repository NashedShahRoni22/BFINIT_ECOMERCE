import { useState } from "react";
import SunEditor from "suneditor-react";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import AddImages from "../AddImages/AddImages";
import CheckBoxFeat from "./CheckBoxFeat";
import InputField from "./InputField";
import SelectDropdown from "./SelectDropdown";
import "suneditor/dist/css/suneditor.min.css";

const options = [
  {
    title: "CPU",
  },
  {
    title: "GPU",
  },
];

export default function AddProduct() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subCategory: "",
    originalPrice: "",
    discountPercent: "",
    quantity: "",
    shippingCharge: "",
    brand: "",
    status: "yes",
    bestSelling: "",
    flashSell: "",
    featured: "",
    new: "",
    description: "",
  });

  // Handle input field and chekbox
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle description of suneditor
  const handleDescriptionChange = (content) => {
    setFormData((prev) => ({ ...prev, description: content }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.description === "") {
      return alert("Description can not be empty!");
    }

    if (selectedImages.length <= 0) {
      return alert("Please select at least 1 image!");
    }
    console.log(formData);
  };

  return (
    <section>
      <PageHeading heading="Add New Product" />

      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-12 gap-5">
        {/* General Info */}
        <div className="col-span-12 rounded-md border border-neutral-200 px-4 pt-6 pb-4 lg:col-span-8">
          <h4 className="mb-6 font-semibold">General Information</h4>
          {/* name */}
          <InputField
            label="Product Name"
            id="name"
            name="name"
            formData={formData.name}
            required={true}
            handleInputChange={handleInputChange}
          />

          <div className="grid grid-cols-2 gap-4">
            {/* category */}
            <div>
              <SelectDropdown
                label="Category"
                id="category"
                name="category"
                formData={formData.category}
                required={true}
                handleInputChange={handleInputChange}
                options={options}
              />
            </div>
            {/* subCategory */}
            <div>
              <SelectDropdown
                label="Sub-Category"
                id="subCategory"
                name="subCategory"
                formData={formData.subCategory}
                required={true}
                handleInputChange={handleInputChange}
                options={options}
              />
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
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {/* base price */}
            <div className="w-full">
              <label
                htmlFor="originalPrice"
                className={`text-sm text-gray-600`}
              >
                Original Price
              </label>
              <br />
              <div className="relative w-full">
                <input
                  className="mt-1 mb-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-6 py-1.5 outline-none"
                  type="text"
                  id="originalPrice"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  required
                />
                <span className="absolute top-1/2 left-2 -translate-y-1/2 pb-1 text-lg">
                  $
                </span>
              </div>
            </div>
            {/* discount percentage */}
            <div>
              <InputField
                label="Discount Percentage (%)"
                id="discountPercent"
                name="discountPercent"
                formData={formData.discountPercent}
                handleInputChange={handleInputChange}
              />
            </div>

            {/* quantity */}
            <div>
              <InputField
                label="Quantity"
                id="quantity"
                name="quantity"
                formData={formData.quantity}
                required={true}
                handleInputChange={handleInputChange}
              />
            </div>

            {/* shipping charge */}
            <div>
              <InputField
                label="Shipping Charge (optional)"
                id="shippingCharge"
                name="shippingCharge"
                formData={formData.shippingCharge}
                handleInputChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Brand & Status */}
        <div className="col-span-12 rounded-lg border border-neutral-200 px-4 pt-6 pb-4 lg:col-span-4">
          <h4 className="mb-6 font-semibold">Brand & Status</h4>
          {/* brand */}
          <SelectDropdown
            label="Brand"
            id="brand"
            name="brand"
            formData={formData.brand}
            required={true}
            handleInputChange={handleInputChange}
            options={options}
          />

          {/* Status */}
          <CheckBoxFeat
            label="Status"
            customLabel1="Active"
            customLabel2="Deactive"
            name="status"
            id1="active"
            id2="deactive"
            formData={formData.status}
            handleInputChange={handleInputChange}
          />
        </div>

        {/* Product Featured */}
        <div className="col-span-12 rounded-lg border border-neutral-200 px-4 pt-6 pb-4">
          <div className="grid grid-cols-4">
            {/* best selling */}
            <CheckBoxFeat
              label="Best Selling"
              name="bestSelling"
              id1="bestYes"
              id2="bestNo"
              formData={formData.bestSelling}
              handleInputChange={handleInputChange}
            />

            {/* flash sale */}
            <CheckBoxFeat
              label="Flash Sale"
              name="flashSell"
              id1="flashYes"
              id2="flashNo"
              formData={formData.flashSell}
              handleInputChange={handleInputChange}
            />

            {/* featured */}
            <CheckBoxFeat
              label="Featured"
              name="featured"
              id1="featuredYes"
              id2="featuredNo"
              formData={formData.featured}
              handleInputChange={handleInputChange}
            />

            {/* New Arrival */}
            <CheckBoxFeat
              label="New Arrival"
              name="new"
              id1="newYes"
              id2="newNo"
              formData={formData.new}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>

        {/* Description */}
        <div className="col-span-12 rounded-lg border border-neutral-200 px-4 pt-6 pb-4">
          <h4 className="mb-6 font-semibold">Description</h4>
          <SunEditor
            onChange={handleDescriptionChange}
            name="description"
            height="220px"
            setOptions={{
              buttonList: [
                [
                  "undo",
                  "redo",
                  "formatBlock",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                ],
                [
                  "fontSize",
                  "fontColor",
                  "hiliteColor",
                  "align",
                  "list",
                  "link",
                  "image",
                  "video",
                ],
                ["removeFormat", "preview"],
              ],
              charCounter: true,
            }}
          />
        </div>

        {/* submit button */}
        <div className="col-span-12 mt-12 mb-5 text-center">
          <button
            type="submit"
            className="bg-dashboard-primary/90 hover:bg-dashboard-primary cursor-pointer rounded px-4 py-1 text-white transition duration-200 ease-in-out"
          >
            Add New Product
          </button>
        </div>
      </form>
    </section>
  );
}
