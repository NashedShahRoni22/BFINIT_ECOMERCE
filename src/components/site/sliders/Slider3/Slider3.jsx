import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { carouselData } from "../../../../data/carouselData";
import banner3 from "../../../../assets/banner3.jpg";
import banner4 from "../../../../assets/banner4.jpg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slider3.css";

export default function Slider3() {
  return (
    <section className="mx-5 grid grid-cols-12 gap-y-8 md:container md:mx-auto md:h-[496px] md:gap-x-8">
      {/* Left Image */}
      <div className="col-span-2 hidden md:block">
        <img src={banner3} alt="" className="h-full w-full object-cover" />
      </div>

      {/* Carousel */}
      <Swiper
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Navigation, Pagination]}
        id="slider3"
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

      {/* Right Image */}
      <div className="col-span-2 hidden md:block">
        <img src={banner4} alt="" className="h-full w-full object-cover" />
      </div>
    </section>
  );
}
