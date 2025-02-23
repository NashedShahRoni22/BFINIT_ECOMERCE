import { Link } from "react-router";
import { sideNavLinks } from "../../../data/adminData/sideNavLinks";

export default function SideNav({showSideNav}) {
  return (
    <aside className={`h-screen absolute bg-neutral-100 transition-all duration-300 ease-in-out md:px-4 lg:translate-x-0 md:py-2 lg:static lg:w-1/6 ${showSideNav ? 'translate-x-0 w-1/2 md:w-1/3' : '-translate-x-[1000%]'}`}>
      <nav className="flex flex-col gap-1.5">
        {sideNavLinks.map((link, i) => (
          <Link
            key={i}
            to={link.url}
            className="group flex gap-1 rounded-md py-2 px-4 text-sm capitalize transition-all duration-200 ease-in-out hover:bg-white"
          >
            <link.icon className="group-hover:text-primary text-2xl min-w-fit" />
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
