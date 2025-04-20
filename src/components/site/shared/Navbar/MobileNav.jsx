import { useState } from "react";
import { Link } from "react-router";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi2";
import useCategoryLists from "../../../../hooks/categories/useCategoryLists";

export default function MobileNav() {
  const categoryLists = useCategoryLists();
  const [showDropdown, setShowDropdown] = useState("");

  const toggleDropdown = (name) => {
    setShowDropdown(showDropdown === name ? "" : name);
  };

  return (
    <div className="w-full px-5 py-2">
      {categoryLists.map((category, i) => (
        <div key={i} className="py-2">
          {category.children ? (
            <button
              onClick={() => toggleDropdown(category.name)}
              className={`flex w-full justify-between ${category.name === showDropdown && "text-orange-500"}`}
            >
              {category.name}
              {category.name === showDropdown ? (
                <HiOutlineMinus className="min-w-fit" />
              ) : (
                <HiOutlinePlus className="min-w-fit" />
              )}
            </button>
          ) : (
            <Link
              to={category.path}
              className="transition-all duration-200 ease-linear hover:text-orange-500"
            >
              {category.name}
            </Link>
          )}

          <div className="flex flex-col gap-2 pt-2">
            {category.name === showDropdown &&
              category.children.map((item, i) => (
                <Link
                  key={i}
                  to={item.path}
                  className="transition-all duration-200 ease-linear hover:text-orange-500"
                >
                  {item.name}
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
