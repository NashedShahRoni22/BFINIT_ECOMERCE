import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import NotificationDropdown from "../dropdowns/NotificationDropdown";
import AdminDropdown from "../dropdowns/AdminDropdown";
import TopNavStoreSelect from "../dropdowns/TopNavStoreSelect";
import logo from "../../../assets/logo/bfinit.png";

export default function TopNav({ showSideNav, setShowSideNav }) {
  return (
    <nav className="font-inter fixed top-0 z-50 flex w-full items-center justify-between border-b border-neutral-100 bg-white px-3 py-2 sm:px-5 sm:py-1.5">
      {/* mobile sidebar toggle */}
      <button
        onClick={() => setShowSideNav((prev) => !prev)}
        className="cursor-pointer rounded-md p-1.5 transition-colors hover:bg-neutral-50 lg:hidden"
        aria-label="Toggle sidebar"
      >
        {showSideNav ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <>
        {/* logo */}
        <Link to="/" className="hidden lg:block">
          <img src={logo} alt="bfinit logo" className="w-20 py-1" />
        </Link>

        <div className="hidden md:inline-block">
          <TopNavStoreSelect />
        </div>
      </>

      {/* mobile logo */}
      <Link to="/" className="lg:hidden">
        <img src={logo} alt="bfinit logo" className="w-16" />
      </Link>

      {/* notification & admin profile */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-4">
        {/* notification */}
        <NotificationDropdown />

        {/* admin profile */}
        <div className="hidden md:inline-block">
          <AdminDropdown />
        </div>
      </div>
    </nav>
  );
}
