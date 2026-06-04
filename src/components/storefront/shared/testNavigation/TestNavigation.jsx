import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import SidePanel from "./SidePanel";
import MobileNav from "./MobileNav";
import NavItem from "./NavItem";

const NAV_ITEMS = [
  { type: "link", label: "Home", link: "/" },
  {
    type: "dropdown",
    label: "Shop",
    dropdown: [
      { label: "New Arrivals", link: "/new-arrivals" },
      { label: "Best Sellers", link: "/best-sellers" },
      { label: "Sale", link: "/sale" },
      null,
      { label: "Men", link: "/men" },
      { label: "Women", link: "/women" },
      { label: "Accessories", link: "/accessories" },
    ],
  },
  {
    type: "dropdown",
    label: "Pages",
    dropdown: [
      { label: "About Us", link: "/about-us" },
      { label: "Our Story", link: "/our-story" },
      { label: "Press", link: "/press" },
      null,
      { label: "Careers", link: "/careers" },
      { label: "Sustainability", link: "/sustainability" },
    ],
  },
  {
    type: "dropdown",
    label: "Product Features",
    dropdown: [
      { label: "Materials & Craft", link: "/materials-craft" },
      { label: "Sizing Guide", link: "/sizing-guide" },
      { label: "Care Instructions", link: "/care-instructions" },
      null,
      { label: "Custom Orders", link: "/customer-order" },
      { label: "Collaborations", link: "/collaborations" },
    ],
  },
  { type: "link", label: "Contact", link: "/contact" },
];

const TestNavigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  // mobile menu state
  const [showMenu, setShowMenu] = useState(false);

  const [globeLabel, setGlobeLabel] = useState("EN / US");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = panelOpen || showMenu ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [panelOpen, showMenu]);

  const handleApply = ({ country, language }) => {
    const langCode = language?.toUpperCase() || "EN";
    const countryCode = country?.toUpperCase().slice(0, 2) || "US";
    setGlobeLabel(`${langCode} / ${countryCode}`);
  };

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-1000 flex h-[72px] items-center px-4 transition-all duration-500 md:px-8 lg:px-10 ${
          scrolled || showMenu
            ? "bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)]"
            : "bg-transparent"
        }`}
      >
        {/* LEFT DESKTOP NAV */}
        <div className="hidden flex-1 items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item, i) => (
            <NavItem key={i} item={item} scrolled={scrolled} />
          ))}
        </div>

        {/* LOGO */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 text-lg font-light tracking-[0.18em] transition-colors duration-500 sm:text-xl md:text-2xl ${
            scrolled || showMenu ? "text-gray-900" : "text-white"
          }`}
        >
          Release
        </div>

        {/* RIGHT */}
        <div className="ml-auto flex items-center gap-3">
          {/* Desktop globe */}
          <button
            onClick={() => setPanelOpen(true)}
            className={`hidden items-center gap-2 rounded-full border px-4 py-2 text-xs tracking-wide transition-all duration-300 md:flex ${
              scrolled
                ? "border-gray-300 text-gray-600 hover:bg-gray-50"
                : "border-white/35 text-white hover:bg-white/15"
            }`}
          >
            <Globe size={14} />
            <span>{globeLabel}</span>
          </button>

          {/*  NEW MOBILE MENU */}
          <MobileNav
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            navItems={NAV_ITEMS}
            scrolled={scrolled}
          />
        </div>
      </nav>

      <SidePanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        onApply={handleApply}
      />
    </>
  );
};

export default TestNavigation;
