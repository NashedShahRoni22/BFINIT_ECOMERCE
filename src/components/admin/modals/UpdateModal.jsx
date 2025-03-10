import { useState, useEffect } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function UpdateModal({ isOpen, close, item }) {
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (isOpen) {
      console.log("Current Sub-Category Name:", item.name);
      setNewName(item.name);
    }
  }, [isOpen, item.name]);

  // Handle the update action
  const handleUpdate = () => {
    console.log("Updated Sub-Category Name:", newName);
    close();
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/25">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-center text-xl font-semibold text-neutral-800"
            >
              Update Sub-Category Name
            </DialogTitle>

            <div className="mt-6 space-y-4">
              <p className="text-sm text-neutral-600">
                Current Name:{" "}
                <span className="font-medium text-neutral-800">
                  {item.name}
                </span>
              </p>
              <input
                type="text"
                name="new-sub-category"
                id="new-sub-category"
                placeholder={`Enter a new name for ${item.name}`}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="focus:border-dashboard-primary focus:ring-dashboard-primary/20 w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-800 transition-all duration-200 outline-none focus:ring-2"
              />
            </div>

            {/* buttons */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <Button
                onClick={close}
                className="cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold text-neutral-600 transition-all duration-200 ease-in-out hover:bg-neutral-100 focus:outline-none"
              >
                Cancel
              </Button>
              <Button
                disabled={newName === item.name}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ease-in-out focus:outline-none ${
                  newName === item.name
                    ? "cursor-not-allowed bg-neutral-100 text-neutral-400"
                    : "bg-dashboard-primary hover:bg-dashboard-primary/90 cursor-pointer text-white"
                }`}
                onClick={handleUpdate}
              >
                Update
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
