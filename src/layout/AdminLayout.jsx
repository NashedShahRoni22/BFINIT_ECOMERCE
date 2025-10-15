import { useEffect, useState } from "react";
import { Outlet, ScrollRestoration } from "react-router";
import TopNav from "../components/admin/shared/TopNav";
import SideNav from "../components/admin/shared/SideNav";

export default function AdminLayout() {
  const [showSideNav, setShowSideNav] = useState(false);

  const toggleSideNav = () => {
    setShowSideNav((prev) => !prev);
  };

  useEffect(() => {
    if (showSideNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showSideNav]);

  return (
    <div className="h-[100dvh] w-full overflow-hidden">
      {/* Fixed Top Bar */}
      <TopNav showSideNav={showSideNav} setShowSideNav={setShowSideNav} />

      {/* Layout Body (Sidebar + Main Content) */}
      <div className="flex h-[100dvh] pt-[55px]">
        {/* Sidebar */}
        <SideNav showSideNav={showSideNav} toggleSideNav={toggleSideNav} />

        {/* Scrollable Content */}
        <div className="custom-scrollbar flex-1 overflow-y-auto rounded-2xl bg-[#F9FAFB] p-5">
          <Outlet />
        </div>
      </div>

      <ScrollRestoration />
    </div>
  );
}
