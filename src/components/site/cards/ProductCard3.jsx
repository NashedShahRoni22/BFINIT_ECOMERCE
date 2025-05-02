import { IoIosArrowForward, IoIosHeartEmpty, IoIosStar } from "react-icons/io";
import { IoCartOutline, IoEye } from "react-icons/io5";
import { Link } from "react-router";
import useCart from "../../../hooks/cart/useCart";

export default function ProductCard3({ product, currencySymbol, storeId }) {
  const { productName, productImage, productPrice } = product;

  const { handleAddToCart } = useCart();

  return (
    <div className="group flex flex-col">
      <div className="relative overflow-hidden">
        <Link to={`/preview/${storeId}/products/${product.productId}`}>
          <img
            src={`https://ecomback.bfinit.com${productImage}`}
            alt=""
            loading="lazy"
            className="h-56 w-full rounded object-cover"
          />
        </Link>
        {/* discount temporarily hidden */}
        {/* {product.discount && (
                <p className="absolute top-1.5 left-1.5 bg-[#e74040] px-4 py-0.5 text-sm font-bold text-white">
                  Sale
                </p>
              )} */}
        <div className="absolute bottom-3 left-0 flex w-full translate-y-[150%] items-center justify-center gap-2.5 transition-all duration-200 ease-linear group-hover:translate-y-0">
          {/* favourite hidden */}
          {/* <div className="hover:text-accent rounded-full bg-white p-1 text-xl shadow-md transition-all duration-200 ease-linear">
                  <IoIosHeartEmpty />
                </div> */}
          <button
            onClick={() => handleAddToCart(product)}
            className="hover:text-accent cursor-pointer rounded-full bg-white p-1 text-xl shadow-md transition-all duration-200 ease-linear"
          >
            <IoCartOutline />
          </button>
          <Link
            to={`/preview/${storeId}/products/${product.productId}`}
            className="hover:text-accent rounded-full bg-white p-1 text-xl shadow-md transition-all duration-200 ease-linear"
          >
            <IoEye />
          </Link>
        </div>
      </div>

      <div className="mt-1 flex justify-between">
        <Link
          to={`/preview/${storeId}/products/${product.productId}`}
          className="hover:text-accent w-fit font-bold transition-all duration-200 ease-in-out"
        >
          {productName}
        </Link>
        {/* ratings hidden */}
        {/* <div className="flex h-fit w-fit items-center gap-1 rounded-full bg-[#252b42] px-2 py-0.5">
          <IoIosStar className="text-sm text-[#ffc633]" />
          <p className="mt-0.5 text-xs text-white">{product.ratings}</p>
        </div> */}
      </div>

      <div className="mt-2 flex items-center gap-2.5">
        {product.productDiscountPrice.$numberDecimal && (
          <p className="font-bold text-neutral-400 line-through">
            {currencySymbol}
            {productPrice.$numberDecimal}
          </p>
        )}
        <p className="font-bold">
          {currencySymbol}
          {product.productDiscountPrice.$numberDecimal}
        </p>
      </div>

      <Link
        to={`/preview/${storeId}/products/${product.productId}`}
        className="hover:border-accent hover:text-accent mt-3.5 flex w-full items-center justify-center rounded-full border py-1"
      >
        Buy Now
        <IoIosArrowForward />
      </Link>
    </div>
  );
}
