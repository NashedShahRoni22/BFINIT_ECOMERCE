import { useParams } from "react-router";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import useAuth from "../../../hooks/auth/useAuth";
import useGetStorePreference from "../../../hooks/stores/useGetStorePreference";
import { useEffect, useState } from "react";
import { componentsData } from "../../../data/adminData/componentsData";

export default function Categories() {
  const { storeId, categoryName } = useParams();
  const { user } = useAuth();
  const [previewData, setPreviewData] = useState([]);

  const { data: storePreference } = useGetStorePreference(storeId);
  const { data } = useGetQuery({
    endpoint: `/product/by-category/?storeId=${storeId}&categoryName=${decodeURIComponent(categoryName)}`,
    token: user?.token,
    queryKey: ["products", storeId, categoryName],
    enabled: !!storeId && !!categoryName && !!user?.token,
  });

  // set database saved components to previewData and savedComponents
  useEffect(() => {
    const dbSavedComponents = {
      navbarStyle: `nav${storePreference?.data?.navbarStyle}`,
      categoryBarStyle: `categoryBar${storePreference?.storeTheme}`,
      sliderStyle: `slider${storePreference?.data?.sliderStyle}`,
      categoryStyle: `category${storePreference?.data?.categoryStyle}`,
      highlightStyle: `highlight${storePreference?.data?.highlightStyle}`,
      productStyle: `product${storePreference?.data?.productStyle}`,
      bannerStyle: `banner${storePreference?.data?.bannerStyle}`,
      footerStyle: `footer${storePreference?.data?.footerStyle}`,
    };

    setPreviewData(dbSavedComponents);
  }, [storePreference]);

  // Function to dynamically render components
  const renderComponent = (category, value) => {
    const Component = componentsData[category]?.[value];
    return Component ? <Component /> : null;
  };

  return <div>{renderComponent("productStyle", previewData.productStyle)}</div>;
}
