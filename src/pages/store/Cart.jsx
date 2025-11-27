import { Link, useNavigate, useParams } from "react-router";
import { BsCartX } from "react-icons/bs";
import CartItemRow from "../../components/site/CartItemRow";
import useCart from "../../hooks/cart/useCart";
import { tableHeadings } from "../../data/tableHeadings";
import useGetStorePreference from "../../hooks/stores/useGetStorePreference";

export default function Cart() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const { data: storePreference } = useGetStorePreference(storeId);
  const { cartItems, handleUpdateQuantity, handleCartDelete } = useCart();

  const subTotalInCents = cartItems.reduce((total, item) => {
    const priceInCents = Math.round(
      parseFloat(item.productDiscountPrice?.$numberDecimal) * 100,
    );
    return total + priceInCents * item.quantity;
  }, 0);

  const subTotal = (subTotalInCents / 100).toFixed(2);

  return (
    <section className="px-5 py-10 md:container md:mx-auto md:px-0 md:py-20">
      {cartItems && cartItems.length > 0 ? (
        <>
          <h2 className="font-merriweather text-center text-xl font-medium md:text-3xl">
            Shopping Cart
          </h2>

          {/* Cart Items Table */}
          <div className="my-10 w-full overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr className="divide-x divide-white text-left">
                  {tableHeadings.map((heading, i) => (
                    <th key={i} className="px-1.5 py-2 font-medium md:px-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cartItems &&
                  cartItems.length > 0 &&
                  cartItems.map((item) => (
                    <CartItemRow
                      key={item.productId}
                      item={item}
                      currencySymbol={storePreference?.data?.currencySymbol}
                      handleUpdateQuantity={handleUpdateQuantity}
                      handleCartDelete={handleCartDelete}
                    />
                  ))}

                {/* Sub-Total Amount */}
                <tr>
                  <td
                    colSpan={4}
                    className="px-1.5 py-2 text-right font-medium md:px-3"
                  >
                    Sub-Total:
                  </td>
                  <td className="text-accent px-1.5 py-2 md:px-3">
                    {storePreference?.data?.currencyCode} {subTotal}
                  </td>
                </tr>
                {/* Total Amount */}
                <tr>
                  <td
                    colSpan={4}
                    className="px-1.5 py-2 text-right text-lg font-semibold md:px-3"
                  >
                    Total:
                  </td>
                  <td className="text-accent px-1.5 py-2 text-lg font-semibold md:px-3">
                    {storePreference?.data?.currencyCode} {subTotal}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Shopping & Checkout button */}
          <div className="flex items-center justify-center gap-16">
            <Link
              to="/"
              className="text-accent px-4 py-2 text-center text-lg font-medium"
            >
              Continue Shopping
            </Link>
            <button
              className="bg-accent text-on-primary cursor-pointer px-4 py-2 text-center text-lg font-medium"
              onClick={() => navigate(`/preview/${storeId}/checkout`)}
            >
              Go to Checkout
            </button>
          </div>
        </>
      ) : (
        <div className="flex min-h-[calc(100vh-140px)] flex-col items-center justify-center gap-6 md:min-h-[calc(100vh-240px)]">
          <BsCartX className="text-accent mx-auto text-7xl" />
          <h1 className="font-merriweather mt-8 text-center text-xl md:text-3xl">
            Oops, your cart is <span className="text-accent">Empty!</span>
          </h1>
          <p className="text-center text-lg">
            Browse Our Products and add them to your cart to proceed!
          </p>
          <Link
            to={`/preview/${storeId}`}
            className="bg-accent text-on-primary px-4 py-2 text-lg font-medium"
          >
            Browse Products
          </Link>
        </div>
      )}
    </section>
  );
}
