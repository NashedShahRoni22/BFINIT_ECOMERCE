import { Link } from "react-router";
import { IoIosHeartEmpty, IoIosStar } from "react-icons/io";
import { IoCartOutline, IoStarOutline } from "react-icons/io5";
import useCart from "../../../hooks/cart/useCart";

export default function ProductCard2({ product, storeId, currencySymbol }) {
  const { handleAddToCart } = useCart();

  const { productName, productImage, productPrice, productDiscountPrice } =
    product;

  return (
    <div className="group flex flex-col gap-1">
      <div className="relative flex-1 overflow-hidden rounded border border-neutral-100 p-1.5">
        <Link to={`/preview/${storeId}/products/${product.productId}`}>
          <img
            src={`https://ecomback.bfinit.com${productImage}`}
            alt=""
            loading="lazy"
            className="h-56 w-full rounded object-cover transition-all duration-200 ease-linear group-hover:scale-[1.07]"
          />
        </Link>
        {/* add to favourite temporarily hidden */}
        {/* <div className="hover:text-accent absolute top-1.5 right-1.5 translate-x-[130%] rounded-full bg-white p-1 text-xl shadow-md transition-all duration-200 ease-linear group-hover:translate-x-0">
          <IoIosHeartEmpty />
        </div> */}
        <button
          className="hover:text-accent absolute bottom-0 left-0 flex w-full translate-y-full cursor-pointer items-center justify-center gap-1.5 bg-black/85 p-1 text-white transition-all duration-200 ease-linear group-hover:translate-y-0"
          onClick={() => handleAddToCart(product)}
        >
          <IoCartOutline className="min-w-fit text-xl" />
          Add To Cart
        </button>
      </div>
      <Link
        to={`/preview/${storeId}/products/${product.productId}`}
        className="hover:text-accent w-fit text-lg font-bold transition-all duration-200 ease-in-out"
      >
        {productName}
      </Link>

      {/* ratings temprary hidden */}
      {/* <div className="flex items-center gap-0.5">
        {Array.from({ length: 4 }, (_, i) => (
          <IoIosStar key={i} className="text-lg text-[#ffc633]" />
        ))}
        <IoStarOutline className="text-lg text-[#ffc633]" />
        {product.ratings < 5 && (
      )}
        <div className="ml-1 text-sm">
          {product.ratings.toFixed(1)}4/5
        </div>
      </div> */}

      <div className="mt-1 flex items-center gap-2.5">
        <p className="text-lg font-bold">
          {currencySymbol}
          {productDiscountPrice.$numberDecimal}
        </p>
        {productDiscountPrice && (
          <>
            <p className="text-lg font-bold text-neutral-400 line-through">
              {currencySymbol}
              {productPrice.$numberDecimal}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
