import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import useGetStorePreference from "../../../hooks/stores/useGetStorePreference";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import { componentsData } from "../../../data/adminData/componentsData";

export default function Categories() {
  const { storeId, categoryName } = useParams();
  const [searchParams] = useSearchParams();
  const subCategoryName = searchParams.get("subCategory");
  const [previewData, setPreviewData] = useState([]);

  const { data: storePreference } = useGetStorePreference(storeId);
  // dynamic api endpoint for cateogory and sub-category
  const endpointUrl = subCategoryName
    ? `/product/by-subcategory/?storeId=${storeId}&categoryName=${encodeURIComponent(categoryName)}&subCategoryName=${decodeURIComponent(subCategoryName)}`
    : `/product/by-category/?storeId=${storeId}&categoryName=${encodeURIComponent(categoryName)}`;

  // custom get api hooks for category products or sub category products
  const { data: categoryProducts, isLoading: isProductsLoading } = useGetQuery({
    endpoint: endpointUrl,
    queryKey: [
      "products",
      storeId,
      categoryName,
      ...(subCategoryName ? [subCategoryName] : []),
    ],
    enabled:
      !!storeId && !!categoryName && (!subCategoryName || !!subCategoryName),
  });

  // set database saved components to previewData and savedComponents
  useEffect(() => {
    const dbSavedComponents = {
      productStyle: `product${storePreference?.data?.productStyle}`,
    };

    setPreviewData(dbSavedComponents);
  }, [storePreference]);

  // Function to dynamically render components
  const renderComponent = (category, value) => {
    const Component = componentsData[category]?.[value];
    return Component ? (
      <Component
        products={categoryProducts?.data}
        isProductsLoading={isProductsLoading}
      />
    ) : null;
  };

  return (
    <div className="font-roboto h-full min-h-[calc(100vh-124px)] px-5 py-10 md:container md:mx-auto">
      <h1 className="font-merriweather mb-10 text-center text-xl font-medium md:text-3xl">
        Explore{" "}
        {decodeURIComponent(subCategoryName ? subCategoryName : categoryName)}
      </h1>
      {renderComponent("productStyle", previewData.productStyle)}
    </div>
  );
}
