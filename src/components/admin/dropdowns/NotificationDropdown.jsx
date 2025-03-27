import { PopoverPanel } from "@headlessui/react";
import { FaRegBell } from "react-icons/fa";

export default function NotificationDropdown() {
  return (
    <PopoverPanel
      transition
      anchor="bottom"
      className="!top-[60px] !right-5 !left-auto w-[300px] rounded-lg border border-neutral-100 bg-white text-sm text-black transition duration-200 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
    >
      <div className="p-3">
        <h5 className="font-semibold text-xl">Notifications</h5>
        {Array.from({ length: 5 }, (_, i) => (
          <div className={`flex items-center gap-2.5 mt-2.5 pb-2.5 border-b border-neutral-200`}>
            <span className="rounded-full p-2 shadow bg-blue-100">
              <FaRegBell className="text-xl text-dashboard-primary" />
            </span>
            <div>
              <p className="font-semibold">New Order!</p>
              <p className="">Macbook m2 air 8/256 gb have ordered by User name</p>
            </div>
          </div>
        ))}
      </div>
    </PopoverPanel>
  );
}
