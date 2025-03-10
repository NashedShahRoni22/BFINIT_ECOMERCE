import { Link } from "react-router";
import { productShowCase } from "../../data/productShowCase";

export default function ProductShowCase() {
  return (
    <section className="mx-5 grid grid-cols-2 gap-6 py-10 md:container md:mx-auto md:py-20">
      {productShowCase.map((product) => (
        <Link key={product.id} to={`/product/${product.id}`}>
          {/* image size should be : width=1500px * height=785px */}
          <img
            src={product.img}
            alt=""
            className="h-full w-full object-cover"
          />
        </Link>
      ))}
    </section>
  );
}
