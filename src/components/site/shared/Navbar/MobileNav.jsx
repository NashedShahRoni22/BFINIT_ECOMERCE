import { useState } from "react";
import { Link } from "react-router";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi2";
import useGetCategories from "../../../../hooks/categories/useGetCategories";

export default function MobileNav({ storeId, handleShowMenu }) {
  const { data: categories } = useGetCategories(storeId);
  const [showDropdown, setShowDropdown] = useState("");

  const toggleDropdown = (id) => {
    setShowDropdown(showDropdown === id ? "" : id);
  };

  return (
    <div className="fixed top-[72px] left-0 z-50 min-h-[calc(100vh-72px)] w-full bg-white px-5 py-2">
      {categories?.data?.length > 0 &&
        categories?.data?.map((category) => (
          <div key={category.id} className="border-b border-gray-100 py-2">
            {category?.subcategory && category?.subcategory?.length > 0 ? (
              // with sub-category
              <div>
                <button
                  onClick={() => toggleDropdown(category.id)}
                  className={`flex w-full justify-between ${category.id === showDropdown && "text-orange-500"}`}
                >
                  {category.name}
                  {category.id === showDropdown ? (
                    <HiOutlineMinus className="min-w-fit" />
                  ) : (
                    <HiOutlinePlus className="min-w-fit" />
                  )}
                </button>
                {/* sub-category lists */}
                <div className="flex flex-col gap-2 pt-2 pl-2">
                  {category.id === showDropdown &&
                    category.subcategory.map((item, i) => (
                      <Link
                        key={i}
                        onClick={handleShowMenu}
                        to={`/preview/${storeId}/products/categories/${encodeURIComponent(category.name)}?subCategory=${encodeURIComponent(item)}`}
                        className="transition-all duration-200 ease-linear hover:text-orange-500"
                      >
                        {item}
                      </Link>
                    ))}
                </div>
              </div>
            ) : (
              // Without sub-category
              <Link
                onClick={handleShowMenu}
                to={`/preview/${storeId}/products/categories/${encodeURIComponent(category.name)}`}
                className="block w-full py-2 transition-all duration-200 ease-linear hover:text-orange-500"
              >
                {category.name}
              </Link>
            )}
          </div>
        ))}
    </div>
  );
}
