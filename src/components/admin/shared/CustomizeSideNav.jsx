export default function CustomizeSideNav({
  componentLinks,
  toggleDropdown,
  openDropdown,
  selectedComponents,
  onCheckboxChange,
}) {
  return (
    <div
      className={`absolute h-[calc(100dvh-55px)] bg-neutral-100 transition-all duration-300 ease-in-out md:px-4 md:py-2 lg:static lg:w-1/6 lg:translate-x-0`}
    >
      {componentLinks.map((link, i) => (
        <div key={i}>
          {link.subCategories ? (
            <div>
              <button
                className={`w-full cursor-pointer rounded-md px-4 py-2 text-left text-sm capitalize transition-all duration-200 ease-in-out hover:bg-white ${
                  openDropdown === i && "bg-white"
                }`}
                onClick={() => toggleDropdown(i)}
              >
                {link.name}
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
  );
}
