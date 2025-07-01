import { Link, useLocation } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { carouselData } from "../../../../data/carouselData";
import "swiper/css";
import "swiper/css/navigation";
import "./slider1.css";
import { useState } from "react";

export default function Slider1() {
  const { pathname } = useLocation();
  const pathSegment = pathname?.split("/")[1];
  const isCustomize = pathSegment === "customize-store";
  const [showSlideEdit, setShowSlideEdit] = useState(false);

  const toggleSlideEdit = () => {
    setShowSlideEdit((prev) => !prev);
  };

  return (
    <section className="mx-5 py-5 md:container md:mx-auto">
      {showSlideEdit && isCustomize && (
        <div className="relative w-full overflow-hidden rounded-lg border border-dashed border-neutral-200 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              Hero Slider (2/5)
            </h3>
            <div className="text-sm text-gray-600">Recommended: 1536x600px</div>
          </div>

          {/* slider cards container */}
          <div className="grid grid-cols-3 gap-3">
            {carouselData?.map((data, i) => (
              <div
                key={i}
                className="rounded-lg border border-neutral-200 p-2.5"
              >
                <p>Slider {i + 1}</p>
                <div>
                  <img src={data.img} className="h-full w-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!showSlideEdit && (
        <Swiper
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={true}
          modules={[Autoplay, Navigation]}
          id="slider1"
          className="relative h-[200px] w-full overflow-hidden rounded-lg sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]"
        >
          {isCustomize && (
            <button
              onClick={toggleSlideEdit}
              className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded bg-white/80 px-3 py-1 text-sm shadow hover:bg-white"
            >
              <HiOutlinePencilSquare className="h-4 w-4" />
              Edit Slideshow
            </button>
          )}

          {carouselData.map((data, i) => (
            <SwiperSlide key={i}>
              <Link to={data.url} className="block h-full w-full">
                <img
                  src={data.img}
                  alt={data.title || `Slide ${i + 1}`}
                  className="h-full w-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
