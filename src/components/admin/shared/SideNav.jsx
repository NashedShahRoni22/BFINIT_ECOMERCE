import { Link } from "react-router";
import { sideNavLinks } from "../../../data/adminData/sideNavLinks";

export default function SideNav({ showSideNav }) {
  return (
    <aside
      className={`absolute h-[calc(100dvh-55px)] bg-neutral-100 transition-all duration-300 ease-in-out md:px-4 md:py-2 lg:static lg:w-1/6 lg:translate-x-0 ${showSideNav ? "w-1/2 translate-x-0 md:w-1/3" : "-translate-x-[1000%]"}`}
    >
      <nav className="flex flex-col gap-1.5">
        {sideNavLinks.map((link, i) => (
          <Link
            key={i}
            to={link.url}
            className="group flex gap-1 rounded-md px-4 py-2 text-sm capitalize transition-all duration-200 ease-in-out hover:bg-white"
          >
            <link.icon className="text-primary text-2xl" />
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
