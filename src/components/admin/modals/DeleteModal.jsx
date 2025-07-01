import { useContext } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Spinner from "../loaders/Spinner";
import { AuthContext } from "../../../Providers/AuthProvider";
import useDeleteMutation from "../../../hooks/mutations/useDeleteMutation";

export default function DeleteModal({ isOpen, close, item, selectedStore }) {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // custom hooks to delete category
  const { mutate, isPending } = useDeleteMutation({
    endpoint: `/category/delete/${selectedStore?.storeId}/${item?.id}`,
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  // Handle the delete action
  const handleDelete = async () => {
    mutate(null, {
      onSuccess: () => {
        queryClient.invalidateQueries(["categories", selectedStore?.storeId]);
        toast.success("Category deleted!");
        close();
      },
      onError: () => {
        close();
        toast.error("Something went wrong!");
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/25 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-lg bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-center text-base/7 font-medium"
            >
              Delete Sub-Category
            </DialogTitle>

            <p className="mt-3 text-center text-sm text-neutral-600">
              Are you sure you want to delete{" "}
              <span className="font-medium text-red-600">{item.name}</span>?
              This action cannot be undone.
            </p>

            {/* buttons */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <Button
                onClick={close}
                className="cursor-pointer rounded border border-neutral-200 bg-white px-4 py-1.5 text-sm/6 font-semibold text-neutral-600 transition-all duration-200 ease-in-out hover:bg-neutral-50 focus:outline-none"
              >
                Cancel
              </Button>
              <button
                onClick={handleDelete}
                className="flex min-h-[38px] min-w-[75px] cursor-pointer items-center justify-center rounded border border-red-600 bg-red-600 px-4 py-1.5 text-sm/6 font-semibold text-white transition-all duration-200 ease-in-out hover:bg-red-700 focus:outline-none"
              >
                {isPending ? <Spinner /> : "Delete"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
