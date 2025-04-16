import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useGetQuery from "../../../hooks/useGetQuery";
import { componentsData } from "../../../data/adminData/componentsData";
import WebsiteSkeleton from "../../../components/admin/loaders/WebasiteSkeleton";

export default function Preview() {
  const { user } = useAuth();
  const { storeId } = useParams();
  const [previewData, setPreviewData] = useState([]);

  // fetch store preference
  const { data: storePreferenceData, isLoading } = useGetQuery({
    endpoint: `/store/preference/?storeId=${storeId}`,
    token: user?.token,
    queryKey: ["storePreference", storeId],
    enabled: !!storeId && !!user?.token,
  });

  // set database saved components to previewData and savedComponents
  useEffect(() => {
    const dbSavedComponents = {
      navbarStyle: `nav${storePreferenceData?.data?.navbarStyle}`,
      sliderStyle: `slider${storePreferenceData?.data?.sliderStyle}`,
      categoryStyle: `category${storePreferenceData?.data?.categoryStyle}`,
      highlightStyle: `highlight${storePreferenceData?.data?.highlightStyle}`,
      productStyle: `product${storePreferenceData?.data?.productStyle}`,
      bannerStyle: `banner${storePreferenceData?.data?.bannerStyle}`,
      footerStyle: `footer${storePreferenceData?.data?.footerStyle}`,
    };

    setPreviewData(dbSavedComponents);
  }, [storePreferenceData]);

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
      {renderComponent("navbarStyle", previewData.navbarStyle)}
      {renderComponent("sliderStyle", previewData.sliderStyle)}
      {renderComponent("categoryStyle", previewData.categoryStyle)}
      {renderComponent("highlightStyle", previewData.highlightStyle)}
      {renderComponent("productStyle", previewData.productStyle)}
      {renderComponent("bannerStyle", previewData.bannerStyle)}
      {renderComponent("footerStyle", previewData.footerStyle)}
    </div>
  );
}
