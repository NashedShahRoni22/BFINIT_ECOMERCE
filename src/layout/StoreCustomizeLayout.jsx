import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { ThemeContext } from "../Providers/ThemeProvider";
import WebsiteSkeleton from "../components/admin/loaders/WebasiteSkeleton";
import TopNav from "../components/admin/shared/TopNav";
import CustomizeSideNav from "../components/admin/shared/CustomizeSideNav";
import useAuth from "../hooks/auth/useAuth";
import useGetQuery from "../hooks/queries/useGetQuery";
import { areComponentsEqual } from "../utils/admin/areComponentsEqual";
import { componentsData } from "../data/adminData/componentsData";

export default function StoreCustomizeLayout() {
  const { user } = useAuth();
  const { storeId } = useParams();
  const { selectedTheme, setSelectedTheme } = useContext(ThemeContext);

  // fetch store preference
  const { data: storePreferenceData, isLoading } = useGetQuery({
    endpoint: `/store/preference/?storeId=${storeId}`,
    token: user?.token,
    queryKey: ["storePreference", storeId],
    enabled: !!storeId && !!user?.token,
  });

  const [showSideNav, setShowSideNav] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");
  const [savedComponents, setSavedComponents] = useState({});
  const [selectedComponents, setSelectedComponents] = useState({
    navbarStyle: "nav1",
    categoryBarStyle: "categoryBar1",
    sliderStyle: "slider1",
    categoryStyle: "category1",
    highlightStyle: "highlight1",
    productStyle: "product1",
    bannerStyle: "banner1",
    footerStyle: "footer1",
    themeStyle: selectedTheme,
  });

  // set database saved components to selectedComponents and savedComponents
  useEffect(() => {
    const dbSavedComponents = {
      navbarStyle: `nav${storePreferenceData?.data?.navbarStyle}`,
      categoryBarStyle: `categoryBar${storePreferenceData?.data?.categoryBarStyle}`,
      sliderStyle: `slider${storePreferenceData?.data?.sliderStyle}`,
      categoryStyle: `category${storePreferenceData?.data?.categoryStyle}`,
      highlightStyle: `highlight${storePreferenceData?.data?.highlightStyle}`,
      productStyle: `product${storePreferenceData?.data?.productStyle}`,
      bannerStyle: `banner${storePreferenceData?.data?.bannerStyle}`,
      footerStyle: `footer${storePreferenceData?.data?.footerStyle}`,
      themeStyle: storePreferenceData?.storeTheme,
    };

    setSelectedComponents(dbSavedComponents);
    setSavedComponents(dbSavedComponents);
    setSelectedTheme(storePreferenceData?.storeTheme || 2);
  }, [storePreferenceData, setSelectedTheme]);

  // Toggle component link dropdown visibility
  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? "" : index);
  };

  // Handle checkbox selection
  const handleCheckboxChange = (category, value) => {
    if (category === "themeStyle") {
      setSelectedTheme(value);
    }

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

  // track if new component selected or not
  const hasChanges = useMemo(() => {
    return !areComponentsEqual(selectedComponents, savedComponents);
  }, [selectedComponents, savedComponents]);

  if (isLoading) {
    return <WebsiteSkeleton />;
  }

  return (
    <>
      <TopNav showSideNav={showSideNav} setShowSideNav={setShowSideNav} />

      <main className="font-inter relative flex">
        <CustomizeSideNav
          showSideNav={showSideNav}
          toggleDropdown={toggleDropdown}
          openDropdown={openDropdown}
          selectedComponents={selectedComponents}
          onCheckboxChange={handleCheckboxChange}
          hasChanges={hasChanges}
        />

        <div className="relative h-[calc(100dvh-55px)] w-full overflow-y-auto">
          {/* Render selected components dynamically */}
          {renderComponent("navbarStyle", selectedComponents.navbarStyle)}
          {renderComponent(
            "categoryBarStyle",
            selectedComponents.categoryBarStyle,
          )}
          {renderComponent("sliderStyle", selectedComponents.sliderStyle)}
          {renderComponent("categoryStyle", selectedComponents.categoryStyle)}
          {renderComponent("highlightStyle", selectedComponents.highlightStyle)}
          {renderComponent("productStyle", selectedComponents.productStyle)}
          {renderComponent("bannerStyle", selectedComponents.bannerStyle)}

          {renderComponent("footerStyle", selectedComponents.footerStyle)}
        </div>
      </main>
    </>
  );
}
