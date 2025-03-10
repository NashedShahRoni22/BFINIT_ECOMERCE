import { useState } from "react";
import { Link } from "react-router";
import { sideNavLinks } from "../../../data/adminData/sideNavLinks";

export default function SideNav({ showSideNav }) {
  const [openDropdown, setOpenDropdown] = useState("");

  // Handle click to toggle dropdown visibility
  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? "" : index);
  };

  return (
    <aside
      className={`absolute h-[calc(100dvh-55px)] bg-neutral-100 transition-all duration-300 ease-in-out md:px-4 md:py-2 lg:static lg:w-1/6 lg:translate-x-0 ${showSideNav ? "w-1/2 translate-x-0 md:w-1/3" : "-translate-x-[1000%]"}`}
    >
      <nav className="flex flex-col gap-1.5">
        {sideNavLinks.map((link, i) => (
          <div key={i}>
            {/* Products dropdown with nested subcategories */}
            {link.subCategories ? (
              <div>
                <button
                  className="group flex w-full cursor-pointer gap-1 rounded-md px-4 py-2 text-sm capitalize transition-all duration-200 ease-in-out hover:bg-white"
                  onClick={() => toggleDropdown(i)}
                >
                  <link.icon className="text-dashboard-primary text-2xl" />
                  {link.name}
                </button>

                {/* Dropdown list */}
                <div
                  className={`mt-2 grid overflow-hidden pl-4 transition-all duration-300 ease-in-out ${openDropdown === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    {link.subCategories.map((subLink, j) => (
                      <Link
                        key={j}
                        to={subLink.url}
                        className="flex gap-1.5 rounded-md px-4 py-2 text-sm capitalize transition-all duration-200 ease-in-out hover:bg-white"
                      >
                        <subLink.icon className="text-dashboard-primary -rotate-90 transform text-xl" />
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to={link.url}
                className="group flex gap-1 rounded-md px-4 py-2 text-sm capitalize transition-all duration-200 ease-in-out hover:bg-white"
              >
                <link.icon className="text-dashboard-primary text-2xl" />
                {link.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
