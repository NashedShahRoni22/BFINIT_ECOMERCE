import { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useParams } from "react-router";
import useAuth from "../hooks/auth/useAuth";
import useGetQuery from "../hooks/queries/useGetQuery";
import { componentsData } from "../data/adminData/componentsData";
import WebsiteSkeleton from "../components/admin/loaders/WebasiteSkeleton";

export default function PreviewLayout() {
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
      categoryBarStyle: `categoryBar${storePreferenceData?.data?.categoryBarStyle}`,
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
      {renderComponent("categoryBarStyle", previewData.categoryBarStyle)}
      <Outlet />
      {renderComponent("footerStyle", previewData.footerStyle)}
      <ScrollRestoration />
    </div>
  );
}
