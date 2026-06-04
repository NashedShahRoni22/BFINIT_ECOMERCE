import React from "react";

const TimelessClassics = () => {
  const img1 =
    "https://res.cloudinary.com/dxn0qc49a/image/upload/q_auto/f_auto/v1777805535/model1_ykn9jq.webp";

  const img2 =
    "https://res.cloudinary.com/dxn0qc49a/image/upload/q_auto/f_auto/v1777805683/model2_pib6rj.webp";
  const img3 =
    "https://res.cloudinary.com/dxn0qc49a/image/upload/q_auto/f_auto/v1777806158/model3_tpz78b.webp";
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex w-full flex-col md:flex-row">
        <div className="group relative w-full cursor-pointer overflow-hidden">
          <img
            src={img1}
            alt=""
            className="h-180 w-full object-cover transition-all duration-500 group-hover:scale-105"
          />

          <div className="absolute top-1/2 right-1/2 translate-x-1/2 text-center">
            <h2 className="text-4xl font-bold text-white">Timeless Classics</h2>
            <button className="relative mt-4 cursor-pointer text-lg font-semibold text-white after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-full after:-translate-x-1/2 after:bg-white after:transition-all after:duration-300 after:content-[''] group-hover:after:w-1/2">
              Explore
            </button>
          </div>
        </div>
        <div className="w-full cursor-pointer overflow-hidden">
          <img
            src={img2}
            alt=""
            className="h-180 w-full object-cover transition-all duration-500 hover:scale-105"
          />
          <p></p>
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute z-50 h-full w-full bg-black opacity-50" />
        <img src={img3} alt="" className="z-10 h-150 w-full object-cover" />
        <div className="absolute top-1/2 right-1/2 z-999 w-full translate-x-1/2 px-4 text-center md:w-1/2 md:px-0">
          <h2 className="w-full text-3xl font-medium text-white md:text-5xl">
            The brand designs clothing to make everyone feel unique
          </h2>
          <button className="hover:text-muted-foreground mt-4 cursor-pointer rounded-2xl border border-white px-6 py-2 text-white transition duration-500 hover:bg-white">
            Discover More
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimelessClassics;
