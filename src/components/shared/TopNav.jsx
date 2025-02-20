import { Link } from "react-router";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { MdOutlineNotifications } from "react-icons/md";
import logo from "../../assets/logo/bfinit.png";
import { mystoreLinks } from "../../data.js/mystoreLinks";

export default function TopNav() {
  return (
    <nav className="font-inter flex items-center justify-between border-b border-neutral-100 px-5 py-2">
      {/* logo */}
      <Link to="/">
        <img src={logo} alt="bfinint logo" className="w-24" />
      </Link>

      {/* notification &  */}
      <PopoverGroup className="flex items-center justify-center gap-4">
        <Popover className="group">
          <PopoverButton className="cursor-pointer rounded-lg border border-transparent p-1.5 transition-all duration-200 ease-linear outline-none group-data-[open]:border-neutral-100 group-data-[open]:bg-neutral-50 hover:border-neutral-100 hover:bg-neutral-50">
            <MdOutlineNotifications className="text-xl" />
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className="!top-[60px] !right-5 !left-auto rounded-lg border border-neutral-100 bg-white text-sm text-black transition duration-200 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
          >
            <div className="p-3">
              <a
                className="block rounded-lg px-3 py-2 transition hover:bg-white/5"
                href="#"
              >
                <p className="font-semibold">Notification PopOver</p>
                <p className="">Start integrating products and tools</p>
              </a>
            </div>
          </PopoverPanel>
        </Popover>

        <Popover className="group">
          <PopoverButton className="flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-transparent p-1.5 transition-all duration-200 ease-linear outline-none group-data-[open]:border-neutral-100 group-data-[open]:bg-neutral-50 hover:border-neutral-100 hover:bg-neutral-50">
            <div className="bg-primary flex size-6 items-center justify-center rounded-lg p-0.5 text-xs font-medium text-white">
              MS
            </div>
            <p className="text-sm">My Store</p>
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className="!top-[60px] !right-5 !left-auto flex flex-col gap-2 rounded-lg border border-neutral-100 bg-white text-sm text-black shadow-lg transition duration-200 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
          >
            {/* name & email */}
            <div className="border-b border-neutral-100 p-3">
              <p>Sore Noe</p>
              <p>soreno5014@btcours.com</p>
            </div>
            {mystoreLinks.map((link, i) => (
              <Link
                key={i}
                to={link.url}
                className={`${link.icon && "flex items-center gap-1"} rounded-md p-1 px-3 text-sm capitalize hover:bg-neutral-100`}
              >
                {link.icon && <link.icon className="text-xl" />}{" "}
                <span>{link.name}</span>
              </Link>
            ))}
          </PopoverPanel>
        </Popover>
      </PopoverGroup>
    </nav>
  );
}
