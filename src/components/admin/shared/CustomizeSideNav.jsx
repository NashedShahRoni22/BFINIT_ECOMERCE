import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router";

export default function CustomizeSideNav({
  showSideNav,
  componentLinks,
  toggleDropdown,
  openDropdown,
  selectedComponents,
  onCheckboxChange,
  hasChanges,
}) {
  return (
    <div
      className={`absolute z-50 flex h-[calc(100dvh-55px)] flex-col bg-neutral-100 transition-all duration-300 ease-in-out md:px-4 md:py-2 lg:static lg:w-1/6 lg:translate-x-0 ${showSideNav ? "w-1/2 translate-x-0 md:w-1/3" : "-translate-x-[1000%]"}`}
    >
      <div className="max-h-[90vh] overflow-y-auto">
        {componentLinks.map((link, i) => (
          <div key={i}>
            {link.subCategories ? (
              <div>
                <button
                  className={`flex w-full cursor-pointer items-center justify-between rounded-md px-4 py-2 text-left text-sm capitalize transition-all duration-200 ease-in-out hover:bg-white ${
                    openDropdown === i && "bg-white"
                  }`}
                  onClick={() => toggleDropdown(i)}
                >
                  {link.name}
                  <MdOutlineKeyboardArrowDown className="text-lg" />
                </button>

                {/* Dropdown list */}
                <div
                  className={`mt-2 grid overflow-hidden pl-4 transition-all duration-300 ease-in-out ${
                    openDropdown === i
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    {link.subCategories.map((subLink, j) => (
                      <div key={j} className="space-y-3 space-x-1.5 text-sm">
                        <input
                          type="checkbox"
                          name={link.name.toLowerCase()} // Use category name as group identifier
                          id={subLink.value}
                          checked={
                            selectedComponents[link.name.toLowerCase()] ===
                            subLink.value
                          }
                          onChange={() =>
                            onCheckboxChange(
                              link.name.toLowerCase(),
                              subLink.value,
                            )
                          }
                        />
                        <label htmlFor={subLink.value}>{subLink.name}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 text-sm">
                <input
                  type="checkbox"
                  id={link.name.toLowerCase()}
                  checked={selectedComponents[link.name.toLowerCase()]}
                  onChange={() =>
                    onCheckboxChange(
                      link.name.toLowerCase(),
                      !selectedComponents[link.name.toLowerCase()],
                    )
                  }
                />
                <label htmlFor={link.name.toLowerCase()}>{link.name}</label>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* buttons container */}
      <div className="mt-auto mb-4 flex items-center justify-center gap-4">
        <Link
          to="/"
          className="rounded-md bg-neutral-300 px-3 py-1.5 text-sm transition-all duration-200 ease-in-out hover:bg-neutral-400"
        >
          Cancel
        </Link>
        <button
          disabled={!hasChanges}
          className={`rounded-md px-3 py-1.5 text-sm text-white transition-all duration-200 ease-in-out ${hasChanges ? "cursor-pointer bg-[#2d67b2] hover:bg-[#225597]" : "bg-[#84a4ce]"}`}
        >
          Update
        </button>
      </div>
    </div>
  );
}
