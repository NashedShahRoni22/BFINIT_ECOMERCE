import { Suspense, useEffect, useState } from "react";
import { Outlet, ScrollRestoration } from "react-router";
import DashboardNavbar from "@/components/shared/DashboardNavbar";
import DashboardSidebar from "@/components/shared/DashboardSidebar";
import { superAdminNavGroups } from "@/features/super-admin/config/superAdminNavGroups";

export default function SuperAdminLayout() {
  const [showSideNav, setShowSideNav] = useState(false);

  const toggleSideNav = () => {
    setShowSideNav((prev) => !prev);
  };

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="font-inter h-dvh w-full overflow-hidden">
      <DashboardNavbar
        showSideNav={showSideNav}
        setShowSideNav={setShowSideNav}
      />

      <div className="flex h-dvh pt-[55px]">
        {/* Sidebar */}
        <DashboardSidebar
          showSideNav={showSideNav}
          toggleSideNav={toggleSideNav}
          navGroups={superAdminNavGroups}
        />

        {/* Scrollable Content */}
        <div className="custom-scrollbar flex-1 overflow-y-auto rounded-2xl bg-[#F9FAFB] p-5">
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </div>

      <ScrollRestoration />
    </div>
  );
}
