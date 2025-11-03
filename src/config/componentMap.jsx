// src/config/componentMap.js

// ============================================
// HEADER SECTIONS
// ============================================

function NavbarSimple({ content }) {
  return (
    <nav className="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm">
      <div className="text-xl font-bold text-gray-900">{content.logoText}</div>
      <div className="flex gap-6">
        <a
          href="#"
          className="text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          Home
        </a>
        <a
          href="#"
          className="text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          Products
        </a>
        <a
          href="#"
          className="text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          About
        </a>
        <a
          href="#"
          className="text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}

function NavbarWithSearch({ content }) {
  return (
    <nav className="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm">
      <div className="text-xl font-bold text-gray-900">{content.logoText}</div>

      {content.showSearch && (
        <div className="mx-8 max-w-md flex-1">
          <input
            type="search"
            placeholder="Search products..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      )}

      <div className="flex gap-6">
        <a
          href="#"
          className="text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          Home
        </a>
        <a
          href="#"
          className="text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          Products
        </a>
        <a
          href="#"
          className="text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          About
        </a>
      </div>
    </nav>
  );
}

// ============================================
// HERO SECTIONS
// ============================================

function HeroMinimal({ content }) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-20 text-center text-white">
      <h1 className="mb-4 text-5xl font-bold">{content.title}</h1>
      <p className="mb-8 text-xl opacity-90">{content.subTitle}</p>
      <button className="rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 shadow-lg transition-transform hover:scale-105 hover:bg-gray-100">
        {content.cta}
      </button>
    </div>
  );
}

function HeroWithImage({ content }) {
  return (
    <div
      className="relative px-8 py-24 text-center text-white"
      style={{
        backgroundImage: content.backgroundImage
          ? `url(${content.backgroundImage})`
          : "linear-gradient(to right, #3b82f6, #9333ea)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better text readability */}
      {content.backgroundImage && (
        <div className="absolute inset-0 bg-black opacity-50"></div>
      )}

      <div className="relative z-10">
        <h1 className="mb-4 text-6xl font-bold drop-shadow-lg">
          {content.title}
        </h1>
        <p className="mb-8 text-2xl opacity-95 drop-shadow-md">
          {content.subTitle}
        </p>
        <button className="rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 shadow-xl transition-transform hover:scale-105 hover:bg-gray-100">
          {content.cta}
        </button>
      </div>
    </div>
  );
}

// ============================================
// PRODUCT SECTIONS
// ============================================

function ProductGrid({ content }) {
  const columnClass =
    {
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
    }[content.columns] || "grid-cols-4";

  // Dummy products for preview
  const dummyProducts = [
    { id: 1, name: "Product 1", price: "$29.99", image: "🎁" },
    { id: 2, name: "Product 2", price: "$39.99", image: "🎨" },
    { id: 3, name: "Product 3", price: "$49.99", image: "🎪" },
    { id: 4, name: "Product 4", price: "$59.99", image: "🎭" },
    { id: 5, name: "Product 5", price: "$69.99", image: "🎯" },
    { id: 6, name: "Product 6", price: "$79.99", image: "🎲" },
  ];

  return (
    <div className="bg-gray-50 px-8 py-16">
      <h2 className="mb-10 text-center text-4xl font-bold text-gray-900">
        {content.title}
      </h2>
      <div className={`grid ${columnClass} gap-6`}>
        {dummyProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-xl"
          >
            <div className="mb-4 flex h-40 items-center justify-center rounded-lg bg-gray-100 text-6xl">
              {product.image}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              {product.name}
            </h3>
            <p className="mb-4 text-xl font-bold text-blue-600">
              {product.price}
            </p>
            <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductCarousel({ content }) {
  // Dummy products
  const dummyProducts = [
    { id: 1, name: "Trending 1", price: "$99.99", image: "⭐" },
    { id: 2, name: "Trending 2", price: "$89.99", image: "🔥" },
    { id: 3, name: "Trending 3", price: "$79.99", image: "💎" },
    { id: 4, name: "Trending 4", price: "$69.99", image: "✨" },
  ];

  return (
    <div className="bg-white px-8 py-16">
      <h2 className="mb-10 text-center text-4xl font-bold text-gray-900">
        {content.title}
      </h2>
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-4">
          {dummyProducts.map((product) => (
            <div
              key={product.id}
              className="min-w-[250px] rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 text-5xl">
                {product.image}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {product.name}
              </h3>
              <p className="mb-4 text-xl font-bold text-blue-600">
                {product.price}
              </p>
              <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                View Details
              </button>
            </div>
          ))}
        </div>
        {content.autoplay && (
          <div className="mt-4 text-center text-sm text-gray-500">
            ▶️ Auto-play enabled
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// CONTENT SECTIONS
// ============================================

function Testimonials({ content }) {
  const columnClass =
    {
      2: "grid-cols-2",
      3: "grid-cols-3",
    }[content.columns] || "grid-cols-3";

  // Dummy testimonials
  const dummyTestimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Customer",
      text: "Amazing products! The quality exceeded my expectations. Highly recommend!",
      avatar: "👩",
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Verified Buyer",
      text: "Fast shipping and excellent customer service. Will definitely buy again!",
      avatar: "👨",
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Happy Customer",
      text: "Best shopping experience ever! The products are exactly as described.",
      avatar: "👱‍♀️",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white px-8 py-16">
      <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">
        {content.title}
      </h2>
      <div className={`grid ${columnClass} gap-8`}>
        {dummyTestimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-xl"
          >
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl">
                {testimonial.avatar}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              &quot;{testimonial.text}&quot;
            </p>
            <div className="mt-4 flex gap-1 text-yellow-400">⭐⭐⭐⭐⭐</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// FOOTER SECTIONS
// ============================================

function FooterSimple({ content }) {
  return (
    <footer className="border-t bg-gray-900 px-8 py-8 text-center text-white">
      <p className="text-sm opacity-80">{content.copyrightText}</p>
    </footer>
  );
}

function FooterDetailed({ content }) {
  return (
    <footer className="border-t bg-gray-900 text-white">
      <div className="px-8 py-12">
        <div className="grid grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:opacity-100">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:opacity-100">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:opacity-100">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          {content.showSocials && (
            <div>
              <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
              <div className="flex gap-4 text-2xl">
                <a href="#" className="hover:text-blue-400">
                  📘
                </a>
                <a href="#" className="hover:text-blue-300">
                  🐦
                </a>
                <a href="#" className="hover:text-pink-400">
                  📷
                </a>
                <a href="#" className="hover:text-red-500">
                  📺
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 px-8 py-6 text-center">
        <p className="text-sm opacity-70">{content.copyrightText}</p>
      </div>
    </footer>
  );
}

function NewsLetter({ content }) {
  return (
    <div className="space-y-4 py-10 text-center">
      <h1 className="text-center text-xl font-bold">{content?.title}</h1>
      <button className="bg-dashboard-primary cursor-pointer rounded-lg px-4 py-2 text-white">
        {content.cta}
      </button>
    </div>
  );
}

// ============================================
// COMPONENT MAP EXPORT
// ============================================

export const componentMap = {
  "nav-simple": NavbarSimple,
  "nav-with-search": NavbarWithSearch,
  "hero-minimal": HeroMinimal,
  "hero-with-image": HeroWithImage,
  "product-grid": ProductGrid,
  "product-carousel": ProductCarousel,
  testimonials: Testimonials,
  "news-letter": NewsLetter,
  "footer-simple": FooterSimple,
  "footer-detailed": FooterDetailed,
};
