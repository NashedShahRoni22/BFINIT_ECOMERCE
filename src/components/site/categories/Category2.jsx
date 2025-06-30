import { Link, useParams } from "react-router";
import useGetCategories from "../../../hooks/categories/useGetCategories";

export default function Category2() {
  const { storeId } = useParams();
  const { data: categories } = useGetCategories(storeId);

  return (
    <section className="font-merriweather mx-5 py-10 md:container md:mx-auto md:py-20">
      <h2 className="text-center text-xl font-medium md:text-3xl">
        Browse Our Category
      </h2>
      <p className="mt-2 text-center text-sm font-light md:text-lg">
        Get your desired product from our category
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories?.data?.length > 0 &&
          categories?.data?.slice(0, 4)?.map((category) => (
            <Link
              key={category.id}
              to={`/preview/${storeId}/products/categories/${encodeURIComponent(category.name)}`}
              className="group relative flex h-72 w-full items-end overflow-hidden md:h-[550px]"
            >
              <img
                src={`https://ecomback.bfinit.com${category.image}`}
                alt={category.name}
                loading="lazy"
                className="absolute top-0 left-0 -z-10 h-full w-full object-contain transition-all duration-200 ease-linear group-hover:scale-105"
              />
              <div className="absolute -z-10 h-full w-full bg-black/15"></div>
              <h3 className="text-on-primary p-6 text-lg font-bold md:text-3xl">
                {category.name}
              </h3>
            </Link>
          ))}
      </div>
    </section>
  );
}
