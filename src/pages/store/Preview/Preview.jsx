import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ThemeContext } from "../../../Providers/ThemeProvider";
import useGetStorePreference from "../../../hooks/stores/useGetStorePreference";
import { componentsData } from "../../../data/adminData/componentsData";
import useGetProductsByStoreId from "../../../hooks/products/useGetProductsByStoreId";

export default function Preview() {
  const { setSelectedTheme } = useContext(ThemeContext);
  const { storeId } = useParams();
  const [previewData, setPreviewData] = useState([]);

  // fetch store preference
  const { data: storePreferenceData, isLoading: storePreferenceLoading } =
    useGetStorePreference(storeId);
  // fetch all products by selected storeId
  const { data: products, isLoading: productsLoading } =
    useGetProductsByStoreId(storeId);

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

    if (category === "productStyle") {
      return Component ? <Component products={products?.data} /> : null;
    }

    return Component ? <Component /> : null;
  };

  return (
    <div>
      {!storePreferenceLoading && !productsLoading && (
        <>
          {renderComponent("sliderStyle", previewData.sliderStyle)}
          {renderComponent("categoryStyle", previewData.categoryStyle)}
          {renderComponent("highlightStyle", previewData.highlightStyle)}
          <div className="font-roboto px-5 py-10 md:container md:mx-auto md:py-20">
            <h2 className="font-merriweather mb-10 text-center text-xl font-medium md:text-3xl">
              Featured Products
            </h2>
            {renderComponent("productStyle", previewData.productStyle)}
          </div>
          {renderComponent("bannerStyle", previewData.bannerStyle)}
        </>
      )}
    </div>
  );
}
