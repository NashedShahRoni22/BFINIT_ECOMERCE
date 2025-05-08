import { useParams } from "react-router";
import ProductCardSkeletonGrid from "../skeleton/ProductCardSkeletonGrid";
import ProductCard2 from "../cards/ProductCard2";
import EmptyState from "../EmptyState";
import useGetStorePreference from "../../../hooks/stores/useGetStorePreference";

export default function Product2({ products, isProductsLoading }) {
  const { storeId } = useParams();
  const { data: storePreference } = useGetStorePreference(storeId);

  // grid skeleton loading
  if (isProductsLoading) {
    return <ProductCardSkeletonGrid />;
  }

  return (
    <>
      {products && products?.length > 0 ? (
        <div className="grid grid-cols-2 gap-5 md:mt-10 md:grid-cols-3 lg:grid-cols-5">
          {products?.map((product) => (
            <ProductCard2
              key={product.productId}
              product={product}
              currencySymbol={storePreference?.data?.currencySymbol}
              storeId={storeId}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          message="No products added yet!"
          description="It looks like there are no products available at the moment."
        />
      )}
    </>
  );
}
