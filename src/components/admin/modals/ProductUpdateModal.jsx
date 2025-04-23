import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SunEditor from "suneditor-react";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../loaders/Spinner";
import InputField from "../../../pages/admin/AddProduct/InputField";
import CheckBoxFeat from "../../../pages/admin/AddProduct/CheckBoxFeat";
import SelectDropdown from "../../../pages/admin/AddProduct/SelectDropdown";
import useAuth from "../../../hooks/auth/useAuth";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import useGetBrands from "../../../hooks/brands/useGetBrands";
import useGetCategories from "../../../hooks/categories/useGetCategories";
import useGetSubCategories from "../../../hooks/categories/subCategories/useGetSubCategories";
import { resetForm } from "../../../utils/admin/resetForm";
import ProductImgUpdate from "../ProductImgUpdate/ProductImgUpdate";
import useUpdateMutation from "../../../hooks/mutations/useUpdateMutation";

export default function ProductUpdateModal({ storeId, productId, close }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  /* -- Local State -- */
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);

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

  /* -- Fetch product details, categories, sub-categories, brands -- */
  const { data: productDetails, isLoading } = useGetQuery({
    endpoint: `/product/?productId=${productId}`,
    token: user?.token,
    queryKey: ["product", productId],
    enabled: !!user?.token && !!productId,
  });
  const { data: categories } = useGetCategories(storeId);
  const { data: subCategoriesData } = useGetSubCategories(
    storeId,
    formData.category.id,
  );
  const { data: brandsData } = useGetBrands(storeId);

  /* -- Side Effects -- */
  useEffect(() => {
    if (isLoading && !productDetails) return;

    const {
      productName,
      productPrice,
      productDiscountPrice,
      productQuantity,
      productShippingCharges,
      bestSeling,
      flashSale,
      featured,
      newArraivals,
      productStatus,
      productDescription,
      productImage,
    } = productDetails.data;

    setFormData((prev) => ({
      ...prev,
      name: productName,
      originalPrice: productPrice.$numberDecimal,
      discountPercent: productDiscountPrice.$numberDecimal,
      quantity: productQuantity,
      shippingCharge: productShippingCharges.$numberDecimal,
      bestSelling: bestSeling ? "yes" : "no",
      flashSell: flashSale ? "yes" : "no",
      featured: featured ? "yes" : "no",
      new: newArraivals ? "yes" : "no",
      status: productStatus ? "yes" : "no",
      description: productDescription,
    }));

    setImagePreviews(productImage);
  }, [productDetails, isLoading]);

  // Event Handlers for input & checkbox field
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

  // Event Handlers for SunEditor
  const handleDescriptionChange = (content) => {
    setFormData((prev) => ({ ...prev, description: content }));
  };

  // Custom Update Mutation
  const { mutate, isPending, isError } = useUpdateMutation({
    endpoint: `/product/update/${productId}`,
    token: user?.token,
  });

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.description === "") {
      return toast.error("Description can't be emtpy!");
    }

    const productData = {
      productName: formData.name,
      productCategory:
        formData.category.name || productDetails?.data?.productCategory,
      productSubCategory:
        formData.subCategory || productDetails?.data?.productSubcategory,
      productBrand: formData.brand.name || productDetails?.data?.productBrand,
      productPrice: formData.originalPrice,
      discountPrice: formData.discountPercent,
      productQuantity: formData.quantity,
      shippingCharges: formData.shippingCharge,
      productStatus: formData.status === "yes" ? true : false,
      bestSelling: formData.bestSelling === "yes" ? true : false,
      flashSale: formData.flashSell === "yes" ? true : false,
      newArraivals: formData.new === "yes" ? true : false,
      featured: formData.featured === "yes" ? true : false,
      productDescription: formData.description,
    };

    const payload = new FormData();

    payload.append("productData", JSON.stringify(productData));
    selectedImages.forEach((image) => {
      payload.append("productImages", image);
    });
    payload.append("deleteImageUrl", JSON.stringify(deletedImages));

    mutate(payload, {
      onSuccess: () => {
        toast.success("Product description updated!");
        queryClient.invalidateQueries(["products", storeId, user?.token]);
        close();
        resetForm(setFormData, setSelectedImages, setImagePreviews);
      },
      onError: () => {
        toast.error("Something went wrong!");
        close();
        resetForm(setFormData, setSelectedImages, setImagePreviews);
      },
    });
  };

  return (
    <div>
      <h3 className="text-center text-xl font-semibold text-neutral-800">
        Update Prdouct Info
      </h3>

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
                current={productDetails?.data?.productCategory}
                label="Category"
                id="category"
                name="category"
                formData={formData.category.id}
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
              <span className="text-sm text-gray-600">
                Currently:{" "}
                <span className="font-medium">
                  {productDetails?.data?.productSubcategory}
                </span>
              </span>
              <br />
              <select
                onChange={handleInputChange}
                id="subCategory"
                name="subCategory"
                value={formData.subCategory}
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

        {/* Product Image Preview & Update */}
        <ProductImgUpdate
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          imagePreviews={imagePreviews}
          setImagePreviews={setImagePreviews}
          setDeletedImages={setDeletedImages}
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
                label="Discount Amount"
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
            current={productDetails?.data?.productBrand}
            label="Brand"
            id="brand"
            name="brand"
            formData={formData.brand.id}
            handleInputChange={handleInputChange}
            options={
              brandsData && brandsData?.data?.length > 0 ? brandsData?.data : []
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
            setContents={formData.description}
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
    </div>
  );
}
