import { useState } from "react";
import { Outlet } from "react-router";
import TopNav from "../components/admin/shared/TopNav";
import SideNav from "../components/admin/shared/SideNav";

export default function AdminLayout() {
  const [showSideNav, setShowSideNav] = useState(false);

  return (
    <>
      <TopNav showSideNav={showSideNav} setShowSideNav={setShowSideNav} />
      <main className={`font-inter relative flex`}>
        <SideNav showSideNav={showSideNav} />
        <div className="h-[calc(100dvh-55px)] w-full overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </>
  );
}
