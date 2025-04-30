import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ThemeContext } from "../../../Providers/ThemeProvider";
import WebsiteSkeleton from "../../../components/admin/loaders/WebasiteSkeleton";
import useGetStorePreference from "../../../hooks/stores/useGetStorePreference";
import { componentsData } from "../../../data/adminData/componentsData";

export default function Preview() {
  const { setSelectedTheme } = useContext(ThemeContext);
  const { storeId } = useParams();
  const [previewData, setPreviewData] = useState([]);

  // fetch store preference
  const { data: storePreferenceData, isLoading } =
    useGetStorePreference(storeId);

  // set database saved components to previewData and savedComponents
  useEffect(() => {
    const dbSavedComponents = {
      navbarStyle: `nav${storePreferenceData?.data?.navbarStyle}`,
      categoryBarStyle: `categoryBar${storePreferenceData?.storeTheme}`,
      sliderStyle: `slider${storePreferenceData?.data?.sliderStyle}`,
      categoryStyle: `category${storePreferenceData?.data?.categoryStyle}`,
      highlightStyle: `highlight${storePreferenceData?.data?.highlightStyle}`,
      productStyle: `product${storePreferenceData?.data?.productStyle}`,
      bannerStyle: `banner${storePreferenceData?.data?.bannerStyle}`,
      footerStyle: `footer${storePreferenceData?.data?.footerStyle}`,
    };

    setPreviewData(dbSavedComponents);
    setSelectedTheme(storePreferenceData?.storeTheme);
  }, [storePreferenceData, setSelectedTheme]);

  // Function to dynamically render components
  const renderComponent = (category, value) => {
    const Component = componentsData[category]?.[value];
    return Component ? <Component /> : null;
  };

  if (isLoading) {
    return <WebsiteSkeleton />;
  }

  return (
    <div>
      {renderComponent("sliderStyle", previewData.sliderStyle)}
      {renderComponent("categoryStyle", previewData.categoryStyle)}
      {renderComponent("highlightStyle", previewData.highlightStyle)}
      {renderComponent("productStyle", previewData.productStyle)}
      {renderComponent("bannerStyle", previewData.bannerStyle)}
    </div>
  );
}
