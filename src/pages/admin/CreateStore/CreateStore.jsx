import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Providers/AuthProvider";
import ImageField from "../../../components/admin/ImageField/ImageField";
import Spinner from "../../../components/admin/loaders/Spinner";
import usePostMutation from "../../../hooks/mutations/usePostMutation";
import { handleImgChange } from "../../../utils/admin/handleImgChange";
import { handleRemoveImg } from "../../../utils/admin/handleRemoveImg";
import useGetQuery from "../../../hooks/queries/useGetQuery";

const themes = [
  {
    id: 1,
    name: "Midnight Blaze",
    primary: "#000000",
    accent: "#ff6900",
    text: "#fff",
  },
  {
    id: 2,
    name: "Sky Burst",
    primary: "#1e96fc",
    accent: "#FF8C42",
    text: "#fff",
  },
  {
    id: 3,
    name: "Forest Lime",
    primary: "#2f855a",
    accent: "#84cc16",
    text: "#fff",
  },
  {
    id: 4,
    name: "Lilac Cream",
    primary: "#faf3e0",
    accent: "#c084fc",
    text: "#000",
  },
];

const productTypes = [
  { value: "fashion", label: "Fashion" },
  { value: "electronics", label: "Electronics" },
  { value: "beauty", label: "Beauty & Personal Care" },
  { value: "home-living", label: "Home & Living" },
  { value: "food-beverage", label: "Food & Beverage" },
  { value: "health-wellness", label: "Health & Wellness" },
  { value: "sports", label: "Sports & Outdoor" },
  { value: "automotive", label: "Automotive" },
  { value: "handmade", label: "Handmade & Crafts" },
  { value: "toys", label: "Toys & Games" },
  { value: "digital-products", label: "Digital Products" },
  { value: "services", label: "Professional Services" },
];

export default function CreateStore() {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const { data: countries } = useGetQuery({
    endpoint: "/api/countries",
    queryKey: ["countries"],
  });

  // Form state
  const [formData, setFormData] = useState({
    storeName: "",
    storeEmail: "",
    storePhone: "",
    storeTelephone: "",
    storeAddress: "",
    storeFacebookLink: "",
    storeTwitterLink: "",
    storeInstagramLink: "",
    storeYoutubeLink: "",
    storeTheme: "",
    productType: "",
    country: "",
    currency: "",
  });

  const { data: country, isLoading: isCountryLoading } = useGetQuery({
    endpoint: `/api/countries/${formData?.country}`,
    queryKey: ["country", formData?.country],
    enabled: !!formData?.country,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      currency: country?.currency_name,
    }));
  }, [country]);

  const [selectedImages, setSelectedImages] = useState({
    logo: null,
    favicon: null,
  });

  const navigate = useNavigate();

  // store create post api hooks
  const { mutate, isPending, isError } = usePostMutation({
    endpoint: "/store/create",
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle store creation
  const handleCreateStore = (e) => {
    e.preventDefault();

    if (!selectedImages.logo || !selectedImages.favicon) {
      return window.alert("Please select Logo & Favicon");
    }

    const storeData = {
      ...formData,
      storePhone: `${country?.phone_code}${formData.storePhone}`,
      timeZone: country?.timezone,
    };

    const formDataObj = new FormData();
    formDataObj.append("storeData", JSON.stringify(storeData));
    formDataObj.append("storeLogo", selectedImages.logo);
    formDataObj.append("storeFavicon", selectedImages.favicon);

    mutate(formDataObj, {
      onSuccess: () => {
        toast.success("Store created successfully!");
        queryClient.invalidateQueries(["stores", user?.data?.clientid]);
        navigate("/all-stores");
      },

      onError: (error) => {
        toast.error("Something went wrong!");
        console.error(error);
      },
    });
  };

  return (
    <section className="p-5">
      <h1 className="text-center text-xl font-semibold capitalize">
        Create new store
      </h1>
      <p className="mt-2 text-center text-xs text-neutral-500">
        <span className="text-red-600">*</span> indicates required fields
      </p>

      <form onSubmit={handleCreateStore} className="mt-8 space-y-5">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Logo */}
          <ImageField
            id="logo"
            label="Logo"
            selectedImg={selectedImages.logo}
            handleImgChange={(e) =>
              handleImgChange(e, "logo", setSelectedImages)
            }
            handleRemoveImg={() => handleRemoveImg("logo", setSelectedImages)}
          />

          {/* Favicon */}
          <ImageField
            id="favicon"
            label="Favicon"
            selectedImg={selectedImages.favicon}
            handleImgChange={(e) =>
              handleImgChange(e, "favicon", setSelectedImages)
            }
            handleRemoveImg={() =>
              handleRemoveImg("favicon", setSelectedImages)
            }
          />
        </div>

        {/* Store Details */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <label htmlFor="storeName" className="text-sm font-medium">
              Store Name: <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              required
              className="mt-1.5 w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
            />
          </div>

          <div>
            <label htmlFor="storeEmail" className="text-sm font-medium">
              Email: <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="storeEmail"
              value={formData.storeEmail}
              onChange={handleChange}
              required
              className="mt-1.5 w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
            />
          </div>

          {/* Product Type */}
          <div>
            <label htmlFor="productType" className="text-sm font-medium">
              Product Type: <span className="text-red-600">*</span>
            </label>
            <select
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              className="mt-1.5 w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
            >
              <option value="" disabled>
                Select Product Type
              </option>
              {productTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Country Dropdown */}
          <div>
            <label htmlFor="country" className="text-sm font-medium">
              Choose Country: <span className="text-red-600">*</span>
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1.5 w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
            >
              <option value="" disabled>
                Select Country
              </option>
              {countries &&
                countries?.length > 0 &&
                countries?.map((country, i) => (
                  <option key={i} value={country}>
                    {country}
                  </option>
                ))}
            </select>
          </div>

          {/* mobile */}
          <div>
            <label htmlFor="storePhone" className="text-sm font-medium">
              Mobile No: <span className="text-red-600">*</span>
            </label>

            <div className="mt-1.5 flex items-center rounded border border-neutral-200 bg-neutral-50">
              <div className="px-3">
                {isCountryLoading ? <Spinner /> : country?.phone_code}
              </div>

              <input
                type="text"
                name="storePhone"
                value={formData.storePhone}
                onChange={handleChange}
                required
                className={`w-full px-4 py-1 outline-none ${country?.phone_code && "border-l border-neutral-200"}`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="storeTelephone" className="text-sm font-medium">
              Telephone:
            </label>
            <input
              type="text"
              name="storeTelephone"
              value={formData.storeTelephone}
              onChange={handleChange}
              required
              className="mt-1.5 w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
            />
          </div>

          {/* Currency Code and Symbol */}
          <div>
            <label htmlFor="currency" className="text-sm font-medium">
              Currency Symbol & Code:{" "}
              <span className="text-xs font-normal text-neutral-500">
                (Auto-filled based on country)
              </span>
            </label>
            <div className="mt-1.5 flex cursor-not-allowed items-center rounded border border-neutral-200 bg-neutral-50">
              <div className="px-3">
                {isCountryLoading ? <Spinner /> : country?.currency_symbol}
              </div>

              <input
                type="text"
                name="storePhone"
                value={country?.currency_code}
                required
                readOnly
                className={`w-full cursor-not-allowed border-neutral-200 px-4 py-1 outline-none ${country?.currency_symbol && "border-l"}`}
              />
            </div>
          </div>

          {/* Currency Name */}
          <div>
            <label htmlFor="currency" className="text-sm font-medium">
              Currency Name:{" "}
              <span className="text-xs font-normal text-neutral-500">
                (Auto-filled based on country)
              </span>
            </label>

            <input
              type="text"
              name="storePhone"
              value={country?.currency_name}
              required
              readOnly
              className="mt-1.5 w-full cursor-not-allowed rounded border border-l border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
            />
          </div>

          {/* Address */}
          <div className="col-span-full">
            <label htmlFor="storeAddress" className="text-sm font-medium">
              Address: <span className="text-red-600">*</span>
            </label>
            <textarea
              name="storeAddress"
              value={formData.storeAddress}
              onChange={handleChange}
              rows={3}
              required
              className="mt-1.5 w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
            />
          </div>
        </div>

        {/* Store Theme Selection */}
        <div>
          <p className="text-sm font-medium">
            Choose Theme: <span className="text-red-600">*</span>
          </p>
          <div className="mt-2 grid grid-cols-2 gap-8 md:grid-cols-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, storeTheme: theme.id }))
                }
                className={`cursor-pointer rounded border bg-neutral-50 p-3.5 ${
                  formData.storeTheme === theme.id
                    ? "border-dashboard-primary"
                    : "border-neutral-200"
                }`}
              >
                <div className="flex justify-center gap-1">
                  {[theme.primary, theme.accent, theme.text].map(
                    (color, idx) => (
                      <div
                        key={idx}
                        style={{ backgroundColor: color }}
                        className="size-8 rounded-full border border-neutral-200"
                      ></div>
                    ),
                  )}
                </div>
                <p className="mt-2.5 text-center text-sm font-semibold capitalize">
                  {theme.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-12 mb-5 flex justify-center">
          <button
            className={`bg-dashboard-primary hover:bg-dashboard-primary/90 flex min-h-8 min-w-[165px] items-center justify-center rounded px-4 py-1 text-white transition ${!isPending && "cursor-pointer"}`}
            type="submit"
            disabled={isPending}
          >
            {isPending && !isError ? <Spinner /> : "Create New Store"}
          </button>
        </div>
      </form>
    </section>
  );
}
