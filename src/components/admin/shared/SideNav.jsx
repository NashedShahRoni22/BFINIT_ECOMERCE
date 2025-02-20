import { Link } from "react-router";
import { sideNavLinks } from "../../../data/adminData/sideNavLinks";

export default function SideNav() {
  return (
    <aside className="min-h-[calc(100vh-55px)] max-w-60 min-w-30 bg-neutral-100 px-1 py-3">
      <nav className="flex flex-col gap-1.5">
        {sideNavLinks.map((link, i) => (
          <Link
            key={i}
            to={link.url}
            className="group flex gap-1 rounded-md p-1 px-3 text-sm capitalize transition-all duration-200 ease-in-out hover:bg-white"
          >
            <link.icon className="group-hover:text-primary text-xl" />
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
