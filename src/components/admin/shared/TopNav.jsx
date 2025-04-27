import { Link } from "react-router";
import { Popover, PopoverButton, PopoverGroup } from "@headlessui/react";
import {
  MdOutlineClose,
  MdOutlineMenu,
  MdOutlineNotifications,
} from "react-icons/md";
import logo from "../../../assets/logo/bfinit.png";
import AdminDropdown from "../dropdowns/AdminDropdown";
import NotificationDropdown from "../dropdowns/NotificationDropdown";

export default function TopNav({ showSideNav, setShowSideNav }) {
  return (
    <nav className="font-inter flex items-center justify-between border-b border-neutral-100 px-5 py-2">
      {/* mobile sidebar toggle */}
      <button
        onClick={() => setShowSideNav((prev) => !prev)}
        className="cursor-pointer lg:hidden"
      >
        {showSideNav ? (
          <MdOutlineClose className="text-2xl" />
        ) : (
          <MdOutlineMenu className="text-2xl" />
        )}
      </button>

      {/* logo */}
      <Link to="/" className="hidden lg:block">
        <img src={logo} alt="bfinint logo" className="w-24" />
      </Link>

      {/* notification & admin profile */}
      <PopoverGroup className="flex items-center justify-center gap-4">
        {/* notification */}
        <Popover className="group">
          <PopoverButton className="cursor-pointer rounded-lg border border-transparent p-1.5 transition-all duration-200 ease-linear outline-none group-data-[open]:border-neutral-100 group-data-[open]:bg-neutral-50 hover:border-neutral-100 hover:bg-neutral-50">
            <MdOutlineNotifications className="text-xl" />
          </PopoverButton>

          <NotificationDropdown />
        </Popover>

        {/* admin profile */}
        <Popover className="group">
          {({ close }) => (
            <>
              <PopoverButton className="flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-transparent p-1.5 transition-all duration-200 ease-linear outline-none group-data-[open]:border-neutral-100 group-data-[open]:bg-neutral-50 hover:border-neutral-100 hover:bg-neutral-50">
                <div className="bg-dashboard-primary flex size-6 items-center justify-center rounded-lg p-0.5 text-xs font-medium text-white">
                  MS
                </div>
                <p className="text-sm">My Store</p>
              </PopoverButton>

              <AdminDropdown close={close} />
            </>
          )}
        </Popover>
      </PopoverGroup>
    </nav>
  );
}
