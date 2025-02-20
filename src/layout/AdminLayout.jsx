import { Outlet } from "react-router";
import TopNav from "../components/admin/shared/TopNav";
import SideNav from "../components/admin/shared/SideNav";

export default function AdminLayout() {
  return (
    <>
      <TopNav />
      <main className="font-inter flex">
        <SideNav />
        <div className="w-full">
          <Outlet />
        </div>
      </main>
    </>
  );
}
