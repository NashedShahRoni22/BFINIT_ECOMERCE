import { Link } from "react-router";
import useCart from "../../../hooks/cart/useCart";

export default function ProductCard({ product, currencySymbol }) {
  const { productName, productImage, productPrice } = product;

  const { handleAddToCart } = useCart();

  return (
    <div className="flex flex-col items-center gap-2.5 overflow-hidden rounded">
      <img
        src={`https://ecomback.bfinit.com${productImage}`}
        alt=""
        className="h-56 w-full flex-1 object-cover"
      />
      <div className="flex w-full flex-col items-center gap-2.5">
        <Link className="hover:text-accent w-fit text-lg font-bold transition-all duration-200 ease-in-out">
          {productName}
        </Link>
        {/* <p>{p.ratings}</p> */}
        <p className="font-semibold">
          {currencySymbol}
          {productPrice.$numberDecimal}
        </p>
        <button
          onClick={() => handleAddToCart(product)}
          className="w-full cursor-pointer rounded border px-2 py-1"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
