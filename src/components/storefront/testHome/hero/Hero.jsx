import React from "react";

const Hero = () => {
  const bgImg =
    "https://res.cloudinary.com/dxn0qc49a/image/upload/q_auto/f_auto/v1777802066/hero_banner_1_mjkgpp.webp";
  return (
    <div
      className={`hero_section flex h-screen w-full items-center justify-center bg-cover bg-center object-cover`}
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="text-center text-white">
        <p className="text-3xl">SS26 PIECES</p>
        <h2 className="font-m pt-3 pb-12 text-6xl">Bold by design</h2>
        <button className="hover:text-muted-foreground rounded-2xl border border-white px-6 py-3 transition duration-500 hover:bg-white">
          Discover More
        </button>
      </div>
    </div>
  );
};

export default Hero;
