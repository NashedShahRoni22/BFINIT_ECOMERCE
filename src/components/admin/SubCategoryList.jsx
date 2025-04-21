import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import ReusableModal from "./modals/ReusableModal";
import Spinner from "./loaders/Spinner";
import useUpdateMutation from "../../hooks/mutations/useUpdateMutation";
import useAuth from "../../hooks/auth/useAuth";

export default function SubCategoryList({ subCategory, categoryId, storeId }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState(subCategory);

  const isDisabled = updatedName === subCategory;

  // close modal
  const close = () => {
    setIsOpen(false);
  };

  const { mutate, isPending } = useUpdateMutation({
    endpoint: `/subcategory/update/${storeId}/${categoryId}`,
    token: user?.token,
  });

  // submit updated sub-category name
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      oldSubcategory: subCategory,
      newSubcategory: updatedName,
    };

    mutate(payload, {
      onSuccess: () => {
        toast.success("Sub-Category updated!");
        close();
        queryClient.invalidateQueries(["subCategories", storeId, categoryId]);
      },
      onError: () => {
        toast.error("Something went wrong!");
        close();
      },
    });
  };

  return (
    <>
      <li className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 text-neutral-700 last:border-b-0">
        <p className="min-w-fit">{subCategory}</p>

        <div className="flex items-center gap-4">
          <button>
            <FaRegEdit
              onClick={() => setIsOpen(true)}
              className="text-dashboard-primary/75 hover:text-dashboard-primary min-w-fit cursor-pointer text-lg transition-all duration-200 ease-in-out"
            />
          </button>

          <button>
            <FaRegTrashAlt className="min-w-fit cursor-pointer text-lg text-red-300 transition-all duration-200 ease-in-out hover:text-red-500" />
          </button>
        </div>
      </li>

      {/* update modal */}
      <ReusableModal isOpen={isOpen} close={close}>
        <h3 className="text-center text-xl font-semibold text-neutral-800">
          Update Sub-Category Info
        </h3>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="space-y-4">
            <label
              htmlFor="sub-category"
              className="inline-block text-sm text-neutral-600"
            >
              Current Name:{" "}
              <span className="font-medium text-neutral-800">
                {subCategory}
              </span>
            </label>
            <input
              type="text"
              name="sub-category"
              id="sub-category"
              placeholder={`Enter a new name for ${subCategory}`}
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              className="focus:border-dashboard-primary focus:ring-dashboard-primary/20 w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-800 transition-all duration-200 outline-none focus:ring-2"
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              className="cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold text-neutral-600 transition-all duration-200 ease-in-out hover:bg-neutral-100 focus:outline-none"
            >
              Cancel
            </button>
            <button
              className={`flex min-w-20 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ease-in-out focus:outline-none ${
                isDisabled
                  ? "cursor-not-allowed bg-neutral-100 text-neutral-400"
                  : "bg-dashboard-primary hover:bg-dashboard-primary/90 cursor-pointer text-white"
              }`}
              type="submit"
              disabled={isDisabled}
            >
              {isPending ? <Spinner /> : "Update"}
            </button>
          </div>
        </form>
      </ReusableModal>
    </>
  );
}
