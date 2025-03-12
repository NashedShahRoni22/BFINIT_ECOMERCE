import { Link } from "react-router";
import { IoIosArrowForward, IoIosHeartEmpty, IoIosStar } from "react-icons/io";
import { IoCartOutline, IoEye } from "react-icons/io5";
import { products } from "../../../data/productData";

export default function Product3() {
  return (
    <section className="font-roboto mx-5 py-10 md:container md:mx-auto md:py-20">
      <h2 className="font-merriweather text-xl font-medium md:text-3xl">
        Featured Products
      </h2>

      <div className="mt-10 grid grid-cols-2 gap-5 md:mt-10 md:grid-cols-3 md:gap-8 lg:grid-cols-5">
        {products.slice(0, 10).map((product, i) => (
          // product card
          <div key={i} className="group flex flex-col">
            <Link className="relative overflow-hidden">
              <img
                src={product.image}
                alt=""
                loading="lazy"
                className="h-56 w-full rounded object-cover"
              />
              {product.sale && (
                <p className="absolute top-1.5 left-1.5 bg-[#e74040] px-4 py-0.5 text-sm font-bold text-white">
                  Sale
                </p>
              )}
              <div className="absolute bottom-3 left-0 flex w-full translate-y-[150%] items-center justify-center gap-2.5 transition-all duration-200 ease-linear group-hover:translate-y-0">
                <div className="hover:text-accent rounded-full bg-white p-1 text-xl shadow-md transition-all duration-200 ease-linear">
                  <IoIosHeartEmpty />
                </div>
                <div className="hover:text-accent rounded-full bg-white p-1 text-xl shadow-md transition-all duration-200 ease-linear">
                  <IoCartOutline />
                </div>
                <div className="hover:text-accent rounded-full bg-white p-1 text-xl shadow-md transition-all duration-200 ease-linear">
                  <IoEye />
                </div>
              </div>
            </Link>

            <div className="mt-1 flex justify-between">
              <Link className="hover:text-accent w-fit font-bold transition-all duration-200 ease-in-out">
                {product.title}
              </Link>
              <div className="flex h-fit w-fit items-center gap-1 rounded-full bg-[#252b42] px-2 py-0.5 text-sm">
                <IoIosStar className="text-[#ffc633]" />
                <p className="mt-0.5 text-white">{product.ratings}</p>
              </div>
            </div>

            <p className="mt-2 text-sm text-neutral-400">
              We focus on ergonomics and meeting you....
            </p>

            <div className="mt-2 flex items-center gap-2.5">
              {product.discount && (
                <p className="font-bold text-neutral-400 line-through">$240</p>
              )}
              <p className="font-bold">$120</p>
            </div>

            <Link className="hover:border-accent hover:text-accent mt-3.5 flex w-full items-center justify-center rounded-full border py-1">
              Buy Now
              <IoIosArrowForward />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
