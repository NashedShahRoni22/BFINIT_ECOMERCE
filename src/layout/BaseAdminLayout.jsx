import TopNav from "../components/admin/shared/TopNav";

export default function BaseAdminLayout({ children }) {
  return (
    <>
      <TopNav />
      <main className="font-inter relative flex">{children}</main>
    </>
  );
}
