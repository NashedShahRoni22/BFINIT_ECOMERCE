import { Suspense, useState } from "react";
import { Outlet } from "react-router";
import DashboardSidebar from "@/components/shared/DashboardSidebar";
import DashboardNavbar from "@/components/shared/DashboardNavbar";
import { sidebarItems } from "@/features/super-admin/config/sidebarItems";

export default function SuperAdminLayout() {
  const [showSideNav, setShowSideNav] = useState(false);

  const toggleSideNav = () => {
    setShowSideNav((prev) => !prev);
  };

  return (
    <>
      <DashboardNavbar
        showSideNav={showSideNav}
        setShowSideNav={setShowSideNav}
      />

      <div className="flex h-dvh pt-[55px]">
        {/* Sidebar */}
        <DashboardSidebar
          showSideNav={showSideNav}
          toggleSideNav={toggleSideNav}
          navItems={sidebarItems}
        />

        {/* Scrollable Content */}
        <div className="custom-scrollbar flex-1 overflow-y-auto rounded-2xl bg-[#F9FAFB] p-5">
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </>
  );
}
