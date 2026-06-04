import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const blogs = [
  {
    image:
      "https://release-main.myshopify.com/cdn/shop/articles/pexels-cottonbro-9861900_1_e6ad9a6c-9995-4ca2-8874-9f4b32a3130d.jpg?v=1736767535&width=2160",
    title: "BTS: Matching Shooting Locations With Our Collections",
    posted_by: "Julia Hampe",
    date: "March 1, 2024",
  },
  {
    image:
      "https://release-main.myshopify.com/cdn/shop/articles/blog3_958c3e5a-c937-42b1-b77f-af250611a504.jpg?v=1765449515",
    title: "10 Fresh Fashion Trends for the Season Ahead",
    posted_by: "Julia Hampe",
    date: "March 1, 2024",
  },
  {
    image:
      "https://release-main.myshopify.com/cdn/shop/articles/pexels-cottonbro-studio-10679182.jpg?v=1709300794&width=2160",
    title: "Fashion Forward: Navigating the Path to Sustainable Style",
    posted_by: "Julia Hampe",
    date: "March 1, 2024",
  },
];

export default function Blogs() {
  return (
    <div className="py-20">
      <div className="flex items-center justify-between">
        <h2 className="mb-6 text-3xl font-semibold">Blog</h2>
        <div className="flex items-center gap-3 md:gap-5">
          <p className="relative cursor-pointer text-sm leading-none font-normal after:absolute after:-bottom-1 after:left-1/2 after:h-[0.5px] after:w-full after:-translate-x-1/2 after:bg-current after:transition-all after:duration-300 after:content-[''] hover:after:w-1/2">
            VISIT BLOGS
          </p>

          <div className="flex items-center gap-2">
            <button className="flex h-8 w-8 cursor-pointer items-center justify-center">
              <ChevronLeft size={16} />
            </button>

            <button className="flex h-8 w-8 cursor-pointer items-center justify-center">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {blogs.map((blog, i) => (
          <div key={i}>
            <img
              src={blog.image}
              alt={blog.title}
              className="h-[365px] w-full object-cover"
            />
            <div className="mx-auto mt-4 w-[90%] space-y-2">
              <h2 className="font-inter text-lg font-medium">{blog.title}</h2>
              <p className="text-sm">
                <span>{blog.posted_by}</span> | <span>{blog.date}</span>
              </p>
              <button className="cursor-pointer border-b border-b-black text-xs font-normal">
                READ MORE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
