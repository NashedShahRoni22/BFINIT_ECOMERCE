import { Link } from "react-router";
import adBanner from "../../assets/ad-banner.webp";

export default function ProductAdBanner() {
  return (
    <section className="mx-5 py-10 md:container md:mx-auto">
      <Link to="/">
        {/* image size should be : width=1920px * height=586px */}
        <img src={adBanner} alt="" className="h-full w-full object-cover" />
      </Link>
    </section>
  );
}
