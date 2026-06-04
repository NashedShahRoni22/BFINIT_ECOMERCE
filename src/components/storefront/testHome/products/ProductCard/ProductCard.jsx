import React, { useState } from "react";
import { Plus } from "lucide-react";

const ProductCard = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative flex flex-col gap-3 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className={`h-full w-full object-cover transition-transform duration-500 ease-in-out ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />

        <button
          onClick={() => onQuickView(product)}
          className={`absolute right-4 bottom-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
          aria-label="Quick View"
        >
          <Plus className="h-6 w-6 text-black" />
        </button>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-0.5">
        <h3 className="text-sm font-medium tracking-wide uppercase">
          {product.title}
        </h3>
        <p className="text-sm font-semibold">€{product.price.toFixed(2)}</p>
        <p className="text-xs text-gray-500">{product.availability}</p>
      </div>
    </div>
  );
};

export default ProductCard;
