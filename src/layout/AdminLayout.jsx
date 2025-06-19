import { useEffect, useState } from "react";
import { Outlet, ScrollRestoration } from "react-router";
import TopNav from "../components/admin/shared/TopNav";
import SideNav from "../components/admin/shared/SideNav";
import useTour from "../hooks/tour/useTour";

export default function AdminLayout() {
  const { addSteps, startTour } = useTour();
  const [showSideNav, setShowSideNav] = useState(false);

  useEffect(() => {
    addSteps();
    startTour("step-9");
  }, []);

  return (
    <>
      <TopNav showSideNav={showSideNav} setShowSideNav={setShowSideNav} />
      <main className={`font-inter relative flex`}>
        <SideNav showSideNav={showSideNav} />
        <div className="h-[calc(100dvh-55px)] w-full overflow-y-auto p-5">
          <Outlet />
        </div>
      </main>
      <ScrollRestoration />
    </>
  );
}
