import { Link } from "react-router";
import { clothCategories } from "../../../data/clothCategories";

export default function Category2() {
  return (
    <section className="font-merriweather mx-5 py-10 md:container md:mx-auto md:py-20">
      <h2 className="text-center text-xl font-medium md:text-3xl">
        Browse Our Category
      </h2>
      <p className="mt-2 text-center text-sm font-light md:text-lg">
        Get your desired product from our category
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {clothCategories.map((category) => (
          <Link
            key={category.id}
            to={`/categories/${category.id}`}
            className="group relative flex h-96 w-full items-end overflow-hidden md:h-[550px]"
          >
            <img
              src={category.img}
              alt={category.title}
              loading="lazy"
              className="absolute top-0 left-0 -z-10 h-full w-full object-cover transition-all duration-200 ease-linear group-hover:scale-105"
            />
            <div className="absolute -z-10 h-full w-full bg-black/15"></div>
            <h3 className="text-on-primary p-6 text-2xl font-bold md:text-3xl">
              {category.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
