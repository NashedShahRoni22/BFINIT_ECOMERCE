import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { NavLink } from "react-router";

const MobileNav = ({ showMenu, setShowMenu, navItems, scrolled }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      {/* MENU BUTTON */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={`cursor-pointer lg:hidden ${scrolled || showMenu ? "text-black" : "text-white"}`}
      >
        {showMenu ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* MOBILE MENU PANEL */}
      <div
        className={`fixed top-[72px] left-0 w-full overflow-hidden bg-white shadow-xl transition-all duration-500 ease-in-out lg:hidden ${
          showMenu ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="h-screen space-y-2 p-5">
          {navItems.map((item, index) => (
            <div key={index} className="border-b border-gray-100 pb-2">
              {item.type === "link" ? (
                <NavLink
                  to={item.link}
                  onClick={() => setShowMenu(false)}
                  className="block py-3 text-sm font-medium uppercase"
                >
                  {item.label}
                </NavLink>
              ) : (
                <>
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="flex w-full items-center justify-between py-3 text-sm font-medium uppercase"
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.dropdown?.map((sub, i) =>
                      sub === null ? null : (
                        <NavLink
                          key={i}
                          to={sub.link}
                          onClick={() => setShowMenu(false)}
                          className="block py-2 pl-4 text-sm text-gray-600"
                        >
                          {sub.label}
                        </NavLink>
                      ),
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileNav;
