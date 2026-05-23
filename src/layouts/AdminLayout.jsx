import { useEffect, useState } from "react";
import { Outlet, ScrollRestoration } from "react-router";
import DashboardNavbar from "@/components/shared/DashboardNavbar";
import DashboardSidebar from "@/components/shared/DashboardSidebar";
import StoreSelectionModal from "@/features/admin/components/modals/StoreSelectionModal";
import { adminNavGroups } from "@/features/admin/config/adminNavGroups";

export default function AdminLayout() {
  const [showSideNav, setShowSideNav] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const toggleSideNav = () => {
    setShowSideNav((prev) => !prev);
  };

  return (
    <div className="font-inter h-dvh w-full overflow-hidden">
      {/* Store Selection Modal */}
      <StoreSelectionModal />

      {/* Fixed Top Bar */}
      <DashboardNavbar
        showSideNav={showSideNav}
        setShowSideNav={setShowSideNav}
      />

      {/* Layout Body (Sidebar + Main Content) */}
      <div className="flex h-dvh pt-[55px]">
        {/* Sidebar */}
        <DashboardSidebar
          showSideNav={showSideNav}
          toggleSideNav={toggleSideNav}
          navGroups={adminNavGroups}
        />

        {/* Scrollable Content */}
        <div className="custom-scrollbar bg-muted/50 flex-1 overflow-y-auto rounded-2xl p-5">
          <Outlet />
        </div>
      </div>

      <ScrollRestoration />
    </div>
  );
}
