import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroDefault({ content }) {
  const { backgroundImage, cta, subTitle, title } = content || {};

  console.log(backgroundImage);

  const bgImg = backgroundImage
    ? `https://ecomback.bfinit.com${backgroundImage}`
    : "https://images.pexels.com/photos/875862/pexels-photo-875862.png";

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* background image*/}
      <div className="absolute inset-0 bg-muted">
        <img
          src={bgImg}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        {/* overlay */}
        <div className="absolute inset-0 bg-foreground/40"></div>
      </div>

      {/* content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-primary-foreground mb-4 md:mb-6 leading-tight">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground font-light mb-8 md:mb-10 leading-relaxed">
            {subTitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="px-8 py-4 bg-transparent hover:bg-primary-foreground hover:text-foreground text-primary-foreground font-medium border border-primary-foreground rounded-md group">
              {cta}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
