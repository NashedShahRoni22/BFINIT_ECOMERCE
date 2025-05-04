import { useState } from "react";
import useCart from "../../../../hooks/cart/useCart";
import { useNavigate, useParams } from "react-router";

export default function Hero({ productDetails, currencySymbol }) {
  const {
    productName,
    productPrice,
    productDiscountPrice,
    productCategory,
    productSubcategory,
    productBrand,
    productQuantity,
  } = productDetails.data;
  const { storeId } = useParams();
  const navigate = useNavigate();
  const { handleAddToCart } = useCart();
  const [highlightImg, setHighLightImg] = useState(
    productDetails?.data?.productImage[0],
  );
  const [quantity, setQuantity] = useState(1);

  const handleHiglightImg = (index) => {
    setHighLightImg(productDetails?.data?.productImage[index]);
  };

  const handleIncrement = () => {
    if (quantity < productQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuyNow = (product, quantity) => {
    handleAddToCart(product, quantity);
    navigate(`/preview/${storeId}/checkout`);
  };

  return (
    <div className="font-poppins flex flex-col justify-between gap-8 md:flex-row md:gap-16">
      <div className="w-full max-w-96 md:w-1/2">
        <img
          src={`https://ecomback.bfinit.com${highlightImg}`}
          alt={`image of ${productName}`}
          loading="lazy"
          className="mx-auto mb-8 h-auto max-h-96 w-full max-w-96 rounded border border-neutral-200"
        />
        <div className="flex flex-wrap items-center justify-center gap-4">
          {productDetails?.data?.productImage?.length > 0 &&
            productDetails?.data?.productImage?.map((img, i) => (
              <img
                key={i}
                onClick={() => handleHiglightImg(i)}
                src={`https://ecomback.bfinit.com${img}`}
                alt={`image of ${productName}`}
                loading="lazy"
                className={`size-16 rounded-md border object-contain ${highlightImg === img ? "border-accent bg-neutral-100" : "cursor-pointer border-transparent"}`}
              />
            ))}
        </div>
      </div>

      <div className="w-full flex-1">
        <h1 className="text-2xl font-medium">{productName}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-lg font-medium">
          Price:{" "}
          <p className="text-neutral-400">
            <span className="text-sm">{currencySymbol}</span>
            <span className="line-through">{productPrice.$numberDecimal}</span>
          </p>
          <p>
            <span className="text-sm">{currencySymbol}</span>
            <span>{productDiscountPrice.$numberDecimal}</span>
          </p>
        </div>
        <div className="my-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-neutral-500">Category</p>
            <p className="capitalize">{productCategory}</p>
          </div>
          <div>
            <p className="font-medium text-neutral-500">Subcategory</p>
            <p className="capitalize">{productSubcategory}</p>
          </div>
          <div>
            <p className="font-medium text-neutral-500">Brand</p>
            <p className="capitalize">{productBrand}</p>
          </div>
          <div>
            <p className="font-medium text-neutral-500">Availability</p>
            <p>
              {productQuantity > 0 ? (
                <span className="text-green-600">In Stock</span>
              ) : (
                "Out of Stock"
              )}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-4 flex items-center gap-4">
            <p className="font-medium">Quantity:</p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrement}
                className="flex size-8 cursor-pointer items-center justify-center rounded border border-neutral-300 hover:bg-neutral-100"
              >
                -
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="flex size-8 cursor-pointer items-center justify-center rounded border border-neutral-300 hover:bg-neutral-100"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleAddToCart(productDetails.data, quantity)}
              className="bg-accent hover:bg-accent/85 cursor-pointer rounded px-6 py-3 font-medium text-white"
            >
              Add to Cart
            </button>
            <button
              onClick={() => handleBuyNow(productDetails?.data, quantity)}
              className="border-accent text-accent hover:bg-accent cursor-pointer rounded border px-6 py-3 font-medium transition-all duration-200 ease-in-out hover:text-white"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
