import { Link, useParams } from "react-router";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import useAuth from "../../../hooks/auth/useAuth";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";

export default function OrderDetails() {
  const { orderId } = useParams();
  const { user } = useAuth();

  const { data: orderData, isLoading } = useGetQuery({
    endpoint: `/orders/${orderId}`,
    token: user?.token,
    queryKey: ["orders", orderId],
    enabled: !!orderId && !!user?.token,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="font-poppins text-sm">
      <PageHeading heading="Shipping Details" />

      <div className="mt-6 border border-neutral-100">
        {/* order information */}
        <div className="flex items-start justify-between p-5">
          <div>
            <h2 className="text-lg font-medium">Order Information</h2>
            <p className="text-sm text-neutral-500">
              Order placed on {formatDate(orderData?.data?.createdAt)}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-500">
              {orderData?.data?.orderStatus}
            </span>
            <span className="mt-2 text-sm font-semibold">
              Total: {orderData?.data?.Currency_code}{" "}
              {orderData?.data?.TotalAmount?.$numberDecimal}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 px-5">
          {/* shipping information */}
          <div className="mt-4 space-y-2 rounded border border-neutral-100 p-5">
            <h2 className="mb-4 text-lg font-medium">Shipping Details</h2>
            <p>
              <span className="font-medium">Name:</span>{" "}
              {orderData?.data?.ShippingDetails?.name}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {orderData?.data?.ShippingDetails?.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {orderData?.data?.ShippingDetails?.phone}
            </p>

            <div>
              <p className="font-medium">Address:</p>
              <div className="mt-1 grid grid-cols-2 gap-1">
                <p>
                  <span className="font-medium">Street:</span>{" "}
                  {orderData?.data?.ShippingDetails?.addressLine1}
                </p>
                <p>
                  <span className="font-medium">City:</span>{" "}
                  {orderData?.data?.ShippingDetails?.city}
                </p>
                <p>
                  <span className="font-medium">Street (optional):</span>{" "}
                  {orderData?.data?.ShippingDetails?.addressLine2}
                </p>
                <p>
                  <span className="font-medium">State (optional):</span>{" "}
                  {orderData?.data?.ShippingDetails?.state}
                </p>
                <p>
                  <span className="font-medium">ZIP Code:</span>{" "}
                  {orderData?.data?.ShippingDetails?.zipCode}
                </p>
                <p>
                  <span className="font-medium">Country:</span>{" "}
                  {orderData?.data?.ShippingDetails?.country}
                </p>
              </div>
            </div>
          </div>

          {/* payment information */}
          <div className="mt-4 space-y-2 border border-neutral-100 p-5">
            <h2 className="mb-4 text-lg font-medium">Payment Information</h2>
            <p>
              <span className="font-medium">Payment Method:</span>{" "}
              {orderData?.data?.PaymentMethod}
            </p>
            <p>
              <span className="font-medium">Payment Status:</span>{" "}
              <span className="rounded-full bg-yellow-100 px-3 py-0.5 text-xs text-yellow-500">
                {orderData?.data?.paymentStatus}
              </span>
            </p>
            <p>
              <span className="font-medium">Delivery Status:</span>{" "}
              <span className="rounded-full bg-yellow-100 px-3 py-0.5 text-xs text-yellow-500">
                {orderData?.data?.deliveryStatus}
              </span>
            </p>
            <p>
              <span className="font-medium">Order Status:</span>{" "}
              <span className="rounded-full bg-yellow-100 px-3 py-0.5 text-xs text-yellow-500">
                {orderData?.data?.orderStatus}
              </span>
            </p>
          </div>
        </div>

        <div className="px-10 py-5">
          <h2 className="text-lg font-medium">Products</h2>
          <ul className="mt-2">
            {orderData?.data?.Products?.map((product) => (
              <li
                key={product?.productId}
                className="flex items-center justify-between border-y border-neutral-100 py-2"
              >
                <div>
                  <Link
                    to={`/products/${product?.productId}`}
                    className="font-medium"
                  >
                    {product?.productName}
                  </Link>
                  <p>Quantity: {product?.quantity}</p>
                </div>
                <div>
                  <p>
                    {orderData?.data?.Currency_code}{" "}
                    {parseFloat(product?.price?.$numberDecimal).toFixed(2)} x{" "}
                    {product?.quantity}
                  </p>
                  <p className="font-semibold">
                    {orderData.data.Currency_code}{" "}
                    {(
                      parseFloat(product.price.$numberDecimal) *
                      product.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
