import { useEffect, useState } from "react";
import { Link } from "react-router";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { sideNavLinks } from "../../../data/adminData/sideNavLinks";
import useAuth from "../../../hooks/auth/useAuth";
import bookIcon from "../../../assets/icons/book.png";

export default function SideNav({ showSideNav }) {
  const { user } = useAuth();
  const [openDropdown, setOpenDropdown] = useState("");
  const [showGuide, setShowGuide] = useState(true);

  // check if user previously hide e-com guide download button
  useEffect(() => {
    if (user?.data?.clientid) {
      const stored = localStorage.getItem(`guideKey_${user.data.clientid}`);
      if (stored !== null) {
        setShowGuide(JSON.parse(stored));
      }
    }
  }, [user?.data?.clientid]);

  // Handle click to toggle dropdown visibility
  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? "" : index);
  };

  // handle guide close
  const closeGuide = () => {
    setShowGuide(false);
    localStorage.setItem(
      `guideKey_${user?.data?.clientid}`,
      JSON.stringify(false),
    );
  };

  return (
    <aside
      className={`absolute z-10 flex h-[calc(100dvh-55px)] flex-col gap-10 overflow-y-auto bg-neutral-100 text-sm transition-all duration-300 ease-in-out md:px-4 md:py-2 lg:static lg:w-1/6 lg:min-w-[231px] lg:translate-x-0 ${showSideNav ? "w-1/2 translate-x-0 md:w-1/3" : "-translate-x-[1000%]"}`}
    >
      <nav className="flex flex-1 flex-col gap-1.5">
        {sideNavLinks.map((link, i) => (
          <div key={i}>
            {/* Products dropdown with nested subcategories */}
            {link.subCategories ? (
              <div>
                <button
                  className="group flex w-full cursor-pointer gap-1 rounded-md px-4 py-2 capitalize transition-all duration-200 ease-in-out hover:bg-white"
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
                        className="flex gap-1.5 rounded-md px-4 py-2 capitalize transition-all duration-200 ease-in-out hover:bg-white"
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
                className="group flex gap-1 rounded-md px-4 py-2 capitalize transition-all duration-200 ease-in-out hover:bg-white"
              >
                <link.icon className="text-dashboard-primary text-2xl" />
                {link.name}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* guide download btn */}
      {showGuide && (
        <div className="group relative rounded-md border border-neutral-200 bg-[#f5f8fc] px-4 pt-6 pb-2">
          <div className="absolute -top-5 left-1/2 flex size-10 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-blue-200">
            <img
              src={bookIcon}
              alt="book icon"
              loading="lazy"
              className="size-8"
            />
          </div>

          {/* close button */}
          <button
            onClick={closeGuide}
            className="absolute -top-2 -right-2 cursor-pointer rounded-full bg-[#f5f8fc]"
          >
            <IoIosCloseCircleOutline className="size-5 text-red-600" />
          </button>

          <p className="text-center font-semibold">BFINIT Guide</p>
          <p className="mt-1.5 text-center text-[11px] leading-tight tracking-tight text-balance text-gray-700">
            How our ecommerce platform works
          </p>

          <a
            href="https://ecomback.bfinit.com/uploads/ecom/guide/BFINIT%20E-Commerce%20Guide.pdf"
            download
            target="_blanck"
            className="mt-3 inline-block w-full cursor-pointer rounded-full bg-gray-900 py-1.5 text-center text-xs text-white transition-all duration-200 ease-linear hover:bg-gray-800 active:scale-95"
          >
            Get Help Guide
          </a>
        </div>
      )}
    </aside>
  );
}
