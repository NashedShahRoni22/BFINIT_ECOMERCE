import { quickNavigationLinks } from "../../../data/adminData/quickNavigationLinks";
import { Link } from "react-router";

export default function QuickNavs() {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:justify-start">
      {quickNavigationLinks.map((quickNav, index) => (
        <Link
          key={index}
          className="flex size-[120px] flex-col items-center justify-center gap-2.5 rounded p-2 shadow"
        >
          <quickNav.icon className="text-dashboard-primary text-4xl" />
          <p className="text-sm">{quickNav.name}</p>
        </Link>
      ))}
    </div>
  );
}
