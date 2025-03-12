import { Link } from "react-router";
import { IoIosHeartEmpty, IoIosStar } from "react-icons/io";
import { IoCartOutline, IoStarOutline } from "react-icons/io5";
import { products } from "../../../data/productData";

export default function Product2() {
  return (
    <section className="font-roboto mx-5 py-10 md:container md:mx-auto md:py-20">
      <h2 className="font-merriweather text-xl font-medium md:text-3xl">
        Featured Products
      </h2>

      <div className="mt-10 grid grid-cols-2 gap-5 md:mt-10 md:grid-cols-3 md:gap-8 lg:grid-cols-5">
        {products.slice(0, 10).map((product, i) => (
          // product card
          <div key={i} className="group flex flex-col gap-1">
            <Link className="relative flex-1 overflow-hidden rounded border border-neutral-100 p-1.5">
              <img
                src={product.image}
                alt=""
                loading="lazy"
                className="h-56 w-full rounded object-cover transition-all duration-200 ease-linear group-hover:scale-[1.07]"
              />
              <div className="hover:text-accent absolute top-1.5 right-1.5 translate-x-[110%] rounded-full bg-white p-1 text-xl shadow-md transition-all duration-200 ease-linear group-hover:translate-x-0">
                <IoIosHeartEmpty />
              </div>
              <div className="hover:text-accent absolute bottom-0 left-0 flex w-full translate-y-full items-center justify-center gap-1.5 bg-black/85 p-1 text-white transition-all duration-200 ease-linear group-hover:translate-y-0">
                <IoCartOutline className="min-w-fit text-xl" /> Add To Cart
              </div>
            </Link>
            <Link className="hover:text-accent w-fit text-lg font-bold transition-all duration-200 ease-in-out">
              {product.title}
            </Link>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: product.ratings }, (_, i) => (
                <IoIosStar key={i} className="text-lg text-[#ffc633]" />
              ))}
              {product.ratings < 5 && (
                <IoStarOutline className="text-lg text-[#ffc633]" />
              )}
              <div className="ml-1 text-sm">{product.ratings.toFixed(1)}/5</div>
            </div>
            <div className="mt-1 flex items-center gap-2.5">
              <p className="text-lg font-bold">$120</p>
              {product.discount && (
                <>
                  <p className="text-lg font-bold text-neutral-400 line-through">
                    $240
                  </p>
                  <div className="rounded-full bg-[#ff3333]/10 px-3.5 py-1 text-xs text-[#ff3333]">
                    -20%
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
