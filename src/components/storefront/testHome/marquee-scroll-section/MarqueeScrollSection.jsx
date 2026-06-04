import { Instagram } from "lucide-react";
import React from "react";
const images = [
  "https://release-main.myshopify.com/cdn/shop/files/pexels-sergio-montoya-gianello-1793150310-28669447_2.jpg?v=1736789723",
  "https://release-main.myshopify.com/cdn/shop/files/pexels-krivitskiy-1590483_1.jpg?v=1736789619&width=2160",
  "https://release-main.myshopify.com/cdn/shop/files/pexels-alessandra-shalbe-859114866-20446138_1.jpg?v=1736789593&width=2160",
  "https://release-main.myshopify.com/cdn/shop/files/pexels-yemi-wallington-5999400-18567265_1.jpg?v=1736790301",
];

export default function MarqueeScrollSection() {
  return (
    <div>
      <marquee behavior="scroll" direction="">
        <div className="flex gap-2">
          {images.map((image, i) => (
            <img
              key={i}
              src={image}
              alt=""
              className="h-[350px] w-full object-cover"
            />
          ))}
          <div className="flex h-[350px] w-full items-center justify-center bg-[#212121] p-6 text-white">
            <div>
              <h2 className="text-3xl font-semibold">
                Join the <br />
                <span className="italic">Family</span>
              </h2>
              <p className="relative mt-10 flex cursor-pointer items-center gap-2 text-sm leading-none font-normal after:absolute after:-bottom-1 after:left-1/2 after:h-[0.5px] after:w-full after:-translate-x-1/2 after:bg-current after:transition-all after:duration-300 after:content-[''] hover:after:w-1/2">
                <Instagram /> Follow US
              </p>
            </div>
          </div>
        </div>
      </marquee>
    </div>
  );
}
