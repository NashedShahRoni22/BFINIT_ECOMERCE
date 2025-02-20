import { Link } from "react-router";
import { PopoverPanel } from "@headlessui/react";
import { MdOutlineManageAccounts, MdOutlineLogout } from "react-icons/md";
import { adminDropdownLinks } from "../../../data/adminData/adminDropdownLinks";

export default function AdminDropdown() {
  return (
    <PopoverPanel
      transition
      anchor="bottom"
      className="!top-[60px] !right-5 !left-auto flex flex-col gap-2 rounded-lg border border-neutral-100 bg-white px-0.5 text-sm text-black shadow-lg transition duration-200 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
    >
      {/* name, email & account manage */}
      <div className="space-y-1.5 border-b border-neutral-100 pt-3 pb-1.5">
        <div className="px-3">
          <p className="font-semibold">Sore Noe</p>
          <p className="text-neutral-500">soreno5014@btcours.com</p>
        </div>

        <Link
          to="/accounts"
          className="group flex items-center gap-1 rounded-md p-1 px-3 text-sm capitalize transition-all duration-200 ease-in-out hover:bg-neutral-100"
        >
          <MdOutlineManageAccounts className="group-hover:text-primary text-xl" />
          <span>Manage Account</span>
        </Link>
      </div>

      {/* nav links */}
      {adminDropdownLinks.map((link, i) => (
        <Link
          key={i}
          to={link.url}
          className="group flex items-center gap-1 rounded-md p-1 px-3 text-sm capitalize transition-all duration-200 ease-in-out hover:bg-neutral-100"
        >
          <link.icon className="group-hover:text-primary text-xl" />
          {link.name}
        </Link>
      ))}

      {/* logout */}
      <div className="border-t border-neutral-100 py-2">
        <button className="group flex w-full cursor-pointer items-center gap-1 rounded-md p-1 px-3 text-sm capitalize transition-all duration-200 ease-in-out hover:bg-neutral-100">
          <MdOutlineLogout className="group-hover:text-primary text-xl" /> Log
          Out
        </button>
      </div>
    </PopoverPanel>
  );
}
