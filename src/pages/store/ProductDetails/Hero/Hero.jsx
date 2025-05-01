import { useState } from "react";

export default function Hero({ productDetails }) {
  const { productName } = productDetails.data;
  const [highlightImg, setHighLightImg] = useState(
    productDetails?.data?.productImage[0],
  );

  const handleHiglightImg = (index) => {
    setHighLightImg(productDetails?.data?.productImage[index]);
  };

  return (
    <div className="font-poppins flex flex-col justify-between gap-8 md:flex-row md:gap-16">
      <div className="w-full max-w-96 md:w-1/2">
        <img
          src={`https://ecomback.bfinit.com${highlightImg}`}
          alt={`image of ${productName}`}
          loading="lazy"
          className="mx-auto h-auto max-h-80 w-full max-w-80"
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
        <p></p>
      </div>
    </div>
  );
}
