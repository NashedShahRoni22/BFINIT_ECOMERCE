import { quickNavigationLinks } from "@/utils/contstants";
import { Link } from "react-router";

export default function QuickNavs() {
  return (
    <div className="mt-4 grid w-full max-w-xl grid-cols-3 gap-4">
      {quickNavigationLinks.map((quickNav, index) => (
        <Link
          key={index}
          to={quickNav.url}
          className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-5"
        >
          <quickNav.icon size={24} className="text-dashboard-primary" />
          <p className="text-sm font-medium">{quickNav.name}</p>
        </Link>
      ))}
    </div>
  );
}
