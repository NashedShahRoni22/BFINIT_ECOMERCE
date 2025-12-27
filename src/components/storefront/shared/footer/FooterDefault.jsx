import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

export default function FooterDefault({ content }) {
  const companyLinks = [
    { label: "About Us", url: "/about" },
    { label: "Contact", url: "/contact" },
    { label: "Blog", url: "/blog" },
  ];

  const shopLinks = [
    { label: "All Products", url: "/products" },
    { label: "Best Sellers", url: "/products?filter=bestseller" },
    { label: "New Arrivals", url: "/products?filter=new-arrival" },
    { label: "Sale", url: "/products?filter=sale" },
  ];

  const supportLinks = [
    { label: "Customer Support", url: "/help" },
    { label: "Return Policy", url: "/returns" },
    { label: "Legal & Terms", url: "/terms" },
    { label: "Shopping Guide", url: "/how-to-buy" },
  ];

  // Filter out social links that are empty
  const activeSocialLinks = Object.entries(content?.socialLinks)?.filter(
    ([_, url]) => url && url.trim() !== "",
  );

  return (
    <footer className="bg-card border-border border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="mb-3 text-lg font-semibold">Agatha Store</h3>
            <p className="text-muted-foreground mb-6 max-w-md text-sm leading-relaxed">
              {content?.description}
            </p>

            {/* Contact Info */}
            {content?.showContactInfo && (
              <div className="space-y-3 text-sm">
                <a
                  href={content?.contact?.email}
                  className="text-muted-foreground hover: flex items-center gap-2 transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>{content?.contact?.email}</span>
                </a>

                <a
                  href={content?.contact?.mobile}
                  className="text-muted-foreground hover: flex items-center gap-2 transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>{content?.contact?.mobile}</span>
                </a>

                <div className="text-muted-foreground flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="leading-relaxed">
                    {content?.contact?.address}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Company Links */}
          {companyLinks && companyLinks.length > 0 && (
            <div>
              <h4 className="mb-4 text-sm font-semibold tracking-wider uppercase">
                Company
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className="text-muted-foreground hover: inline-block text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Shop Links */}
          {shopLinks && shopLinks.length > 0 && (
            <div>
              <h4 className="mb-4 text-sm font-semibold tracking-wider uppercase">
                Shop
              </h4>
              <ul className="space-y-3">
                {shopLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className="text-muted-foreground hover: inline-block text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Support Links */}
          {supportLinks && supportLinks.length > 0 && (
            <div>
              <h4 className="mb-4 text-sm font-semibold tracking-wider uppercase">
                Support
              </h4>
              <ul className="space-y-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className="text-muted-foreground hover: inline-block text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-border border-t"></div>

        {/* Bottom Footer */}
        <div className="pt-8">
          <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Copyright */}
            <p className="text-muted-foreground text-center text-sm md:text-left">
              {content?.copyright}
            </p>

            {/* Social Links */}
            {content?.showSocialLinks && activeSocialLinks?.length > 0 && (
              <div className="flex items-center gap-4">
                {content?.socialLinks?.facebook && (
                  <a
                    href={content?.socialLinks?.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover: transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                {content?.socialLinks?.twitter && (
                  <a
                    href={content?.socialLinks?.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover: transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {content?.socialLinks?.instagram && (
                  <a
                    href={content?.socialLinks?.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover: transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {content?.socialLinks?.youtube && (
                  <a
                    href={content?.socialLinks?.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover: transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
