import { Link } from "react-router";
import { IoIosHeartEmpty, IoIosStar } from "react-icons/io";
import { IoCartOutline, IoStarOutline } from "react-icons/io5";
import useCart from "../../../hooks/cart/useCart";

export default function ProductCard2({ product, storeId, currencySymbol }) {
  const { handleAddToCart } = useCart();

  const { productName, productImage, productPrice, productDiscountPrice } =
    product;

  return (
    <div className="group flex flex-col">
      <div className="relative overflow-hidden rounded border border-neutral-100 p-1.5">
        <div className="w-full overflow-hidden">
          <Link
            to={`/preview/${storeId}/products/${product.productId}`}
            className="flex h-44 w-full items-center justify-center"
          >
            <img
              src={`https://ecomback.bfinit.com${productImage}`}
              alt={productName}
              loading="lazy"
              className="max-h-full max-w-full object-contain transition-all duration-200 ease-linear group-hover:scale-105"
            />
          </Link>
        </div>

        {/* ==> add to favourite temporarily hidden <== */}
        {/* <div className="hover:text-accent absolute top-1.5 right-1.5 translate-x-[130%] rounded-full bg-white p-1 text-xl shadow-md transition-all duration-200 ease-linear group-hover:translate-x-0">
          <IoIosHeartEmpty />
        </div> */}

        <button
          className="hover:text-accent absolute bottom-0 left-0 flex w-full translate-y-[130%] cursor-pointer items-center justify-center gap-1.5 bg-black/85 p-1 text-white transition-all duration-200 ease-linear group-hover:translate-y-0"
          onClick={() => handleAddToCart(product)}
        >
          <IoCartOutline className="min-w-fit text-xl" />
          Add To Cart
        </button>
      </div>

      <Link
        to={`/preview/${storeId}/products/${product.productId}`}
        className="flex w-full flex-1 flex-col px-2"
      >
        {/* ==> ratings temporaly hidden <== */}
        {/* <div className="mt-2 flex items-center gap-0.5">
          {Array.from({ length: 4 }, (_, i) => (
            <IoIosStar key={i} className="text-lg text-[#ffc633]" />
          ))}
          <IoStarOutline className="text-lg text-[#ffc633]" />

          {product.ratings < 5 && (
            <div className="ml-1 text-sm">{product.ratings.toFixed(2)}/5</div>
          )}
        </div> */}

        <p className="hover:text-accent mt-2 mb-0.5 line-clamp-2 text-lg font-bold transition-all duration-200 ease-in-out">
          {productName}
        </p>

        <div className="mt-auto flex items-center gap-2">
          <p className="text-accent text-lg font-bold">
            {currencySymbol}
            {productDiscountPrice.$numberDecimal}
          </p>
          {productDiscountPrice && (
            <>
              <p className="text-xs text-neutral-400 line-through">
                {currencySymbol}
                {productPrice.$numberDecimal}
              </p>
            </>
          )}
        </div>
      </Link>
    </div>
  );
}
