import { LuRocket } from "react-icons/lu";

export default function ComingSoon() {
  return (
    <div className="min-h-screen">
      {/* Main content */}
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 text-center">
        {/* Logo/Icon */}
        <div className="mb-12">
          <div className="bg-primary mb-4 flex h-16 w-16 items-center justify-center rounded-xl">
            <LuRocket className="text-accent h-8 w-8" />
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-accent mb-6 text-5xl font-light tracking-tight md:text-7xl">
          Coming Soon
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg leading-relaxed font-light text-gray-600 md:text-xl">
          Something amazing is on the way. We&apos;re working hard to bring you
          an incredible experience. Stay tuned for updates.
        </p>
      </div>
    </div>
  );
}
