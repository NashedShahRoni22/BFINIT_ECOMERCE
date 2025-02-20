import { PopoverPanel } from "@headlessui/react";

export default function NotificationDropdown() {
  return (
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
  );
}
