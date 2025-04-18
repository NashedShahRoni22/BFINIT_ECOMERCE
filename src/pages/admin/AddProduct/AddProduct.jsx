import { useState } from "react";
import SunEditor from "suneditor-react";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import AddImages from "../AddImages/AddImages";
import CheckBoxFeat from "./CheckBoxFeat";
import InputField from "./InputField";
import SelectDropdown from "./SelectDropdown";
import "suneditor/dist/css/suneditor.min.css";
import useGetStores from "../../../hooks/useGetStores";
import useGetCategories from "../../../hooks/useGetCategories";
import useGetSubCategories from "../../../hooks/useGetSubCategories";
import useGetBrands from "../../../hooks/useGetBrands";
import toast from "react-hot-toast";
import usePostMutation from "../../../hooks/usePostMutation";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../../components/admin/loaders/Spinner";

export default function AddProduct() {
  const { user } = useAuth();
  const [selectedStore, setSelectedStore] = useState({
    storeId: "",
    storeName: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: {
      id: "",
      name: "",
    },
    subCategory: "",
    originalPrice: "",
    discountPercent: "",
    quantity: "",
    shippingCharge: "",
    brand: {
      id: "",
      name: "",
    },
    status: "yes",
    bestSelling: "",
    flashSell: "",
    featured: "",
    new: "",
    description: "",
  });

  // fetch all stores list
  const { data: stores } = useGetStores();
  // fetch categories based on storeId
  const { data: categories } = useGetCategories(selectedStore?.storeId);
  // fetch sub-categories based on storeId & categoryId
  const { data: subCategoriesData } = useGetSubCategories(
    selectedStore?.storeId,
    formData.category.id,
  );
  // fetch brands based on storeId
  const { data: brandsData } = useGetBrands(selectedStore?.storeId);

  // store select dropdown
  const handleStoreChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex];

    setSelectedStore({
      storeId: e.target.value,
      storeName: selectedOption.text,
    });
  };

  // Handle input field and chekbox
  const handleInputChange = (e) => {
    const { value, name } = e.target;

    if (name === "category" || name === "brand") {
      const selectedIndex = e.target.selectedIndex;
      const selectedName = e.target.options[selectedIndex].text;
      setFormData((prev) => ({
        ...prev,
        [name]: {
          id: value,
          name: selectedName,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle description of suneditor
  const handleDescriptionChange = (content) => {
    setFormData((prev) => ({ ...prev, description: content }));
  };

  // custom hooks of post api
  const { mutate, isPending, isError } = usePostMutation({
    endpoint: `/product/create/${selectedStore?.storeId}`,
    token: user?.token,
  });

  // handle product form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.description === "") {
      return toast.error("Description can't be emtpy!");
    }

    if (!selectedImages || selectedImages.length <= 0) {
      return toast.error("Product Images are required — add at least one!");
    }

    const productData = {
      productName: formData.name,
      productCategory: formData.category.name,
      productSubCategory: formData.subCategory,
      productBrand: formData.brand.name,
      productPrice: formData.originalPrice,
      discountPrice: formData.discountPercent,
      productQuantity: formData.quantity,
      shippingCharges: formData.shippingCharge,
      productStatus: formData.status === "yes" ? true : false,
      bestSelling: formData.bestSelling === "yes" ? true : false,
      flashSale: formData.flashSell === "yes" ? true : false,
      newArraivals: formData.new === "yes" ? true : false,
      productDescription: formData.description,
    };

    const payload = new FormData();

    payload.append("productData", JSON.stringify(productData));
    selectedImages.forEach((image) => {
      payload.append("productImages", image);
    });

    mutate(payload, {
      onSuccess: () => {
        toast.success("New product added!");
        e.target.reset();
      },
      onError: () => {
        toast.error("Something went wrong!");
        e.target.reset();
      },
    });
  };

  return (
    <section>
      <PageHeading heading="Add New Product" />

      {/* Store Selection */}
      <div className="my-6 flex flex-wrap items-center justify-between">
        {selectedStore ? (
          <h3 className="text-lg font-semibold">
            Add New Product to Store {selectedStore.storeName}
          </h3>
        ) : (
          <h3 className="text-lg font-semibold">
            Select a Store to Add New Product
          </h3>
        )}

        <div className="relative">
          <label htmlFor="storeSelect" className="sr-only">
            Select Store
          </label>
          <select
            id="storeSelect"
            value={selectedStore.storeId}
            onChange={handleStoreChange}
            className="rounded-md border border-neutral-300 p-2 text-sm focus:outline-none"
          >
            <option value="" disabled>
              Select Store
            </option>
            {stores &&
              stores?.storeData?.length > 0 &&
              stores?.storeData?.map((store) => (
                <option key={store?.storeId} value={store?.storeId}>
                  {store?.storeName}
                </option>
              ))}
          </select>
        </div>
      </div>

      {selectedStore.storeId && (
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
                  formData={formData.category.id}
                  required={true}
                  handleInputChange={handleInputChange}
                  options={
                    categories && categories?.data?.length > 0
                      ? categories?.data
                      : []
                  }
                />
              </div>
              {/* subCategory */}
              <div>
                <label htmlFor="subCategory" className="text-sm text-gray-600">
                  Sub-Category
                </label>
                <br />
                <select
                  onChange={handleInputChange}
                  id="subCategory"
                  name="subCategory"
                  value={formData.subCategory}
                  required
                  disabled={formData?.category ? false : true}
                  className="mt-1 mb-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
                >
                  <option value="" disabled>
                    Select Sub-Category
                  </option>
                  {subCategoriesData &&
                    subCategoriesData?.data?.length > 0 &&
                    subCategoriesData?.data?.map((subCate, i) => (
                      <option key={i} value={subCate}>
                        {subCate}
                      </option>
                    ))}
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
              formData={formData.brand.id}
              required={true}
              handleInputChange={handleInputChange}
              options={
                brandsData && brandsData?.data?.length > 0
                  ? brandsData?.data
                  : []
              }
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
          <div className="col-span-12 mt-12 mb-5 flex items-center justify-center">
            <button
              className="bg-dashboard-primary/90 hover:bg-dashboard-primary flex min-h-8 min-w-[164px] cursor-pointer items-center justify-center rounded px-4 py-1 text-white transition duration-200 ease-in-out"
              type="submit"
              disabled={isPending}
            >
              {isPending && !isError ? <Spinner /> : " Add New Product"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
