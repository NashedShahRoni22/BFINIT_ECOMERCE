import { Outlet } from "react-router";
import TopNav from "../components/shared/TopNav";
import SideNav from "../components/shared/SideNav";

export default function Main() {
  return (
    <>
      <TopNav />
      <main className="font-inter flex">
        <SideNav />
        <Outlet />
      </main>
    </>
  );
}
