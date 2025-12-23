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
    ([_, url]) => url && url.trim() !== ""
  );

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Agatha Store
            </h3>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed max-w-md">
              {content?.description}
            </p>

            {/* Contact Info */}
            {content?.showContactInfo && (
              <div className="space-y-3 text-sm">
                <a
                  href={content?.contact?.email}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>{content?.contact?.email}</span>
                </a>

                <a
                  href={content?.contact?.mobile}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>{content?.contact?.mobile}</span>
                </a>

                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
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
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
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
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                Shop
              </h4>
              <ul className="space-y-3">
                {shopLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
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
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                Support
              </h4>
              <ul className="space-y-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
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
        <div className="border-t border-border"></div>

        {/* Bottom Footer */}
        <div className="pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground text-center md:text-left">
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
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {content?.socialLinks?.twitter && (
                  <a
                    href={content?.socialLinks?.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {content?.socialLinks?.instagram && (
                  <a
                    href={content?.socialLinks?.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {content?.socialLinks?.youtube && (
                  <a
                    href={content?.socialLinks?.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Youtube className="w-5 h-5" />
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
