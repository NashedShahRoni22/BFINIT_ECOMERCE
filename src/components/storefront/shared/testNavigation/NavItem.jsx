import { useRef, useState } from "react";
import { NavLink } from "react-router";
import NavDropdown from "./NavDropdown";
import { ChevronDown } from "lucide-react";

const NavItem = ({ item, scrolled }) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
    setOpen(true);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setOpen(false);
      setHovered(false);
    }, 120);
  };

  const textColor = scrolled
    ? "text-primary hover:text-black"
    : "text-white/85 hover:text-white";

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`relative flex cursor-pointer items-center gap-1.5 px-2.5 py-2 text-xs font-normal tracking-wide transition-colors duration-300 select-none ${textColor} `}
      >
        {/* Label */}

        {item.type === "link" ? (
          <NavLink to={item.link} className="uppercase">
            {item.label}
          </NavLink>
        ) : (
          <span className="uppercase">{item.label}</span>
        )}

        {item.dropdown && (
          <ChevronDown
            size={13}
            className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
          />
        )}

        {/* Underline animation */}
        <span
          className="absolute bottom-0.5 left-2.5 h-px bg-current transition-all duration-300 ease-out"
          style={{ width: hovered ? "calc(100% - 20px)" : "0%" }}
        />
      </button>

      {/* Dropdown */}
      {item.dropdown && <NavDropdown items={item.dropdown} visible={open} />}
    </div>
  );
};

export default NavItem;
