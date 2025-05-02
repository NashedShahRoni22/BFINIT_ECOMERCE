import { useRef, useState } from "react";
import { Link, useParams } from "react-router";
import useGetCategories from "../../../../hooks/categories/useGetCategories";
import useGetSubCategories from "../../../../hooks/categories/subCategories/useGetSubCategories";

export default function CategoryBar() {
  const { storeId } = useParams();
  const [categoryId, setCategoryId] = useState("");
  const debounceTimeout = useRef(null);

  const { data: categories } = useGetCategories(storeId);
  const { data: subCategories } = useGetSubCategories(storeId, categoryId);

  const handleMouseEnter = (id) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setCategoryId(id);
    }, 200);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  };

  return (
    <div className="sticky -top-0.5 left-0 z-50 bg-white shadow-sm">
      <div className="mx-5 hidden gap-4 md:container md:mx-auto md:flex">
        {categories &&
          categories?.data?.length > 0 &&
          categories?.data?.map((category) => (
            <div key={category.id} className="group relative py-3 text-sm">
              <Link
                className="group-hover:text-accent font-medium transition-all duration-200 ease-in-out"
                to={`/preview/${storeId}/products/categories/${encodeURIComponent(category.name)}`}
                onMouseEnter={() => handleMouseEnter(category.id)}
              >
                {category.name}
              </Link>

              {/* Hover Dropdown Lists */}
              {categoryId === category.id &&
                subCategories?.data?.length > 0 && (
                  <div className="absolute top-full left-0 flex w-48 origin-top scale-y-0 flex-col rounded bg-white opacity-0 shadow-sm transition-all duration-300 ease-in-out group-hover:scale-y-100 group-hover:opacity-100">
                    {subCategories.data.map((subCategoryName, i) => (
                      <Link
                        key={i}
                        to={`/preview/${storeId}/products/categories/${encodeURIComponent(category.name)}?subCategory=${encodeURIComponent(subCategoryName)}`}
                        className="hover:bg-accent rounded p-2 transition-all duration-200 ease-in-out hover:text-white"
                      >
                        {subCategoryName}
                      </Link>
                    ))}
                  </div>
                )}
            </div>
          ))}
      </div>
    </div>
  );
}
