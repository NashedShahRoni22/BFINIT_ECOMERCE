import { useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Heart,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router";

export default function NavbarSimple({ content }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const navigationLinks = [
    { name: "Home", href: "/theme/customize" },
    { name: "Shop", href: "/theme/customize/shop" },
    { name: "About", href: "/theme/customize/about" },
    { name: "Contact", href: "/theme/customize/contact" },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-accent text-foreground"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <a href="#" className="text-2xl font-bold text-foreground">
              {content.logoText}
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8 flex-1 justify-center">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1 text-sm font-medium"
              >
                {link.name}
                {link.hasDropdown && <ChevronDown size={16} />}
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search products..."
                    autoFocus
                    className="w-48 sm:w-64 px-4 py-2 pr-10 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-2 p-1 hover:bg-accent rounded-md"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-md hover:bg-accent text-foreground transition-colors"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* Wishlist - Desktop only */}
            <button
              className="hidden sm:block p-2 rounded-md hover:bg-accent text-foreground transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </button>

            {/* Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className="p-2 rounded-md hover:bg-accent text-foreground transition-colors"
                aria-label="Account"
              >
                <User size={20} />
              </button>

              {accountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg py-2 z-50">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent transition-colors"
                  >
                    Sign In
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent transition-colors"
                  >
                    Create Account
                  </a>
                  <hr className="my-2 border-border" />
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent transition-colors"
                  >
                    Orders
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent transition-colors"
                  >
                    Wishlist
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent transition-colors"
                  >
                    Settings
                  </a>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/theme/customize/cart"
              className="p-2 rounded-md hover:bg-accent text-foreground transition-colors relative"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent transition-colors"
              >
                {link.name}
              </a>
            ))}

            {/* Mobile-only links */}
            <hr className="my-4 border-border" />
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent transition-colors"
            >
              Wishlist
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent transition-colors"
            >
              My Orders
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
