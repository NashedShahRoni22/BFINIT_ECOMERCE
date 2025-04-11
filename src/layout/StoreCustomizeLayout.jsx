import { useEffect, useState } from "react";
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
import Product1 from "../components/site/products/Product1";
import Product2 from "../components/site/products/Product2";
import Product3 from "../components/site/products/Product3";
import Footer1 from "../components/site/shared/Footer/Footer";
import useGetQuery from "../hooks/useGetQuery";
import { useParams } from "react-router";
import useAuth from "../hooks/useAuth";
import WebsiteSkeleton from "../components/admin/loaders/WebasiteSkeleton";

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
    name: "Product",
    subCategories: [
      {
        name: "Product 1",
        value: "product1",
      },
      {
        name: "Product 2",
        value: "product2",
      },
      {
        name: "Product 3",
        value: "product3",
      },
    ],
  },
  {
    name: "Footer",
    subCategories: [
      {
        name: "Footer 1",
        value: "footer1",
      },
    ],
  },
];

const componentsData = {
  navbar: {
    1: Navbar1,
  },
  banner: {
    1: Banner1,
  },
  slider: {
    1: Slider1,
    2: Slider2,
    3: Slider3,
  },
  category: {
    1: Category1,
    2: Category2,
  },
  product: {
    1: Product1,
    2: Product2,
    3: Product3,
  },

  highlight: {
    1: Highlight1,
    2: Highlight2,
  },

  footer: {
    1: Footer1,
  },
};

export default function StoreCustomizeLayout() {
  const { user } = useAuth();
  const { storeId } = useParams();
  // fetch store preference
  const { data: storePreferenceData, isLoading } = useGetQuery({
    endpoint: `/store/preference/?storeId=${storeId}`,
    token: user?.token,
    queryKey: ["storePreference", storeId],
    enabled: !!storeId && !!user?.token,
  });

  const [showSideNav, setShowSideNav] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");
  const [selectedComponents, setSelectedComponents] = useState({
    navbar: "1",
    banner: "1",
    slider: "1",
    category: "1",
    highlight: "1",
    product: "1",
    footer: "1",
  });

  // Toggle dropdown visibility
  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? "" : index);
  };

  // Handle checkbox selection
  const handleCheckboxChange = (category, value) => {
    setSelectedComponents((prev) => {
      if (prev[category] === value) {
        return {
          ...prev,
          [category]: category === "featured" ? false : "",
        };
      }

      return {
        ...prev,
        [category]: value,
      };
    });
  };

  // Function to dynamically render components
  const renderComponent = (category, value) => {
    const Component = componentsData[category]?.[value];
    return Component ? <Component /> : null;
  };

  useEffect(() => {
    setSelectedComponents({
      navbar: storePreferenceData?.data?.navbarStyle,
      banner: storePreferenceData?.data?.bannerStyle,
      slider: storePreferenceData?.data?.sliderStyle,
      category: storePreferenceData?.data?.categoryStyle,
      highlight: storePreferenceData?.data?.highlightStyle,
      product: storePreferenceData?.data?.productStyle,
      footer: storePreferenceData?.data?.footerStyle,
    });
  }, [storePreferenceData]);

  if (isLoading) {
    return <WebsiteSkeleton />;
  }

  return (
    <>
      <TopNav showSideNav={showSideNav} setShowSideNav={setShowSideNav} />

      <main className="font-inter relative flex">
        <CustomizeSideNav
          showSideNav={showSideNav}
          componentLinks={componentLinks}
          toggleDropdown={toggleDropdown}
          openDropdown={openDropdown}
          selectedComponents={selectedComponents}
          onCheckboxChange={handleCheckboxChange}
        />

        <div className="relative h-[calc(100dvh-55px)] w-full overflow-y-auto px-5">
          {/* Render selected components dynamically */}
          {renderComponent("navbar", selectedComponents.navbar)}
          {/* {renderComponent("banner", selectedComponents.banner)} */}
          {renderComponent("slider", selectedComponents.slider)}
          {renderComponent("category", selectedComponents.category)}
          {renderComponent("product", selectedComponents.product)}
          {renderComponent("highlight", selectedComponents.highlight)}
          {renderComponent("footer", selectedComponents.footer)}
        </div>
      </main>
    </>
  );
}
