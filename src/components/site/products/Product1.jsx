import { useParams } from "react-router";
import ProductCard from "../shared/ProductCard";
import useGetProductsByStoreId from "../../../hooks/products/useGetProductsByStoreId";

export default function Product1() {
  const { storeId } = useParams();

  // fetch all products by selected storeId
  const { data: products } = useGetProductsByStoreId(storeId);

  return (
    <section className="font-roboto mx-5 py-10 md:container md:mx-auto md:py-20">
      <h2 className="font-merriweather text-xl font-medium md:text-3xl">
        Featured Products
      </h2>

      <div className="mt-10 grid grid-cols-2 gap-5 md:mt-10 md:grid-cols-3 lg:grid-cols-5">
        {products &&
          products?.data?.length > 0 &&
          products?.data?.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
      </div>
    </section>
  );
}
