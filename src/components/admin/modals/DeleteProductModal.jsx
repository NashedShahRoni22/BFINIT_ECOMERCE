import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../loaders/Spinner";
import useAuth from "../../../hooks/auth/useAuth";
import useDeleteMutation from "../../../hooks/mutations/useDeleteMutation";

export default function DeleteProductModal({ product, storeId, close }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // custom delete hook
  const { mutate, isPending } = useDeleteMutation({
    endpoint: `/product/delete/${product?.productId}`,
    token: user?.token,
  });

  //  handle sub-category delete
  const handleDelete = () => {
    mutate(null, {
      onSuccess: () => {
        queryClient.invalidateQueries(["products", storeId, user?.token]);
        toast.success("Product deleted!");
        close();
      },
      onError: () => {
        close();
        toast.error("Something went wrong!");
      },
    });
  };

  return (
    <>
      <h3 className="text-center text-base/7 font-medium">
        Confirm Product Delete
      </h3>

      <p className="mt-3 text-center text-sm text-neutral-600">
        Are you sure you want to delete{" "}
        <span className="font-medium text-red-600">{product?.productName}</span>
        ? This action cannot be undone.
      </p>

      {/* buttons */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={close}
          className="cursor-pointer rounded border border-neutral-200 bg-white px-4 py-1.5 text-sm/6 font-semibold text-neutral-600 transition-all duration-200 ease-in-out hover:bg-neutral-50 focus:outline-none"
        >
          Cancel
        </button>
        <button
          className="flex min-h-[38px] min-w-[75px] cursor-pointer items-center justify-center rounded border border-red-600 bg-red-600 px-4 py-1.5 text-sm/6 font-semibold text-white transition-all duration-200 ease-in-out hover:bg-red-700 focus:outline-none"
          onClick={handleDelete}
        >
          {isPending ? <Spinner /> : "Delete"}
        </button>
      </div>
    </>
  );
}
