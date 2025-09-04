import { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useParams } from "react-router";
import useAuth from "../hooks/auth/useAuth";
import useGetQuery from "../hooks/queries/useGetQuery";
import { componentsData } from "../data/adminData/componentsData";
import useGetAllMeta from "../hooks/meta/getAllMeta";
import { CustomerProvider } from "../Providers/CustomerProvider";

export default function PreviewLayout() {
  const { user } = useAuth();
  const { storeId } = useParams();
  const [previewData, setPreviewData] = useState([]);

  // fetch meta description
  const { data: metaData } = useGetAllMeta(storeId);

  // fetch store preference
  const { data: storePreferenceData, isLoading } = useGetQuery({
    endpoint: `/store/preference/?storeId=${storeId}`,
    token: user?.token,
    queryKey: ["storePreference", storeId],
    enabled: !!storeId && !!user?.token,
  });

  // Update website title, meta description and favicon
  useEffect(() => {
    const metaDescription = document.querySelector("meta[name='description']");

    // update title and meta description
    if (isLoading) {
      document.title = "Loading...";
    } else if (metaData?.data?.length > 0) {
      document.title = metaData?.data[0]?.Title;

      if (metaDescription) {
        metaDescription.setAttribute("content", metaData?.data[0]?.Description);
      }
    } else {
      document.title = storePreferenceData?.storeName;
    }

    // Update favicon
    if (storePreferenceData?.storeFavicon) {
      const faviconLink = document.querySelector("link[rel='icon']");
      if (faviconLink) {
        faviconLink.href = `https://ecomback.bfinit.com${storePreferenceData.storeFavicon}`;
      }
    }
  }, [isLoading, storePreferenceData, metaData]);

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

  return (
    <CustomerProvider>
      <ScrollRestoration />
      {renderComponent("navbarStyle", previewData.navbarStyle)}
      {renderComponent("categoryBarStyle", previewData.categoryBarStyle)}
      <Outlet />
      {renderComponent("footerStyle", previewData.footerStyle)}
    </CustomerProvider>
  );
}
