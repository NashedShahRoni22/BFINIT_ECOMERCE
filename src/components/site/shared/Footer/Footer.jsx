import { Link } from "react-router";
import playStore from "../../../../assets/logo/play-store.svg";
import appStore from "../../../../assets/logo/app-store.svg";
import { customerCare } from "../../../../data/footer/customercare";
import { paymentMethods } from "../../../../data/footer/paymentMethods";
import { internationalMarket } from "../../../../data/footer/internationalMarket";
import { socialLinks } from "../../../../data/footer/socialLinks";

export default function Footer() {
  return (
    <footer className="bg-primary text-on-primary py-10 md:py-20">
      <div className="mx-5 md:container md:mx-auto">
        {/* Customer Care */}
        <div>
          <p className="mb-3 font-medium">Customer Care</p>
          <div className="flex flex-wrap gap-2.5 text-xs md:justify-between">
            {customerCare.map((info, i) => (
              <Link
                key={i}
                to={info.path}
                className="hover:text-accent w-fit transition-all duration-200 ease-in-out hover:underline"
              >
                {info.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
          {/* Social Links */}
          <div>
            <p className="mb-3 font-medium">Follow Us</p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link, i) => (
                <Link key={i} to={link.url}>
                  <img src={link.icon} alt="social links" className="size-8" />
                </Link>
              ))}
            </div>
          </div>

          {/* International Market */}
          <div>
            <p className="mb-3 font-medium">BFINIT International</p>
            <div className="flex flex-wrap items-center gap-3">
              {internationalMarket.map((market, i) => (
                <div key={i} className="flex items-center gap-1">
                  <img
                    src={market.icon}
                    alt={market.country}
                    loading="lazy"
                    className="size-7"
                  />
                  <Link
                    to="/"
                    className="hover:text-accent text-sm transition-all duration-200 ease-in-out hover:underline"
                  >
                    {market.country}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <p className="mb-3 font-medium">Payment Methods</p>
            <div className="flex flex-wrap gap-4">
              {paymentMethods.map((payment, i) => (
                <img
                  key={i}
                  src={payment}
                  alt="payment method"
                  loading="lazy"
                  className="h-[80px] w-[120px] rounded-xl"
                />
              ))}
            </div>
          </div>

          {/* Our Apps */}
          <div>
            <p className="mb-3 font-medium">Download Our Apps</p>
            <div className="flex items-center gap-4">
              <Link to="/">
                <img
                  src={appStore}
                  alt="download appstore apps"
                  loading="lazy"
                  className="w-36"
                />
              </Link>
              <Link to="/">
                <img
                  src={playStore}
                  alt="download playstore apps"
                  loading="lazy"
                  className="w-36"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
