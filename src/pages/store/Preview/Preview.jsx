import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ThemeContext } from "../../../Providers/ThemeProvider";
import useGetStorePreference from "../../../hooks/stores/useGetStorePreference";
import { componentsData } from "../../../data/adminData/componentsData";
import useGetProductsByStoreId from "../../../hooks/products/useGetProductsByStoreId";
import Hero from "../../../components/maria/Hero";
import Features from "../../../components/maria/Features";
import Pricing from "../../../components/maria/Pricing";
import Testimonials from "../../../components/maria/Testimonials";
import OmadaHrPayroll from "../../../components/maria/OmadaHrPayroll";

export default function Preview() {
  const { setSelectedTheme } = useContext(ThemeContext);
  const { storeId } = useParams();
  const [previewData, setPreviewData] = useState([]);

  const isMariaStore = storeId === "6893084dcf19613323046c70";

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
          {isMariaStore ? (
            <>
              <Hero />
              <div
                id="pricing"
                className="font-roboto px-5 py-10 md:container md:mx-auto md:py-16"
              >
                <h2 className="text-primary font-playfair text-center text-4xl font-bold">
                  Featured Products
                </h2>
                <p className="mx-auto mt-4 w-full max-w-2xl text-center text-pretty text-[#4B5563]">
                  Choose the plan that fits your business needs. All plans
                  include core payroll processing and tax filing.
                </p>
                {renderComponent("productStyle", previewData.productStyle)}
              </div>
              <OmadaHrPayroll />
              <Features />
            </>
          ) : (
            renderComponent("sliderStyle", previewData.sliderStyle)
          )}
          {renderComponent("categoryStyle", previewData.categoryStyle)}
          {renderComponent("highlightStyle", previewData.highlightStyle)}
          {!isMariaStore && (
            <div className="font-roboto px-5 py-10 md:container md:mx-auto md:py-16">
              <h2 className="font-merriweather mb-10 text-center text-xl font-medium md:text-3xl">
                Featured Products
              </h2>
              {renderComponent("productStyle", previewData.productStyle)}
            </div>
          )}
          {renderComponent("bannerStyle", previewData.bannerStyle)}
        </>
      )}
    </div>
  );
}
