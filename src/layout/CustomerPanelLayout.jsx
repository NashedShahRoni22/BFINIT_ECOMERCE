import { Link, Outlet, useLocation, useParams } from "react-router";
import { LogOut, ShoppingBag, User } from "lucide-react";
import Container from "../components/site/shared/Container";

const userPanelNavLinks = [
  {
    icon: User,
    label: "Profile",
    url: "account",
  },
  {
    icon: ShoppingBag,
    label: "Orders",
    url: "account/orders",
  },
  {
    icon: LogOut,
    label: "Logout",
  },
];

export default function CustomerPanelLayout() {
  const { storeId } = useParams();
  const location = useLocation();

  const isActiveLink = (url) => {
    const currentPath = location.pathname;
    const linkPath = `/preview/${storeId}/${url}`;
    return currentPath === linkPath;
  };

  return (
    <Container>
      <section className="flex gap-6 py-10 md:flex-row">
        {/* Sidebar Navigation */}
        <div className="sticky top-20 h-fit space-y-4 rounded-lg border border-gray-200 p-4 lg:w-64">
          <h2 className="text-lg font-semibold">My Account</h2>
          {userPanelNavLinks.map((navItem, i) =>
            navItem.url ? (
              <Link
                key={i}
                to={`/preview/${storeId}/${navItem.url}`}
                className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm ${isActiveLink(navItem.url) && "bg-accent/10 text-accent"}`}
              >
                <navItem.icon size={18} />
                <span>{navItem.label}</span>
              </Link>
            ) : (
              <button
                key={i}
                className="flex items-center gap-2 px-2.5 py-1.5 text-sm"
              >
                <navItem.icon size={18} />
                <span>{navItem.label}</span>
              </button>
            ),
          )}
        </div>

        <div className="flex-1">
          <Outlet />
        </div>
      </section>
    </Container>
  );
}
