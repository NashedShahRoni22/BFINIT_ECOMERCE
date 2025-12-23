import { Outlet } from "react-router";
import StorefrontLoader from "@/components/storefront/loader/StorefrontLoader";
import Footer from "@/components/storefront/Footer";
import Header from "@/components/storefront/Header";
import useTheme from "@/hooks/useTheme";

export default function StorefrontLayout() {
  const { isLoading } = useTheme();

  if (isLoading) return <StorefrontLoader />;

  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}
