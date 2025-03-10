import { Link } from "react-router";
import banner from "../../assets/banner.jpg";

export default function Banner() {
  return (
    <section
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${banner}) center/cover no-repeat`,
      }}
      className="flex min-h-96 w-full items-center justify-center px-5 text-white md:container md:mx-auto"
    >
      <div className="text-center">
        <h2 className="font-merriweather text-xl font-medium md:text-3xl">
          Timeless Elegance, Unforgettable Fragrance
        </h2>
        <p className="mt-2 w-full max-w-xl text-sm font-light md:text-lg">
          Discover the essence of sophistication with Bleu de Chanel. Elevate
          your style with a scent that defines luxury and confidence.
        </p>
        <Link
          to="/"
          className="hover:bg-primary hover:border-on-primary hover:text-on-primary mt-10 inline-block border px-6 py-2 text-lg font-medium transition-all duration-200 ease-linear"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
