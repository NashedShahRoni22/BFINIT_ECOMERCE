import { Link } from "react-router";
import useCart from "../../../hooks/cart/useCart";

export default function ProductCard({ product, currencySymbol, storeId }) {
  const { productName, productImage, productDiscountPrice } = product;

  const { handleAddToCart } = useCart();

  return (
    <div className="flex flex-col items-center gap-2.5 overflow-hidden rounded border border-gray-200 px-4 py-4">
      <Link
        to={`/preview/${storeId}/products/${product.productId}`}
        className="group h-56 w-full flex-1 overflow-hidden"
      >
        <img
          src={`https://ecomback.bfinit.com${productImage}`}
          alt=""
          className="h-full w-full object-contain transition-all duration-200 ease-linear group-hover:scale-105"
        />
      </Link>
      <div className="flex w-full flex-col items-center gap-2.5">
        <Link
          className="hover:text-accent truncate text-center text-lg font-bold transition-all duration-200 ease-in-out"
          to={`/preview/${storeId}/products/${product.productId}`}
        >
          {productName.length > 38
            ? `${productName.slice(0, 38)}...`
            : productName}
        </Link>
        {/* <p>{p.ratings}</p> */}
        <p className="font-semibold">
          {currencySymbol}
          {productDiscountPrice.$numberDecimal}
        </p>
        <div className="flex w-full items-center gap-2 text-sm">
          <Link
            to={`/preview/${storeId}/products/${product.productId}`}
            className="border-accent bg-accent hover:bg-accent/85 ease-in-sout w-full cursor-pointer rounded border p-1 text-center text-white transition-all duration-200"
          >
            Buy Now
          </Link>
          <button
            onClick={() => handleAddToCart(product)}
            className="border-accent hover:bg-accent w-full cursor-pointer rounded border p-1 transition-all duration-200 ease-in-out hover:text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
