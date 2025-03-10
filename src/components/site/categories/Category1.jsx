import { techCategories } from "../../../data/techCategories";
import CategoryCard from "../shared/CategoryCard";

export default function Category1() {
  return (
    <section className="mx-5 py-10 md:container md:mx-auto md:py-20">
      <h2 className="font-merriweather text-center text-xl font-medium md:text-3xl">
        Product Category
      </h2>
      <p className="font-merriweather mt-2 text-center text-sm font-light md:text-lg">
        Get your desired product from our category
      </p>

      <div className="mt-10 grid grid-cols-3 gap-2 md:gap-y-5 lg:grid-cols-6 xl:grid-cols-8">
        {techCategories.map((category, i) => (
          <CategoryCard key={i} category={category} />
        ))}
      </div>
    </section>
  );
}
