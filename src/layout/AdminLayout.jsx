import { useState } from "react";
import { Outlet, ScrollRestoration } from "react-router";
import TopNav from "../components/admin/shared/TopNav";
import SideNav from "../components/admin/shared/SideNav";

export default function AdminLayout() {
  const [showSideNav, setShowSideNav] = useState(false);

  return (
    <>
      <div className="md:sticky md:top-0 md:z-20 md:bg-white">
        <TopNav showSideNav={showSideNav} setShowSideNav={setShowSideNav} />
      </div>
      <main className="font-inter relative flex">
        <div className="md:sticky md:top-[55px] md:h-[calc(100dvh-55px)]">
          <SideNav showSideNav={showSideNav} setShowSideNav={setShowSideNav} />
        </div>
        <div className="min-h-[calc(100dvh-55px)] w-full bg-[#F9FAFB] p-5">
          <Outlet />
        </div>
      </main>
      <ScrollRestoration />
    </>
  );
}
