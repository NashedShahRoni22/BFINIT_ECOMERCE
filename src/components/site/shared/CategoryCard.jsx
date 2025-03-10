import { Link } from "react-router";

export default function CategoryCard({ category }) {
  const { url, name, icon } = category;

  return (
    <Link
      to={`/categories/${url}`}
      className="group rounded bg-[#f6f8fa] p-3 text-center md:py-6"
    >
      <img
        src={icon}
        alt={name}
        className="mx-auto size-16 object-cover md:size-[90px]"
      />
      <p className="group-hover:text-accent mt-4 text-sm transition-all duration-200 ease-in-out md:text-base">
        {name}
      </p>
    </Link>
  );
}
