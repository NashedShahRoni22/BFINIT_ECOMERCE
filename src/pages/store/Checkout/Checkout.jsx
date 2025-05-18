import { useEffect, useState } from "react";
import codIcon from "../../../assets/icons/cod-icon.png";
import stripeIcon from "../../../assets/icons/stipe.png";
import useCart from "../../../hooks/cart/useCart";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import Spinner from "../../../components/admin/loaders/Spinner";
import usePostMutation from "../../../hooks/mutations/usePostMutation";
import { useNavigate, useParams } from "react-router";
import useAuth from "../../../hooks/auth/useAuth";
import toast from "react-hot-toast";
import useGetStorePreference from "../../../hooks/stores/useGetStorePreference";

const paymentMethods = [
  {
    icon: codIcon,
    title: "Cash On Delivery",
    value: "COD",
  },
  {
    icon: stripeIcon,
    title: "Online Payment (Stripe)",
    value: "STRIPE",
  },
];

export default function Checkout() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, setCartItems } = useCart();
  const { data: storePreference } = useGetStorePreference(storeId);

  // subtotal amount in cents
  const subTotalInCents = cartItems.reduce((total, item) => {
    const priceInCents = Math.round(
      parseFloat(item.productDiscountPrice.$numberDecimal) * 100,
    );
    return total + priceInCents * item.quantity;
  }, 0);
  // subtotal amount in regular
  const subTotal = (subTotalInCents / 100).toFixed(2);

  const [formData, setFormData] = useState({
    currency_code: "",
    totalAmount: subTotal,
    paymentMethod: "COD",
    shippingDetails: {
      name: "",
      email: "",
      countryPhoneCode: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      apartmentAddress: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
  });

  const isDisabled =
    !formData.currency_code ||
    !formData.totalAmount ||
    !formData.paymentMethod ||
    !formData.shippingDetails.name ||
    !formData.shippingDetails.email ||
    !formData.shippingDetails.countryPhoneCode ||
    !formData.shippingDetails.phone ||
    !formData.shippingDetails.addressLine1 ||
    !formData.shippingDetails.city ||
    !formData.shippingDetails.country ||
    !formData.shippingDetails.zipCode;

  // fetch countries
  const { data: countries } = useGetQuery({
    endpoint: "/api/countries",
    queryKey: ["countries"],
  });
  // fetch country code, currency etc based on selected country
  const { data: country, isLoading: isCountryLoading } = useGetQuery({
    endpoint: `/api/countries/${formData?.shippingDetails?.country}`,
    queryKey: ["country", formData?.shippingDetails?.country],
    enabled: !!formData?.shippingDetails?.country,
  });

  // update currency code and phone code in formData when country available
  useEffect(() => {
    if (country) {
      setFormData((prev) => ({
        ...prev,
        currency_code: storePreference?.currencyCode,
        shippingDetails: {
          ...prev.shippingDetails,
          countryPhoneCode: country.phone_code,
        },
      }));
    }
  }, [country, storePreference]);

  // Handle both top-level and nested shipping details changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.shippingDetails) {
      setFormData((prev) => ({
        ...prev,
        shippingDetails: {
          ...prev.shippingDetails,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // custom post hooks for cod
  const { mutate, isPending } = usePostMutation({
    endpoint: `/orders/create/cod/${storeId}`,
    token: user?.token,
  });

  // custom post hooks for stripe
  const { mutate: stripeMutate, isPending: isStripePending } = usePostMutation({
    endpoint: `/orders/create/online/${storeId}`,
    token: user?.token,
  });

  // handle confirm order
  const handleConfirmOrder = () => {
    if (formData.paymentMethod === "STRIPE") {
      const formattedCartItems = cartItems.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        price: item.productDiscountPrice.$numberDecimal,
        quantity: item.quantity,
      }));

      const payload = {
        products: formattedCartItems,
        ...formData,
      };

      stripeMutate(payload, {
        onSuccess: (data) => {
          window.location = data.url;
        },
        onError: () => {
          toast.error("Something went wrong!");
        },
      });
    } else {
      const formattedCartItems = cartItems.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        price: item.productDiscountPrice.$numberDecimal,
        quantity: item.quantity,
      }));

      const payload = {
        products: formattedCartItems,
        ...formData,
      };

      mutate(payload, {
        onSuccess: () => {
          toast.success("Order have been placed!");
          navigate(`/preview/${storeId}/order-success`);
          setCartItems([]);
          localStorage.removeItem("cartItems");
        },
        onError: () => {
          toast.error("Something went wrong!");
        },
      });
    }
  };

  return (
    <section className="font-poppins flex flex-col gap-8 px-5 py-10 md:container md:mx-auto md:flex-row md:gap-16 md:px-0 md:py-20">
      <div className="w-full md:w-1/2">
        <div>
          <h2 className="font-merriweather text-xl font-bold">
            Payment Method
          </h2>

          <div className="mt-4 inline-flex items-center gap-4">
            {paymentMethods.map((method, i) => (
              <button
                key={i}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 ${formData.paymentMethod === method.value ? "border-accent bg-neutral-100" : "cursor-pointer border-neutral-200"}`}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    paymentMethod: method.value,
                  }))
                }
              >
                <img
                  src={method.icon}
                  alt={`image of ${method.title}`}
                  className="size-8 min-w-fit object-contain"
                />
                <h4 className="text-sm">{method.title}</h4>
              </button>
            ))}
          </div>
        </div>

        {/* shipping details form */}
        <div className="mt-8">
          <h2 className="font-merriweather text-xl font-bold">
            Shipping Details
          </h2>
          <form className="mt-4 space-y-3 text-sm">
            {/* name */}
            <div>
              <label htmlFor="name" className="text-sm text-neutral-600">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.shippingDetails.name}
                onChange={handleInputChange}
                required
                className="mt-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
              />
            </div>

            {/* email */}
            <div>
              <label htmlFor="email" className="text-sm text-neutral-600">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.shippingDetails.email}
                onChange={handleInputChange}
                required
                className="mt-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
              />
            </div>

            {/* country */}
            <div>
              <label htmlFor="country" className="text-sm text-neutral-600">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                name="country"
                value={formData.shippingDetails.country}
                onChange={handleInputChange}
                required
                className="mt-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 text-sm outline-none"
              >
                <option value="" disabled>
                  --- Please Select Country ---
                </option>
                {countries?.map((country, i) => (
                  <option key={i} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* phone */}
            <div>
              <label htmlFor="phone" className="text-sm text-neutral-600">
                Phone <span className="text-red-600">*</span>
              </label>

              <div className="mt-2 flex items-center rounded border border-neutral-200 bg-[#f8fafb]">
                <div className="px-3">
                  {isCountryLoading ? (
                    <Spinner />
                  ) : (
                    formData?.shippingDetails?.countryPhoneCode
                  )}
                </div>

                <input
                  type="text"
                  name="phone"
                  value={formData?.shippingDetails?.phone}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-2 py-1.5 outline-none ${formData?.shippingDetails?.countryPhoneCode && "border-l border-neutral-200"}`}
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <label
                htmlFor="shipping_address"
                className="text-sm text-neutral-600"
              >
                Shipping Address <span className="text-red-500">*</span>
              </label>
              <div>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.shippingDetails.addressLine1}
                  onChange={handleInputChange}
                  required
                  placeholder="Street Address"
                  className="mt-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
                />
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.shippingDetails.addressLine2}
                  onChange={handleInputChange}
                  placeholder="Secondary Street Address (Optional)"
                  className="mt-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
                />
                <input
                  type="text"
                  name="apartmentAddress"
                  value={formData.shippingDetails.apartmentAddress}
                  onChange={handleInputChange}
                  placeholder="Apartment, Suite, etc. (Optional)"
                  className="mt-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
                />

                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    value={formData.shippingDetails.value}
                    onChange={handleInputChange}
                    required
                    placeholder="City"
                    className="mt-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.shippingDetails.state}
                    onChange={handleInputChange}
                    placeholder="State/Province (optional)"
                    className="mt-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.shippingDetails.zipCode}
                    onChange={handleInputChange}
                    required
                    placeholder="ZIP / Postal Code"
                    className="mt-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* checkout product info */}
      <div className="w-full md:w-1/2">
        <h2 className="font-merriweather text-xl font-bold">Your Order</h2>

        <ul className="mt-4 space-y-4">
          {cartItems?.map((item) => (
            <li
              key={item.productId}
              className="flex flex-wrap items-center justify-between gap-8"
            >
              <div className="flex items-center gap-1.5">
                <img
                  className="size-12 object-contain"
                  src={`https://ecomback.bfinit.com${Array.isArray(item.productImage) ? item.productImage[0] : item.productImage}`}
                  alt={`image of ${item.productName}`}
                  loading="lazy"
                />
                <div>
                  <p>{item.productName}</p>
                  <p className="text-accent text-sm">X {item.quantity}</p>
                </div>
              </div>
              <p>
                {storePreference?.data?.currencySymbol}{" "}
                {(
                  item.productDiscountPrice.$numberDecimal * item.quantity
                ).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-1.5 border-y border-neutral-200 py-2">
          <div className="flex items-center justify-between">
            <p className="text-lg">Subtotal</p>
            <p className="text-lg">
              {storePreference?.data?.currencyCode} {subTotal}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg">Delivery Charge</p>
            {/* TODO: add dynamic delivery charge of individual product */}
            <p className="text-lg">
              {storePreference?.data?.currencyCode} 00.00
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <p className="text-lg font-medium">Total</p>
          <p className="text-lg font-medium">
            {storePreference?.data?.currencyCode} {subTotal}
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            disabled={isDisabled || isPending || isStripePending}
            onClick={handleConfirmOrder}
            className={`text-on-primary rounded-lg px-4 py-2 transition-all duration-200 ease-in-out ${isDisabled || isPending || isStripePending ? "bg-accent/50" : "bg-accent hover:bg-accent/90 cursor-pointer"}`}
          >
            {isPending ? <Spinner /> : "Confirm Order"}
          </button>
        </div>
      </div>
    </section>
  );
}
