import { useParams } from "react-router";
import ProductCardSkeletonGrid from "../skeleton/ProductCardSkeletonGrid";
import ProductCard from "../cards/ProductCard";
import EmptyState from "../EmptyState";
import useGetStorePreference from "../../../hooks/stores/useGetStorePreference";

export default function Product1({ products, isProductsLoading }) {
  const { storeId } = useParams();
  const { data: storePreference } = useGetStorePreference(storeId);

  // grid skeleton loading
  if (isProductsLoading) {
    return <ProductCardSkeletonGrid />;
  }

  return (
    <>
      {products && products?.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:mt-10 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
          {products?.map((product) => (
            <ProductCard
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
