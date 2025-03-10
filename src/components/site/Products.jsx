import { products } from "../../data/productData";
import ProductCard from "./shared/ProductCard";

export default function Products() {
  return (
    <section className="mx-5 py-10 md:container md:mx-auto md:py-20">
      <h2 className="font-merriweather text-xl font-medium md:text-3xl">
        Featured Products
      </h2>

      <div className="mt-10 grid grid-cols-2 gap-5 md:mt-10 md:grid-cols-3 lg:grid-cols-5">
        {products.map((p, i) => (
          <ProductCard key={i} p={p} />
        ))}
      </div>
    </section>
  );
}
