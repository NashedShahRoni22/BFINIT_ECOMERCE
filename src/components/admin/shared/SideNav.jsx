import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { sideNavLinks } from "../../../data/adminData/sideNavLinks";
import useAuth from "../../../hooks/auth/useAuth";
import bookIcon from "../../../assets/icons/book.png";
import { ChevronDown } from "lucide-react";

export default function SideNav({ showSideNav, toggleSideNav }) {
  const { user } = useAuth();
  const location = useLocation();
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

  // handle dropdown toggle on click
  const toggleDropdown = (groupIndex, linkIndex) => {
    const dropdownKey = `${groupIndex}-${linkIndex}`;

    if (openDropdown === dropdownKey) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdownKey);
    }
  };

  // handle guide close
  const closeGuide = () => {
    setShowGuide(false);
    localStorage.setItem(
      `guideKey_${user?.data?.clientid}`,
      JSON.stringify(false),
    );
  };

  const isLinkActive = (url) => {
    return location.pathname === url;
  };

  const isDropdownActive = (subCategories) => {
    return subCategories?.some((subItem) => location.pathname === subItem.url);
  };

  return (
    <aside
      className={`custom-scrollbar-hide fixed top-[55px] left-0 z-10 flex h-[calc(100dvh-55px)] flex-col gap-10 overflow-y-auto bg-white p-2 text-sm transition-all duration-300 ease-in-out lg:static lg:w-1/6 lg:min-w-[231px] lg:translate-x-0 ${
        showSideNav ? "w-1/2 translate-x-0 md:w-1/3" : "-translate-x-full"
      }`}
    >
      <nav className="flex flex-1 flex-col gap-1.5">
        {sideNavLinks.map((group, groupIndex) => (
          <div key={groupIndex}>
            <p className="my-2.5 px-4 text-[10px] font-medium tracking-wider text-[#9CA3AF] uppercase">
              {group.groupName}
            </p>

            <div className="space-y-0.5">
              {group.links.map((navMenuItem, linkIndex) =>
                navMenuItem.subCategories ? (
                  <div key={linkIndex}>
                    <button
                      onClick={() => toggleDropdown(groupIndex, linkIndex)}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-md px-4 py-2 transition-all duration-200 ease-linear ${isDropdownActive(navMenuItem.subCategories) ? "text-dashboard-primary bg-[#EFF6FF]" : "hover:bg-[#F4F5F9]"}`}
                    >
                      <div className="flex items-center gap-3">
                        <navMenuItem.icon
                          size={18}
                          className={`shrink-0 ${isDropdownActive(navMenuItem.subCategories) ? "text-dashboard-primary" : "text-[#6B7280]"}`}
                        />
                        <span
                          className={`text-xs font-medium ${isDropdownActive(navMenuItem.subCategories) ? "text-dashboard-primary" : "text-[#4B5563]"}`}
                        >
                          {navMenuItem.name}
                        </span>
                      </div>

                      <ChevronDown
                        size={16}
                        className={`shrink-0 text-[#6B7280] transition-transform duration-200 ease-linear ${openDropdown === `${groupIndex}-${linkIndex}` ? "rotate-180" : "rotate-0"} ${isDropdownActive(navMenuItem.subCategories) ? "text-dashboard-primary" : "text-[#6B7280]"}`}
                      />
                    </button>

                    {/* Subcategories dropdown */}
                    <div
                      className={`mt-1 ml-4 grid overflow-hidden border-l border-[#E5E7EB] pl-4 opacity-100 transition-all duration-200 ease-linear ${openDropdown === `${groupIndex}-${linkIndex}` ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <div className="min-h-0 space-y-0.5">
                        {navMenuItem.subCategories.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            onClick={toggleSideNav}
                            to={subItem.url}
                            className={`flex items-center gap-2 overflow-hidden rounded-md py-1.5 transition-colors duration-200 ease-linear md:px-3 ${
                              isLinkActive(subItem.url)
                                ? "text-dashboard-primary"
                                : "text-[#6B7280] hover:bg-[#F4F5F9]"
                            }`}
                          >
                            <subItem.icon
                              size={14}
                              className={`shrink-0 ${isLinkActive(subItem.url) ? "text-dashboard-primary" : "text-[#9CA3AF]"}`}
                            />
                            <span
                              className={`text-xs ${isLinkActive(subItem.url) ? "text-dashboard-primary font-medium" : "text-[#4B5563]"}`}
                            >
                              {subItem.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={linkIndex}
                    onClick={toggleSideNav}
                    to={navMenuItem.url}
                    className={`flex items-center gap-3 rounded-md px-4 py-2 transition-all duration-200 ease-linear ${isLinkActive(navMenuItem.url) ? "bg-[#EFF6FF]" : "hover:bg-[#F4F5F9]"}`}
                  >
                    <navMenuItem.icon
                      size={18}
                      className={`shrink-0 ${isLinkActive(navMenuItem.url) ? "text-dashboard-primary" : "text-[#6B7280]"}`}
                    />
                    <span
                      className={`text-xs font-medium ${isLinkActive(navMenuItem.url) ? "text-dashboard-primary" : "text-[#4B5563]"}`}
                    >
                      {navMenuItem.name}
                    </span>
                  </Link>
                ),
              )}
            </div>
          </div>
        ))}
      </nav>

      {/* guide download btn */}
      <div className="px-4 md:px-0">
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
              onClick={toggleSideNav}
              className="mt-3 inline-block w-full cursor-pointer rounded-full bg-gray-900 py-1.5 text-center text-xs text-white transition-all duration-200 ease-linear hover:bg-gray-800 active:scale-95"
            >
              Get Help Guide
            </a>
          </div>
        )}
      </div>
    </aside>
  );
}
