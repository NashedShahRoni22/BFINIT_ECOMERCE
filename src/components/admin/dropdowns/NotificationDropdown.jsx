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
        <h5 className="text-xl font-semibold">Notifications</h5>
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className={`mt-2.5 flex items-center gap-2.5 border-b border-neutral-200 pb-2.5`}
          >
            <span className="rounded-full bg-blue-100 p-2 shadow">
              <FaRegBell className="text-dashboard-primary text-xl" />
            </span>
            <div>
              <p className="font-semibold">New Order!</p>
              <p className="">
                Macbook m2 air 8/256 gb have ordered by User name
              </p>
            </div>
          </div>
        ))}
      </div>
    </PopoverPanel>
  );
}
