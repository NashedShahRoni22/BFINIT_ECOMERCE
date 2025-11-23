import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import BtnSubmit from "../../../components/admin/buttons/BtnSubmit";
import ImageField from "../../../components/admin/ImageField/ImageField";
import useAuth from "../../../hooks/auth/useAuth";
import usePostMutation from "../../../hooks/mutations/usePostMutation";
import useGetBrands from "../../../hooks/brands/useGetBrands";
import { handleImgChange } from "../../../utils/admin/handleImgChange";
import { handleRemoveImg } from "../../../utils/admin/handleRemoveImg";
import BrandList from "../../../components/admin/BrandList";
import { Tag } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import useSelectedStore from "@/hooks/stores/useSelectedStore";
import { DynamicBreadcrumb } from "@/components/admin/DynamicBreadcrumb";

const BRANDS_BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    dropdown: [
      { label: "Category", href: "/products/category" },
      { label: "Sub Category", href: "/products/sub-category" },
      { label: "Add Product", href: "/products/add-product" },
      { label: "Inventory", href: "/products/inventory" },
    ],
  },
  { label: "Brands" },
];

export default function Brands() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { selectedStore } = useSelectedStore();
  const [selectedImages, setSelectedImages] = useState({
    brandIcon: null,
  });

  // fetch all brands
  const { data: brands } = useGetBrands(selectedStore?.storeId);

  // custom hook to crete new brand
  const { mutate, isPending } = usePostMutation({
    endpoint: `/brand/create/${selectedStore?.storeId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  // form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const brandFormData = new FormData();
    brandFormData.append("brandName", form.brand.value);
    brandFormData.append("brandImage", selectedImages.brandIcon);

    mutate(brandFormData, {
      onSuccess: () => {
        toast.success("New brand created!");
        setSelectedImages({ brandIcon: null });
        form.reset();
        queryClient.invalidateQueries(["brands", selectedStore?.storeId]);
      },
      onError: () => {
        toast.success("Something went wrong!");
        setSelectedImages({ brandIcon: null });
        form.reset();
      },
    });
  };

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={BRANDS_BREADCRUMB_ITEMS} />

      {/* Page Header */}
      <PageHeader
        icon={Tag}
        title="Add Brand"
        description="Create and manage brands for"
      />

      {selectedStore?.storeId && (
        <div className="mt-6 grid grid-cols-12 gap-y-12 lg:gap-x-12">
          {/* image & category name field container */}
          <form
            onSubmit={handleFormSubmit}
            className="col-span-12 h-fit rounded border border-neutral-200 px-4 py-2 lg:col-span-4"
          >
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
                Brand Name: <span className="text-red-600">*</span>
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
              <BtnSubmit isPending={isPending} label="Add New Brand" />
            </div>
          </form>

          {/* all brand lists container */}
          <div className="col-span-12 rounded border border-neutral-200 lg:col-span-8">
            <h3 className="bg-neutral-100 px-4 py-2 font-semibold">
              All Brands
            </h3>

            <ul>
              {brands && brands?.data?.length > 0 ? (
                brands?.data?.map((brand) => (
                  <BrandList
                    key={brand.id}
                    brand={brand}
                    storeId={selectedStore?.storeId}
                  />
                ))
              ) : (
                <div className="px-4 py-6 text-center text-sm text-gray-500">
                  No brands found for this store. Start by adding a new one.
                </div>
              )}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
