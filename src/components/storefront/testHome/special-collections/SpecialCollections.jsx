import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const SpecialCollections = () => {
  const slider = [
    {
      image:
        "https://res.cloudinary.com/dxn0qc49a/image/upload/q_auto/f_auto/v1777879428/slider_img1_egocas.webp",
      title: "Tops",
      num: "10",
    },
    {
      image:
        "https://res.cloudinary.com/dxn0qc49a/image/upload/q_auto/f_auto/v1777879428/slider_img2_eiatyw.webp",
      title: "Accessories",
      num: "22",
    },
    {
      image:
        "https://res.cloudinary.com/dxn0qc49a/image/upload/q_auto/f_auto/v1777879428/slider_img3_flponi.webp",
      title: "Bottoms",
      num: "15",
    },
  ];
  const bannerCenter =
    "https://res.cloudinary.com/dxn0qc49a/image/upload/q_auto/f_auto/v1777882755/banner_center_oqwvwh.webp";
  return (
    <section className="py-16">
      <div className="flex items-center justify-between px-2 md:px-8">
        <h2 className="font-inter text-xl md:text-3xl">
          Our Special Collections
        </h2>

        <div className="flex items-center gap-3 md:gap-5">
          <p className="relative cursor-pointer text-sm leading-none font-normal after:absolute after:-bottom-1 after:left-1/2 after:h-[0.5px] after:w-full after:-translate-x-1/2 after:bg-current after:transition-all after:duration-300 after:content-[''] hover:after:w-1/2">
            Explore All
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
      <div className="flex items-center gap-10 overflow-hidden p-8">
        {slider.map((slide, idx) => (
          <div key={idx}>
            <div className="cursor-pointer overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-120 w-99 overflow-hidden object-cover transition duration-300 hover:scale-105"
              />
            </div>
            <p className="mt-2 text-center text-3xl font-semibold">
              {slide.title}{" "}
              <sup className="text-muted-foreground text-sm">{slide.num}</sup>
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 pt-10 md:grid-cols-2">
        <div>
          <img
            src={bannerCenter}
            alt=""
            className="h-auto w-full object-cover"
          />
        </div>
        <div className="flex h-auto w-full items-center justify-center bg-black/85 py-20 md:py-0">
          <div className="text-center">
            <h2 className="font-m pt-3 pb-12 text-6xl text-white">
              Classic Meets Contemporary
            </h2>
            <p className="mb-6 px-6 text-white">
              Redefine timeless styles with a modern twist—explore the Heritage
              Collection and the Future Edit.
            </p>
            <button className="rounded-2xl border border-white bg-white px-6 py-3 transition duration-500 hover:bg-transparent hover:text-white">
              Discover More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialCollections;
