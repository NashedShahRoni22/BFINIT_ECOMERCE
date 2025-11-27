import { Link } from "react-router";
import useCart from "../../../hooks/cart/useCart";
import { generateDiscountPercentage } from "../../../utils/site/generateDiscountPercentage";

export default function ProductCard({ product, currencySymbol, storeId }) {
  const { productName, productImage, productPrice, productDiscountPrice } =
    product;

  const { handleAddToCart } = useCart();

  return (
    <div className="flex flex-col rounded-sm border border-neutral-200/50">
      <Link
        to={`/preview/${storeId}/products/${product.productId}`}
        className="group inline-block flex-1"
      >
        <div className="w-full overflow-hidden">
          <div className="h-44 w-full">
            <img
              src={`https://ecomback.bfinit.com${productImage}`}
              alt=""
              className="h-full w-full object-cover transition-all duration-200 ease-linear group-hover:scale-105"
            />
          </div>
        </div>

        <h3 className="group-hover:text-accent mt-4 line-clamp-2 px-4 font-medium transition-all duration-200 ease-linear">
          {productName}
        </h3>

        <div className="mt-1.5 flex items-baseline gap-2 px-4">
          <span className="text-xl font-bold">
            {currencySymbol}
            {productPrice?.$numberDecimal}
          </span>
          {/* <span className="text-xs text-gray-500">
            -
            {generateDiscountPercentage(
              productPrice?.$numberDecimal,
              productDiscountPrice?.$numberDecimal,
            )}
            %
          </span> */}
        </div>
      </Link>

      <div className="flex flex-col justify-between gap-1 p-2 sm:flex-row">
        <Link
          to={`/preview/${storeId}/products/${product.productId}`}
          className="bg-accent border-accent text-on-primary hover:bg-accent/85 w-full cursor-pointer rounded-sm border py-1.5 text-center text-sm transition-all duration-200 ease-linear"
        >
          Buy Now
        </Link>
        <button
          onClick={() => handleAddToCart(product)}
          className="hover:border-accent hover:text-accent w-full cursor-pointer rounded-sm border border-gray-300 px-0.5 py-1.5 text-center text-sm transition-all duration-200 ease-linear"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
