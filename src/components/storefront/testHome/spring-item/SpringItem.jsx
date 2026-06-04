import React from "react";

export default function SpringItem() {
  return (
    <div className="bg-[#212121]">
      <div className="flex flex-col md:flex-row">
        <div className="w-full">
          <img
            src="https://release-main.myshopify.com/cdn/shop/files/pexels-sergio-montoya-gianello-1793150310-28669447_2.jpg?v=1736789723"
            alt=""
          />
        </div>
        <div className="mx-auto w-full bg-[#212121] text-center text-white">
          <div className="px-20 pt-40">
            <h2 className="font-inter mb-16 text-center text-3xl font-medium md:text-5xl">
              <span className="italic">Spring has arrived</span>. <br />{" "}
              Discover the new items
            </h2>

            <span className="relative cursor-pointer text-sm leading-none font-normal uppercase after:absolute after:-bottom-1 after:left-1/2 after:h-[0.5px] after:w-full after:-translate-x-1/2 after:bg-current after:transition-all after:duration-300 after:content-[''] hover:after:w-1/2">
              Discover now
            </span>
          </div>
          <img
            src="https://release-main.myshopify.com/cdn/shop/files/pexels-krivitskiy-1590483_1.jpg?v=1736789619&width=2160"
            alt=""
            className="mt-10 h-[650px] w-full px-4"
          />
        </div>
      </div>
      <div className="z-10 mt-6 h-screen bg-[url('https://res.cloudinary.com/dxn0qc49a/image/upload/q_auto/f_auto/v1777802066/hero_banner_1_mjkgpp.webp')] bg-cover bg-center text-white">
        <div className="z-50 flex h-full w-full items-center justify-center bg-black text-white opacity-70">
          <div className="z-99 text-center">
            <p className="text-sm">
              Timeless staples, redefined for everyday sophistication
            </p>
            <h2 className="my-6 text-4xl">Elevated Essentials</h2>
            <p className="text-sm">
              Everyday staples reimagined—shop the Core Collection or step up
              with the Premium Edit.
            </p>
            <button className="mt-8 cursor-pointer rounded-2xl border border-white px-6 py-2 text-xs text-white transition duration-500 hover:bg-white hover:text-black">
              Discover Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
