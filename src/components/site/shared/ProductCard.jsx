import { Link } from "react-router";
import useCart from "../../../hooks/cart/useCart";

export default function ProductCard({ product, currencySymbol, storeId }) {
  const { productName, productImage, productDiscountPrice } = product;

  const { handleAddToCart } = useCart();

  return (
    <div className="flex flex-col rounded-sm px-2 shadow-sm">
      <Link
        to={`/preview/${storeId}/products/${product.productId}`}
        className="group inline-block flex-1 text-center text-sm"
      >
        <div className="w-full overflow-hidden">
          <div className="flex h-44 w-full items-center justify-center">
            <img
              src={`https://ecomback.bfinit.com${productImage}`}
              alt=""
              className="max-h-full max-w-full object-contain transition-all duration-200 ease-linear group-hover:scale-105"
            />
          </div>
        </div>
        <p className="line-clamp-2">{productName}</p>
        <p className="group-hover:text-accent mt-2 transition-all duration-200 ease-in-out">
          {currencySymbol}
          {productDiscountPrice.$numberDecimal}
        </p>
      </Link>

      <div className="flex justify-between gap-1 py-4 text-[13px]">
        <Link
          to={`/preview/${storeId}/products/${product.productId}`}
          className="bg-accent border-accent text-on-primary w-full cursor-pointer rounded-sm border p-0.5 text-center"
        >
          Buy Now
        </Link>
        <button
          onClick={() => handleAddToCart(product)}
          className="border-accent text-accent w-full cursor-pointer rounded-sm border p-0.5 text-center"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
