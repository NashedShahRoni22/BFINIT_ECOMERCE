import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { carouselData } from "../../../../data/carouselData";
import "swiper/css";
import "swiper/css/navigation";
import "./slider1.css";

export default function Slider1() {
  return (
    <section className="mx-5 md:container md:mx-auto">
      <Swiper
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        modules={[Autoplay, Navigation]}
        id="slider1"
        className="relative h-auto w-full md:h-[496px]"
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
    </section>
  );
}
