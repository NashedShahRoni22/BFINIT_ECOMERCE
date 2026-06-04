import { useState } from "react";
import { NavLink } from "react-router";

const products = {
  jackets: [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      title: "AquaShield Windbreaker Padded Jacket",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1542272604-787c3835535d",
      title: "Urban Shield Winter Jacket",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1556906781-9a412961c28c",
      title: "Classic Outdoor Jacket",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
      title: "Premium Storm Jacket",
    },
  ],

  hoodies: [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1503341504253-dff4815485f1",
      title: "Essential Cotton Hoodie",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1523398002811-999ca8dec234",
      title: "Relaxed Fit Hoodie",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
      title: "Streetwear Pullover Hoodie",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
      title: "Minimal Oversized Hoodie",
    },
  ],

  tshirts: [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
      title: "Basic Everyday T-Shirt",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
      title: "Classic White Tee",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1583743814966-8936f37f4678",
      title: "Premium Cotton Tee",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1562157873-818bc0726f68",
      title: "Graphic Print T-Shirt",
    },
  ],
};

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("jackets");

  const tabs = ["jackets", "hoodies", "tshirts"];

  return (
    <div className="px-6">
      <p className="text-center text-sm font-black">What's new</p>
      <div className="my-10 flex justify-center gap-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`mx-4 cursor-pointer text-xl font-medium capitalize transition-all duration-300 md:text-4xl ${
              activeTab === tab ? " text-black" : "text-muted-foreground "
            }`}
          >
            {tab === "tshirts" ? "T-Shirts" : tab}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products[activeTab].map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={item.img}
                alt={item.title}
                className="h-[380px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="mt-4 space-y-1">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="text-sm font-medium text-red-500">last few</p>
              <p className="text-lg font-bold">€64.90</p>
              <p className="text-sm text-gray-500">
                Regular price €79.90 From Minimum price €64.90 - Maximum price
                €74.90
              </p>
              <p className="text-sm text-gray-700">Available in 5 size</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <NavLink
          to="/"
          className="relative cursor-pointer text-sm leading-none font-normal after:absolute after:-bottom-1 after:left-1/2 after:h-[0.5px] after:w-full after:-translate-x-1/2 after:bg-current after:transition-all after:duration-300 after:content-[''] hover:after:w-1/2"
        >
          View All
        </NavLink>
      </div>
    </div>
  );
};
export default ProductTabs;
