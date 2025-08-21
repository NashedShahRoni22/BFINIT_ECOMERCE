import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { carouselData } from "../../../../data/carouselData";
import banner1 from "../../../../assets/banner1.webp";
import banner2 from "../../../../assets/banner2.webp";
import "swiper/css";
import "swiper/css/navigation";
import "./slider2.css";

export default function Slider2() {
  return (
    <section className="grid grid-cols-12 gap-y-8 px-5 py-5 md:container md:mx-auto md:gap-x-8">
      <Swiper
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        modules={[Autoplay, Navigation]}
        id="slider2"
        className="relative col-span-12 h-auto w-full md:col-span-8"
      >
        {carouselData.map((data, i) => (
          <SwiperSlide key={i}>
            <Link to={data.url}>
              <img
                src={data.img}
                alt=""
                className="h-full w-full object-cover"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="col-span-12 flex gap-8 md:col-span-4 md:flex-col">
        <div className="w-1/2 md:w-full">
          <img src={banner1} alt="" />
        </div>
        <div className="w-1/2 md:w-full">
          <img src={banner2} alt="" />
        </div>
      </div>
    </section>
  );
}
