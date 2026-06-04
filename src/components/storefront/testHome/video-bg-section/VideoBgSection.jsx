import React from "react";
import bg_video from "/fashion_video.mp4";

export default function VideoBgSection() {
  return (
    <div className="relative h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={bg_video} type="video/mp4" />
      </video>

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-white">Your Brand Tagline</p>
          <h1 className="text-6xl font-bold text-white">
            Transform your look this season
          </h1>
          <button className="mt-4 mr-4 cursor-pointer rounded-2xl border border-white bg-white px-6 py-2 text-xs text-black transition duration-500 hover:bg-transparent hover:text-white">
            Shop Now
          </button>
          <button className="mt-4 cursor-pointer rounded-2xl border border-white px-6 py-2 text-xs text-white transition duration-500 hover:bg-white hover:text-black">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}
