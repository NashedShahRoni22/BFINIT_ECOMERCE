import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import ImageField from "../../../components/admin/ImageField/ImageField";
import { handleImgChange } from "../../../utils/admin/handleImgChange";
import { handleRemoveImg } from "../../../utils/admin/handleRemoveImg";
import usePostMutation from "../../../hooks/usePostMutation";
import Spinner from "../../../components/admin/loaders/Spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const themes = [
  {
    id: 1,
    name: "black theme",
    primary: "#000000",
    accent: "#ff6900",
    text: "#fff",
  },
  {
    id: 2,
    name: "blue theme",
    primary: "#1e96fc",
    accent: "#FF8C42",
    text: "#fff",
  },
  {
    id: 3,
    name: "green theme",
    primary: "#2f855a",
    accent: "#84cc16",
    text: "#fff",
  },
  {
    id: 4,
    name: "cream theme",
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
  const { user, setUser } = useContext(AuthContext);
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetch("country.json")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

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

  const [selectedImages, setSelectedImages] = useState({
    logo: null,
    favicon: null,
  });

  const navigate = useNavigate();

  // store create post api hooks
  const { mutate, isPending } = usePostMutation({
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
      timeZone: "Pacific Time Zone (PT) UTC -8:00",
    };

    const formDataObj = new FormData();
    formDataObj.append("storeData", JSON.stringify(storeData));
    formDataObj.append("storeLogo", selectedImages.logo);
    formDataObj.append("storeFavicon", selectedImages.favicon);

    mutate(formDataObj, {
      onSuccess: (res) => {
        toast.success("Store created successfully!");
        const newStore = {
          storeId: res.storeId,
          storeName: res.storeName,
          storeLogo: res.storeLogoUrl,
        };
        // Update EStore inside the user context
        setUser((prevUser) => ({
          ...prevUser,
          data: {
            ...prevUser.data,
            EStore: [...prevUser.data.EStore, newStore],
          },
        }));
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
              Store Name:
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
              Email:
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

          <div>
            <label htmlFor="storePhone" className="text-sm font-medium">
              Mobile No:
            </label>
            <input
              type="text"
              name="storePhone"
              value={formData.storePhone}
              onChange={handleChange}
              required
              className="mt-1.5 w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
            />
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

          {/* Product Type */}
          <div>
            <label htmlFor="productType" className="text-sm font-medium">
              Product Type:
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
              Choose Country:
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
              {countries.map((country, i) => (
                <option key={i} value={country.countryName}>
                  {country.countryName}
                </option>
              ))}
            </select>
          </div>

          {/* Currency Dropdown */}
          <div>
            <label htmlFor="currency" className="text-sm font-medium">
              Choose Currency:
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="mt-1.5 w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
            >
              <option value="" disabled>
                Select Currency
              </option>
              {countries.map((country, i) => (
                <option
                  key={i}
                  value={country.currencyCode}
                  className={`${country.currencyCode === "" && "hidden"}`}
                >
                  {country.currencyCode}
                </option>
              ))}
            </select>
          </div>

          {/* Address */}
          <div className="col-span-full">
            <label htmlFor="storeAddress" className="text-sm font-medium">
              Address:
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
          <p className="text-sm font-medium">Choose Theme:</p>
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
            {isPending ? <Spinner /> : "Create New Store"}
          </button>
        </div>
      </form>
    </section>
  );
}
