import { useEffect, useState } from "react";
import { Outlet, ScrollRestoration } from "react-router";
import AdminNavbar from "@/features/admin/components/layout/AdminNavbar";
import AdminSidebar from "@/features/admin/components/layout/AdminSidebar";
import StoreSelectionModal from "@/features/admin/components/modals/StoreSelectionModal";

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
      <AdminNavbar showSideNav={showSideNav} setShowSideNav={setShowSideNav} />

      {/* Layout Body (Sidebar + Main Content) */}
      <div className="flex h-dvh pt-[55px]">
        {/* Sidebar */}
        <AdminSidebar showSideNav={showSideNav} toggleSideNav={toggleSideNav} />

        {/* Scrollable Content */}
        <div className="custom-scrollbar flex-1 overflow-y-auto rounded-2xl bg-[#F9FAFB] p-5">
          <Outlet />
        </div>
      </div>

      <ScrollRestoration />
    </div>
  );
}
