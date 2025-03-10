import { useState } from "react";
import TopNav from "../components/admin/shared/TopNav";
import CustomizeSideNav from "../components/admin/shared/CustomizeSideNav";
import Navbar1 from "../components/site/shared/Navbar/Navbar";
import Banner1 from "../components/site/Banner";
import Slider1 from "../components/site/sliders/Slider1/Slider1";
import Slider2 from "../components/site/sliders/Slider2/Slider2";
import Slider3 from "../components/site/sliders/Slider3/Slider3";
import Category1 from "../components/site/categories/Category1";
import Category2 from "../components/site/categories/Category2";
import Highlight1 from "../components/site/ProductAdBanner";
import Highlight2 from "../components/site/ProductShowCase";
import FeaturedProudct from "../components/site/Products";

const componentLinks = [
  {
    name: "Navbar",
    subCategories: [
      {
        name: "Navbar 1",
        value: "nav1",
      },
    ],
  },
  {
    name: "Banner",
    subCategories: [
      {
        name: "Banner 1",
        value: "banner1",
      },
    ],
  },
  {
    name: "Slider",
    subCategories: [
      {
        name: "Slider 1",
        value: "slider1",
      },
      {
        name: "Slider 2",
        value: "slider2",
      },
      {
        name: "Slider 3",
        value: "slider3",
      },
    ],
  },
  {
    name: "Category",
    subCategories: [
      {
        name: "Category 1",
        value: "category1",
      },
      {
        name: "Category 2",
        value: "category2",
      },
    ],
  },
  {
    name: "Highlight",
    subCategories: [
      {
        name: "Highlight 1",
        value: "highlight1",
      },
      {
        name: "Highlight 2",
        value: "highlight2",
      },
    ],
  },
  {
    name: "Featured",
  },
];

const componentsData = {
  navbar: {
    nav1: Navbar1,
  },
  banner: {
    banner1: Banner1,
  },
  slider: {
    slider1: Slider1,
    slider2: Slider2,
    slider3: Slider3,
  },
  category: {
    category1: Category1,
    category2: Category2,
  },
  highlight: {
    highlight1: Highlight1,
    highlight2: Highlight2,
  },
  featured: {
    true: FeaturedProudct, // Render the Featured component when the checkbox is checked
  },
};

export default function StoreCustomizeLayout() {
  const [openDropdown, setOpenDropdown] = useState("");
  const [selectedComponents, setSelectedComponents] = useState({
    navbar: "nav1",
    banner: "banner1",
    slider: "slider1",
    category: "category1",
    highlight: "highlight1",
    featured: false,
  });

  // Toggle dropdown visibility
  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? "" : index);
  };

  // Handle checkbox selection
  const handleCheckboxChange = (category, value) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  // Function to dynamically render components
  const renderComponent = (category, value) => {
    const Component = componentsData[category]?.[value];
    return Component ? <Component /> : null;
  };

  return (
    <>
      <TopNav />

      <main className="font-inter relative flex">
        <CustomizeSideNav
          componentLinks={componentLinks}
          toggleDropdown={toggleDropdown}
          openDropdown={openDropdown}
          selectedComponents={selectedComponents}
          onCheckboxChange={handleCheckboxChange}
        />

        <div className="h-[calc(100dvh-55px)] w-full overflow-y-auto">
          {/* Render selected components dynamically */}
          {renderComponent("navbar", selectedComponents.navbar)}
          {renderComponent("banner", selectedComponents.banner)}
          {renderComponent("slider", selectedComponents.slider)}
          {renderComponent("category", selectedComponents.category)}
          {renderComponent("highlight", selectedComponents.highlight)}
          {selectedComponents.featured && renderComponent("featured", true)}
        </div>
      </main>
    </>
  );
}
