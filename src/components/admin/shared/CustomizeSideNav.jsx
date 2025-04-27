import { Link, useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Spinner from "../loaders/Spinner";
import useAuth from "../../../hooks/auth/useAuth";
import useUpdateMutation from "../../../hooks/mutations/useUpdateMutation";
import { componentLinks } from "../../../data/adminData/componentLinks";

export default function CustomizeSideNav({
  showSideNav,
  toggleDropdown,
  openDropdown,
  selectedComponents,
  onCheckboxChange,
  hasChanges,
}) {
  const { user } = useAuth();
  const { storeId } = useParams();
  const queryClient = useQueryClient();

  // pass store preference update info
  const { mutate, isPending } = useUpdateMutation({
    endpoint: `/store/update/preference/${storeId}`,
    token: user?.token,
  });

  // handle update store preference
  const handleUpateStorePreference = () => {
    // this filtered out the selectedComponents value. from this nav1 to 1. Just passing only number.
    const selectedValue = Object.fromEntries(
      Object.entries(selectedComponents).map(([key, value]) => {
        // Extract the number from the end of the string
        const number = value.match(/\d+$/)?.[0] || "";
        return [key, number];
      }),
    );

    const updatePaylod = {
      navbarStyle: selectedValue.navbarStyle || "0",
      sliderStyle: selectedValue.sliderStyle || "0",
      categoryStyle: selectedValue.categoryStyle || "0",
      highlightStyle: selectedValue.highlightStyle || "0",
      productStyle: selectedValue.productStyle || "0",
      bannerStyle: selectedValue.bannerStyle || "0",
      footerStyle: selectedValue.footerStyle || "0",
      storeTheme: selectedValue.themeStyle,
    };

    mutate(updatePaylod, {
      onSuccess: (data) => {
        if (data.message === "store Preference  updated successfully") {
          queryClient.invalidateQueries(["storePreference", storeId]);
          toast.success("Store layout updated!");
        }
      },
      onError: (error) => {
        toast.error("Something went wrong!");
        console.error(error);
      },
    });
  };

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
                  {link.title}
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
                          name={link.name}
                          id={subLink.value}
                          checked={
                            selectedComponents[link.name] === subLink.value
                          }
                          onChange={() =>
                            onCheckboxChange(link.name, subLink.value)
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
                  id={link.name}
                  checked={selectedComponents[link.name]}
                  onChange={() =>
                    onCheckboxChange(link.name, !selectedComponents[link.name])
                  }
                />
                <label htmlFor={link.name}>{link.name}</label>
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
          className={`flex min-h-8 min-w-[72px] items-center justify-center rounded-md px-3 py-1.5 text-sm text-white transition-all duration-200 ease-in-out ${hasChanges || isPending ? "cursor-pointer bg-[#2d67b2] hover:bg-[#225597]" : "bg-[#84a4ce]"}`}
          disabled={!hasChanges}
          onClick={handleUpateStorePreference}
        >
          {isPending ? <Spinner /> : "Update"}
        </button>
      </div>
    </div>
  );
}
