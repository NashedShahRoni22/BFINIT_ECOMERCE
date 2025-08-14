import mariaImg from "../../assets/maria/maria.png";

export default function About() {
  return (
    <div className="mx-5 flex flex-col items-center gap-8 py-10 md:container md:mx-auto md:flex-row md:gap-16 md:py-20">
      {/* Minimal image container with overlay */}
      <div className="relative w-full md:w-1/2">
        {/* Main image container */}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#FFF8F5]">
          <img
            src={mariaImg}
            alt="Maria - Your Bookkeeping Expert"
            className="h-full w-full object-cover"
          />

          {/* Name and credentials overlay */}
          <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-[#122842] via-[#122842]/55 to-transparent p-6">
            <div className="text-white">
              {/* Enhanced name typography */}
              <div className="mb-4">
                <h3 className="font-playfair mb-1 text-3xl font-bold tracking-wide">
                  Maria
                </h3>
                <p className="font-inter letter-spacing-wider text-sm font-medium tracking-wide text-gray-100 uppercase">
                  Your Bookkeeping Expert
                </p>
              </div>

              {/* Improved credentials layout */}
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center rounded-full border border-white/40 bg-white/25 px-3 py-1.5 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                    <span className="font-inter text-xs font-semibold tracking-wide">
                      QUICKBOOKS
                    </span>
                    <span className="font-inter text-xs font-medium text-gray-200">
                      Pro Advisor
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center rounded-full border border-white/40 bg-white/25 px-3 py-1.5 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#226CFF]"></div>
                    <span className="font-inter text-xs font-semibold tracking-wide">
                      CERTIFIED
                    </span>
                    <span className="font-inter text-xs font-medium text-gray-200">
                      Intuit Professional
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2">
        {/* Enhanced label */}
        <div className="text-primary ring-primary/20 inline-flex items-center gap-1 rounded-full bg-[#FFF8F5] px-3 py-0.5 text-xs font-semibold tracking-wide uppercase ring-1">
          Meet Maria
        </div>

        {/* Enhanced heading typography */}
        <h2 className="text-primary font-playfair mt-6 text-4xl leading-tight font-bold tracking-tight md:text-5xl">
          30+ Years of <br /> Professional Excellence
        </h2>

        {/* Improved body text */}
        <div className="font-inter mt-8 space-y-6">
          <p className="text-lg leading-relaxed font-medium text-gray-700">
            With over 30 years of experience in bookkeeping and accounting,
            I&apos;ve supported a wide range of clients — from large
            corporations and CPA firms to small businesses across industries
            like construction, restaurants, entertainment, fitness, real estate,
            and marketing.
          </p>

          <p className="text-base leading-relaxed text-gray-600">
            I specialize in full-cycle bookkeeping, payroll support, financial
            reporting, and tax preparation. I also work closely with CPAs to
            ensure my clients have a strong, well-rounded financial team.
          </p>

          <p className="text-base leading-relaxed text-gray-600">
            What began as a side business in New York in 2014 has grown into a
            dedicated firm where I provide personalized, reliable financial
            services to help businesses stay organized, compliant, and
            financially informed.
          </p>
        </div>
      </div>
    </div>
  );
}
