import { useState } from "react";
import { useLocation } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { carouselData } from "../../../../data/carouselData";
import "swiper/css";
import "swiper/css/navigation";
import "./slider1.css";
import SliderUpdateCard from "../../../admin/SliderUpdateCard/SliderUpdateCard";
import toast from "react-hot-toast";

export default function Slider1() {
  const { pathname } = useLocation();
  const pathSegment = pathname?.split("/")[1];
  const isCustomize = pathSegment === "customize-store";
  const [showSlideEdit, setShowSlideEdit] = useState(false);
  const [sliderData, setSliderData] = useState([...carouselData]);

  // toggle slide edit component
  const toggleSlideEdit = () => {
    setShowSlideEdit((prev) => !prev);
  };

  // remove image
  const handleImgRemove = (id) => {
    const filteredImg = sliderData.map((slider) =>
      slider.id === id ? { ...slider, img: null } : slider,
    );
    setSliderData(filteredImg);
  };

  // handle image change
  const handleImgChange = (e, id) => {
    const file = e.target.files[0];
    e.target.value = null;

    if (file) {
      const maxSizeInBytes = 2 * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        return toast.error("Image size must be 2MB or less.");
      }
    }

    const filteredImg = sliderData.map((slider) =>
      slider.id === id ? { ...slider, img: file } : slider,
    );
    setSliderData(filteredImg);
  };

  // handle update
  const handleUpdate = () => {
    toggleSlideEdit();
  };

  return (
    <section className="mx-5 py-5 md:container md:mx-auto">
      {showSlideEdit && isCustomize && (
        <div className="relative w-full overflow-hidden rounded-lg border border-dashed border-neutral-200 p-4">
          <div className="mb-4 flex justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              Edit Slider Image
            </h3>
            <div>
              <p className="text-xs text-gray-600">Recommended: 1536x600px</p>
              <p className="text-xs text-gray-600">Max size: 2MB</p>
            </div>
          </div>

          {/* slider cards container */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {sliderData?.map((data, i) => (
              <SliderUpdateCard
                key={data.id}
                i={i}
                data={data}
                handleImgRemove={handleImgRemove}
                handleImgChange={handleImgChange}
              />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-end gap-4">
            <button
              onClick={toggleSlideEdit}
              className="rounded-lg bg-neutral-200 px-3 py-1.5 text-[13px] font-medium transition-all duration-200 ease-in-out hover:bg-neutral-300"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="bg-dashboard-primary hover:bg-dashboard-primary-hover cursor-pointer rounded-lg px-3 py-1.5 text-[13px] font-medium text-white transition-all duration-200 ease-in-out"
            >
              Update
            </button>
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

          {sliderData.map(
            (data, i) =>
              data.img !== null && (
                <SwiperSlide key={i}>
                  <div className="block h-full w-full">
                    <img
                      // TODO: remove file type checking here. only show data.img
                      src={
                        data.img instanceof File
                          ? URL.createObjectURL(data.img)
                          : data.img
                      }
                      alt={data.title || `Slide ${i + 1}`}
                      className="h-full w-full object-cover"
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </SwiperSlide>
              ),
          )}
        </Swiper>
      )}
    </section>
  );
}
