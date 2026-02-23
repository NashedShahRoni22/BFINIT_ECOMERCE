import { Link, useParams } from "react-router";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Lock,
} from "lucide-react";
import useBasePath from "@/hooks/useBasePath";
import { footerLinks } from "@/features/themes/utils/contstants";
import useGetStorePreference from "@/features/admin/hooks/store/useGetStorePreference";
import { getDefaultCountry } from "@/utils/currencyHelpers";
import useCountry from "@/hooks/useCountry";
import { useMemo } from "react";
import FooterCountrySwitcher from "./FooterCountrySwitcher";
import useGetQuery from "@/hooks/api/useGetQuery";

const logos = [
  { src: "/images/logo/visa.png", alt: "Visa" },
  { src: "/images/logo/ma.svg", alt: "Mastercard" },
  { src: "/images/logo/axp.svg", alt: "American Express" },
  { src: "/images/logo/discover.svg", alt: "Discover" },
  { src: "/images/logo/ap.png", alt: "Apple Pay" },
  { src: "/images/logo/gp.png", alt: "Google Pay" },
];

export default function FooterDefault({ content }) {
  const { storeId } = useParams();
  const { saveCountry } = useCountry();
  const { data } = useGetStorePreference(storeId);

  const { data: stripeConfig, isLoading: isStripeConfigLoading } = useGetQuery({
    endpoint: `/payments/stripe/public/client/${storeId}`,
    queryKey: ["stripe-client-config", storeId],
  });

  const date = new Date();
  const year = date.getFullYear();

  const isStripeConnected =
    !isStripeConfigLoading &&
    stripeConfig?.data?.charges_enabled &&
    stripeConfig?.data?.payouts_enabled;

  const countries = useMemo(() => data?.countries || [], [data?.countries]);
  const defaultCountry = getDefaultCountry(data);

  const basePath = useBasePath();

  const fullAddress = `${data?.storeAddress}, ${data?.country ? data?.country : defaultCountry?.country_name}`;

  const {
    description,
    showContactInfo,
    contact,
    copyright,
    showSocialLinks,
    socialLinks,
  } = content;

  const { company, shop, support } = footerLinks;

  const activeSocialLinks = Object.entries(socialLinks)?.filter(
    ([_, url]) => url && url.trim() !== "",
  );

  const handleCountryChange = (country) => {
    saveCountry(country);
  };

  return (
    <footer className="bg-card border-border border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="mb-3 text-lg font-semibold">{data?.storeName}</h3>
            <p className="text-muted-foreground mb-6 max-w-md text-sm leading-relaxed">
              {description}
            </p>

            {/* Contact Info */}
            {showContactInfo && (
              <div className="space-y-3 text-sm">
                <a
                  href={`mailto:${data?.storeEmail}`}
                  className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>{data?.storeEmail}</span>
                </a>

                <a
                  href={`tel:${data?.storePhone}`}
                  className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>{data?.storePhone}</span>
                </a>

                <div className="text-muted-foreground flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="leading-relaxed">{fullAddress}</span>
                </div>
              </div>
            )}
          </div>

          {/* Company Links */}
          {company && company?.length > 0 && (
            <div>
              <h4 className="mb-4 text-sm font-semibold tracking-wider uppercase">
                Company
              </h4>
              <ul className="space-y-3">
                {company.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={`${basePath}${link.url}`}
                      className="text-muted-foreground hover:text-foreground inline-block text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Support Links */}
          {support && support.length > 0 && (
            <div>
              <h4 className="mb-4 text-sm font-semibold tracking-wider uppercase">
                Support
              </h4>
              <ul className="space-y-3">
                {support.slice(0, 3).map((link, index) => (
                  <li key={index}>
                    <Link
                      to={`${basePath}${link.url}`}
                      className="text-muted-foreground hover:text-foreground inline-block text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {support && support.length > 0 && (
            <div>
              <h4 className="mb-4 text-sm font-semibold tracking-wider text-transparent uppercase">
                Support
              </h4>
              <ul className="space-y-3">
                {support.slice(3, 6).map((link, index) => (
                  <li key={index}>
                    <Link
                      to={`${basePath}${link.url}`}
                      className="text-muted-foreground hover:text-foreground inline-block text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-border border-t" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
          {/* Left: Copyright + Country Switcher */}
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:gap-6">
            <p className="text-muted-foreground text-center text-sm md:text-left">
              © {year} {data?.storeName}. All rights reserved.
            </p>

            {countries?.length > 0 && (
              <FooterCountrySwitcher
                handleCountryChange={handleCountryChange}
                data={data}
              />
            )}
          </div>

          {/* Right: Payment Icons + Social Links */}
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-6">
            {/* Payment Icons — only shown when Stripe is connected */}
            {isStripeConnected && (
              <div className="flex flex-col items-end gap-1.5">
                <div className="flex items-center gap-1.5">
                  {logos.map(({ src, alt }) => (
                    <div
                      key={alt}
                      className="border-border/60 h-6.5 overflow-hidden rounded border bg-white px-1.5 py-1"
                    >
                      <img
                        src={src}
                        alt={alt}
                        className="h-full w-auto object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground flex items-center gap-1 text-[10px]">
                  <Lock className="h-2.5 w-2.5" /> Secured by Stripe
                </p>
              </div>
            )}

            {/* Social Links */}
            {showSocialLinks && activeSocialLinks?.length > 0 && (
              <div className="flex items-center gap-4">
                {socialLinks?.facebook && (
                  <Link
                    to={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </Link>
                )}
                {socialLinks?.twitter && (
                  <Link
                    to={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                )}
                {socialLinks?.instagram && (
                  <Link
                    to={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                )}
                {socialLinks?.youtube && (
                  <Link
                    to={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-5 w-5" />
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
