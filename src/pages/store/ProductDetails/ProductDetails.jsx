import { useParams } from "react-router";
import Hero from "./Hero/Hero";
import useGetStorePreference from "../../../hooks/stores/useGetStorePreference";
import useGetQuery from "../../../hooks/queries/useGetQuery";

export default function ProductDetails() {
  const { storeId, productId } = useParams();

  const { data: storePreference } = useGetStorePreference(storeId);

  const { data: productDetails } = useGetQuery({
    endpoint: `/product/?productId=${productId}`,
    queryKey: ["products", productId],
    enabled: !!productId,
  });

  const renderDescription = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <section className="px-5 py-10 md:container md:mx-auto md:px-0 md:py-20">
      {productDetails && (
        <>
          <Hero
            productDetails={productDetails}
            currencySymbol={storePreference?.data?.currencySymbol}
          />

          <div className="font-poppins">
            <h2 className="border-accent mt-12 border-l-2 pl-1.5 text-2xl font-medium">
              Description
            </h2>

            <div
              dangerouslySetInnerHTML={renderDescription(
                productDetails?.data?.productDescription,
              )}
              className="mt-6"
            ></div>
          </div>
        </>
      )}
    </section>
  );
}
