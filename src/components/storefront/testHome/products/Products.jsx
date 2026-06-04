import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import ProductCard from "./ProductCard/ProductCard";
import ProductDetails from "./ProductDetails/ProductDetails";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      title: "Black Puffer Edge",
      price: 90,
      currency: "EUR",
      regularPrice: 90,
      availability: "Available in 1 title",
      image:
        "https://res.cloudinary.com/dxn0qc49a/image/upload/q_auto/f_auto/v1777205923/cloth9_m23kgq.png",
    },
    {
      title: "Grey Urban Jacket",
      price: 75,
      currency: "EUR",
      regularPrice: 75,
      availability: "Available in 2 sizes",
      image:
        "https://res.cloudinary.com/dxn0qc49a/image/upload/q_auto/f_auto/v1777205900/cloth6_y7mzqq.png",
    },
    {
      title: "Classic Winter Coat",
      price: 120,
      currency: "EUR",
      regularPrice: 120,
      availability: "Available in 3 sizes",
      image:
        "https://res.cloudinary.com/dxn0qc49a/image/upload/q_auto/f_auto/v1777205899/cloth7_sdkhgv.png",
    },
    {
      title: "Lightweight Puffer Jacket",
      price: 65,
      currency: "EUR",
      regularPrice: 65,
      availability: "Available in 1 title",
      image:
        "https://res.cloudinary.com/dxn0qc49a/image/upload/q_auto/f_auto/v1777205887/cloth3_gsxykk.png",
    },
  ];

  const openProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    document.body.style.overflow = selectedProduct ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProduct]);

  return (
    <section className="py-16">
      <div className="flex items-center justify-between px-8">
        <h2 className="font-inter text-xl md:text-3xl">Just Arrived</h2>
        <div className="flex items-center md:gap-4">
          <p className="relative cursor-pointer text-sm leading-none font-normal after:absolute after:-bottom-1 after:left-1/2 after:h-[0.5px] after:w-full after:-translate-x-1/2 after:bg-current after:transition-all after:duration-300 after:content-[''] hover:after:w-1/2">
            View All
          </p>
          <ChevronLeft className="cursor-pointer text-xs" />
          <ChevronRight className="cursor-pointer text-xs" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 p-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            onQuickView={openProductDetails}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={closeProductDetails}
        />
      )}
    </section>
  );
};

export default Products;
