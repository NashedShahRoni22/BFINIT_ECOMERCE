import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../Providers/AuthProvider";
import useGetStorePreference from "../../../hooks/stores/useGetStorePreference";
import PageHeading from "../PageHeading/PageHeading";
import { BsInfoCircle } from "react-icons/bs";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import usePostMutation from "../../../hooks/mutations/usePostMutation";
import toast from "react-hot-toast";
import ImageField from "../ImageField/ImageField";
import { handleImgChange } from "../../../utils/admin/handleImgChange";
import { handleRemoveImg } from "../../../utils/admin/handleRemoveImg";
import FormInput from "../FormInput";
import productTypes from "../../../data/adminData/productTypes";
import Spinner from "../loaders/Spinner";
import themes from "../../../data/adminData/themes";
import ActionBtn from "../buttons/ActionBtn";
import useUpdateMutation from "../../../hooks/mutations/useUpdateMutation";

export default function StoreForm({ isUpdateMode = false }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { storeId } = useParams();
  const { user } = useContext(AuthContext);

  const [selectedImages, setSelectedImages] = useState({
    logo: null,
    favicon: null,
  });

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
    storeTheme: 1,
    productType: "",
    country: "",
    currencyName: "",
    currencyCode: "",
    currencySymbol: "",
    timezone: "",
  });

  // Fetch existing store data for update mode
  const { data: storeData, isLoading: isStoreLoading } =
    useGetStorePreference(storeId);

  // update from data in update store info route
  useEffect(() => {
    if (isUpdateMode && storeData) {
      setFormData({
        storeName: storeData.storeName || "",
        storeEmail: storeData.storeEmail || "",
        storePhone: storeData.storePhone || "",
        storeTelephone: storeData.storeTelephone || "",
        storeAddress: storeData.storeAddress || "",
        storeFacebookLink: storeData.storeFacebookLink || "",
        storeTwitterLink: storeData.storeTwitterLink || "",
        storeInstagramLink: storeData.storeInstagramLink || "",
        storeYoutubeLink: storeData.storeYoutubeLink || "",
        storeTheme: parseInt(storeData.storeTheme) || 1,
        productType: storeData.productType || "",
        country: storeData.country || "",
        currencyName: storeData.currencyName || "",
        currencyCode: storeData.currencyCode || "",
        currencySymbol: storeData.currencySymbol || "",
        timezone: storeData.timezone || "",
      });

      setSelectedImages({
        logo: storeData.storeLogo || null,
        favicon: storeData.storeFavicon || null,
      });
    }
  }, [isUpdateMode, storeData]);

  const isDisabled =
    !selectedImages.logo ||
    !selectedImages.favicon ||
    !formData.storeName ||
    !formData.storeEmail ||
    !formData.productType ||
    !formData.country ||
    !formData.storePhone ||
    !formData.currencyCode ||
    !formData.currencySymbol ||
    !formData.currencyName ||
    !formData.storeAddress ||
    !formData.storeTheme;

  // fetch all countries
  const { data: countries } = useGetQuery({
    endpoint: "/api/countries",
    queryKey: ["countries"],
  });

  // fetch selected country details (currency, country code etc.)
  const { data: country, isLoading: isCountryLoading } = useGetQuery({
    endpoint: `/api/countries/${formData?.country}`,
    queryKey: ["country", formData?.country],
    enabled: !!formData?.country,
  });

  // update formData state based on selected country
  useEffect(() => {
    if (country) {
      setFormData((prev) => ({
        ...prev,
        currencyName: country?.currency_name,
        currencyCode: country?.currency_code,
        currencySymbol: country?.currency_symbol,
        timezone: country?.timezone,
      }));
    }
  }, [country]);

  // store create post api hooks
  const { mutate, isPending } = usePostMutation({
    endpoint: "/store/create",
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  // store update data
  const { mutate: storeUpdateMutation, isPending: isStoreUpdatePending } =
    useUpdateMutation({
      endpoint: `/store/main/update/${storeId}`,
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

    if (!isUpdateMode && (!selectedImages.logo || !selectedImages.favicon)) {
      return toast.error("Please select Logo & Favicon");
    }

    const storeData = {
      ...formData,
      storePhone: `${country?.phone_code}${formData.storePhone}`,
      timeZone: country?.timezone,
    };

    const formDataObj = new FormData();
    formDataObj.append("storeData", JSON.stringify(storeData));
    if (selectedImages.logo || selectedImages.favicon) {
      formDataObj.append("storeLogo", selectedImages.logo);
      formDataObj.append("storeFavicon", selectedImages.favicon);
    }

    if (!isUpdateMode) {
      mutate(formDataObj, {
        onSuccess: () => {
          toast.success("Store created successfully!");
          queryClient.invalidateQueries(["stores", user?.data?.clientid]);
          navigate("/all-stores");
        },

        onError: (error) => {
          toast.error(error?.message || "Something went wrong!");
          console.error(error);
        },
      });

      return;
    }

    storeUpdateMutation(formDataObj, {
      onSuccess: () => {
        toast.success("Store updated successfully!");
        queryClient.invalidateQueries(["stores", user?.data?.clientid]);
        navigate("/all-stores");
      },

      onError: (error) => {
        toast.error(error?.message || "Something went wrong!");
        console.error(error);
      },
    });
  };

  return (
    <section className="p-5">
      <PageHeading
        heading={isUpdateMode ? "Update Store Info" : "Create New Store"}
      />
      <div className="mt-8 flex items-center justify-end gap-1 text-xs font-medium text-red-600/80">
        <BsInfoCircle className="size-4" />
        <p>* Required fields</p>
      </div>

      <form onSubmit={handleCreateStore} className="mt-4 space-y-5">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Logo */}
          <ImageField
            id="logo"
            label="Logo"
            selectedImg={selectedImages.logo}
            sizeMention="1200px (width) × 400px (height)"
            formatMention="PNG or SVG format"
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
            sizeMention="512px (width) × 512px (height)"
            formatMention={
              <>
                PNG or{" "}
                <a
                  href="https://favicon.io"
                  target="_blank"
                  className="underline"
                >
                  .ico
                </a>{" "}
                format
              </>
            }
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
          <FormInput
            label="Store Name"
            name="storeName"
            value={formData.storeName}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Email"
            name="storeEmail"
            value={formData.storeEmail}
            onChange={handleChange}
            required
          />

          {/* Product Type */}
          <div>
            <label htmlFor="productType" className="text-sm font-medium">
              Product Type: <span className="text-red-600">*</span>
            </label>
            <select
              id="productType"
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              required
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
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
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
                id="storePhone"
                name="storePhone"
                value={formData.storePhone}
                onChange={handleChange}
                required
                className={`w-full px-4 py-1 outline-none ${country?.phone_code && "border-l border-neutral-200"}`}
              />
            </div>
          </div>

          <FormInput
            label="Telephone"
            name="storeTelephone"
            value={formData.storeTelephone}
            onChange={handleChange}
          />

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
                {isCountryLoading ? <Spinner /> : formData?.currencySymbol}
              </div>

              <input
                type="text"
                id="currency"
                name="currencyCode"
                value={formData?.currencyCode}
                required
                readOnly
                className={`w-full cursor-not-allowed border-neutral-200 px-4 py-1 outline-none ${formData?.currencyCode && "border-l"}`}
              />
            </div>
          </div>

          {/* Currency Name */}
          <div>
            <label htmlFor="currencyName" className="text-sm font-medium">
              Currency Name:{" "}
              <span className="text-xs font-normal text-neutral-500">
                (Auto-filled based on country)
              </span>
            </label>

            <input
              type="text"
              id="currencyName"
              name="currencyName"
              value={formData?.currencyName}
              required
              readOnly
              className="mt-1.5 w-full cursor-not-allowed rounded border border-l border-neutral-200 bg-neutral-50 px-4 py-1 outline-none"
            />
          </div>

          <FormInput
            label="Facebook Link"
            name="storeFacebookLink"
            value={formData.storeFacebookLink}
            onChange={handleChange}
          />

          <FormInput
            label="Twitter Link"
            name="storeTwitterLink"
            value={formData.storeTwitterLink}
            onChange={handleChange}
          />

          <FormInput
            label="Instagram Link"
            name="storeInstagramLink"
            value={formData.storeInstagramLink}
            onChange={handleChange}
          />

          <FormInput
            label="Youtube Link"
            name="storeYoutubeLink"
            value={formData.storeYoutubeLink}
            onChange={handleChange}
          />

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
        <div className="mt-12 mb-5 flex items-center justify-center gap-8">
          <Link
            to="/"
            className="min-h-9 rounded border border-gray-400 px-5 py-2 text-gray-800 transition-all duration-200 ease-linear hover:bg-gray-200 active:scale-[0.98]"
          >
            Cancel
          </Link>

          <ActionBtn
            type="submit"
            loading={isPending || isStoreUpdatePending || isStoreLoading}
            disabled={
              isDisabled || isStoreUpdatePending || isPending || isStoreLoading
            }
          >
            {isUpdateMode ? "Update" : "Create"}
          </ActionBtn>
        </div>
      </form>
    </section>
  );
}
