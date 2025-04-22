import { Dialog, DialogPanel } from "@headlessui/react";

export default function ReusableModal({ children, isOpen, close, maxWidth }) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/25 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center py-5">
          <DialogPanel
            transition
            className={`w-full rounded-xl bg-white p-6 shadow-xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 ${maxWidth ? maxWidth : "max-w-md"}`}
          >
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
