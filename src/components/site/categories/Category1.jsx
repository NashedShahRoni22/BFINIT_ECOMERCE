import { useParams } from "react-router";
import CategoryCard from "../shared/CategoryCard";
import useGetCategories from "../../../hooks/categories/useGetCategories";
import EmptyState from "../EmptyState";

export default function Category1() {
  const { storeId } = useParams();
  const { data: categories } = useGetCategories(storeId);

  return (
    <section className="mx-5 py-10 md:container md:mx-auto md:py-20">
      <h2 className="font-merriweather text-center text-xl font-medium md:text-3xl">
        Product Category
      </h2>

      {categories && categories?.data?.length > 0 ? (
        <>
          <p className="font-merriweather mt-2 text-center text-sm font-light md:text-lg">
            Get your desired product from our category
          </p>
          <div className="mt-10 grid grid-cols-3 gap-2 md:gap-y-5 lg:grid-cols-6 xl:grid-cols-8">
            {categories?.data?.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                storeId={storeId}
              />
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          message="No category added yet!"
          description="It looks like there are no categories available at the moment."
        />
      )}
    </section>
  );
}
