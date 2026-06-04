import { NavLink } from "react-router";

const NavDropdown = ({ items, visible }) => {
  return (
    <div
      className={`absolute top-[calc(100%+12px)] left-1/2 z-50 w-56 overflow-hidden rounded-xl border border-black/8 bg-white shadow-2xl transition-all duration-300 ease-out ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0"
      } `}
      style={{
        transform: `translateX(-50%) translateY(${visible ? "0" : "-8px"})`,
      }}
    >
      <div className="p-2">
        {items.map((item, i) =>
          item === null ? (
            <div key={i} className="mx-2 my-1 h-px bg-gray-100" />
          ) : (
            <div
              key={i}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs text-gray-700 transition-colors hover:bg-gray-50"
            >
              <NavLink
                to={item.link}
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400"
              />
              {item.label}
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default NavDropdown;
