import React, { useRef, useState } from "react";

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  // Process mouse/touch movements to calculate percentages
  const handleMove = (clientX) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;

    // Convert to percentage and lock constraints between 0% and 100%
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;

    setSliderPosition(position);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };
  return (
    <div className="grid-cols-12 space-y-6 py-20 md:grid">
      <div className="col-span-4">
        <h2 className="text-4xl font-semibold">
          Before / <span className="italic">After</span>
        </h2>
        <p className="w-4/5 py-10">
          Before and after images are a great way to showcase the transformation
          or improvement in a particular subject.
        </p>
        <button className="mt-4 cursor-pointer rounded-2xl border border-black bg-black px-6 py-2 text-xs text-white transition duration-500 hover:bg-transparent hover:text-black">
          Shop Now
        </button>
      </div>

      <div className="col-span-8">
        <div
          ref={containerRef}
          className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-xl border border-neutral-200 select-none"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchEnd={() => setIsDragging(false)}
        >
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=420&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="After"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />

          <div
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Before"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <span className="pointer-events-none absolute bottom-4 left-4 rounded bg-black/60 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
            Before
          </span>
          <span className="pointer-events-none absolute right-4 bottom-4 rounded bg-black/60 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
            After
          </span>

          <div
            className="group absolute top-0 bottom-0 w-1 cursor-ew-resize bg-white"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-between rounded-full bg-white px-2.5 shadow-lg transition-transform duration-150 group-hover:scale-110">
              <svg
                className="h-3 w-3 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <svg
                className="text-gray-00 h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
