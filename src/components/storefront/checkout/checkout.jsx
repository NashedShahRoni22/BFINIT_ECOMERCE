import { useState, useEffect } from "react";
import useCart from "@/hooks/useCart";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";
import useStorefrontAuth from "@/hooks/auth/useStorefrontAuth";
import usePostMutation from "@/hooks/api/usePostMutation";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import useGetQuery from "@/hooks/api/useGetQuery";
import useBasePath from "@/hooks/useBasePath";

export default function CheckoutPage() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const { customer } = useStorefrontAuth();
  const { cartItems, subtotal, clearCart } = useCart();

  const basePath = useBasePath();

  const { data: countries, isLoading: isCountriesLoading } = useGetQuery({
    endpoint: "/api/countries",
    queryKey: ["countries"],
  });

  const [selectedCountry, setSelectedCountry] = useState("");
  const [currencyCode, setCurrencyCode] = useState("EUR");

  const { data: countryData } = useGetQuery({
    endpoint: `/api/countries/${selectedCountry}`,
    queryKey: ["country", selectedCountry],
    enabled: !!selectedCountry,
  });

  const { mutate, isPending } = usePostMutation({
    endpoint: `/v2/store/global/orders/create/cod`,
    token: customer?.token,
    customerId: customer?.data?.customerId,
    storeId,
  });

  const { mutate: stripeMutate, isPending: isStripePending } = usePostMutation({
    endpoint: `/v2/store/global/orders/create/online`,
    token: customer?.token,
    customerId: customer?.data?.customerId,
    storeId,
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryPhoneCode: "+91",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState({});

  // Update phone code and currency when country data is loaded
  useEffect(() => {
    if (countryData) {
      setFormData((prev) => ({
        ...prev,
        countryPhoneCode: countryData.phone_code || "+91",
      }));
      setCurrencyCode(countryData.currency_code || "EUR");
    }
  }, [countryData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setFormData((prev) => ({
      ...prev,
      country: value,
    }));
    // Clear error when user selects country
    if (errors.country) {
      setErrors((prev) => ({ ...prev, country: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.addressLine1.trim())
      newErrors.addressLine1 = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) return;

    // setIsProcessing(true);

    let requestBody;

    if (paymentMethod === "COD") {
      requestBody = {
        products: cartItems.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          hasVariants: item.hasVariants,
          variant: item.variant,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          discountPrice: item.discountPrice,
          taxAmount: 0,
          lineTotal: parseFloat(
            (item.discountPrice * item.quantity).toFixed(2),
          ),
        })),
        pricingSummary: {
          subTotal: parseFloat(subtotal.toFixed(2)),
          shippingCharges: 0,
          taxTotal: 0,
          discountTotal: 0,
          grandTotal: parseFloat(subtotal.toFixed(2)),
        },
        currencyCode: currencyCode,
        payment: {
          method: "COD",
        },
        shippingDetails: formData,
      };

      mutate(requestBody, {
        onSuccess: () => {
          toast.success("order created");
          clearCart();
          navigate(`${basePath}/shop`);
        },

        onError: () => {
          toast.error("order error");
        },
      });
    } else {
      requestBody = {
        products: cartItems.map((item) => ({
          productId: item.productId,
          productName: item.hasVariants
            ? `${item.productName} - ${item.variant.value.name}`
            : item.productName,
          quantity: item.quantity,
          price: item.discountPrice,
        })),
        currency_code: currencyCode,
        totalAmount: parseFloat(subtotal.toFixed(2)),
        paymentMethod: "Online",
        shippingDetails: formData,
      };

      stripeMutate(requestBody, {
        onSuccess: (res) => {
          toast.success("stripe order created");
          console.log(res);
          clearCart();
          navigate(`${basePath}/shop`);
        },

        onError: () => {
          toast.error("stripe order error");
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Checkout</h1>
          <p className="mt-2 text-neutral-600">Complete your order</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Forms */}
          <CheckoutForm
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            countries={countries}
            isCountriesLoading={isCountriesLoading}
            countryData={countryData}
            onCountryChange={handleCountryChange}
          />

          {/* Right Column - Order Summary */}
          <OrderSummary
            subtotal={subtotal}
            isProcessing={isPending || isStripePending}
            handlePlaceOrder={handlePlaceOrder}
            cartItems={cartItems}
          />
        </div>
      </div>
    </div>
  );
}
