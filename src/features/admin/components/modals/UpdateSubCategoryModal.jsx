import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import useAuth from "@/hooks/auth/useAuth";
import useUpdateMutation from "@/hooks/api/useUpdateMutation";

export default function UpdateSubCategoryModal({
  subCategory,
  updatedName,
  setUpdatedName,
  close,
  categoryId,
  storeId,
}) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Initialize the input with current subcategory name on mount
  useEffect(() => {
    setUpdatedName(subCategory);
  }, [subCategory, setUpdatedName]);

  // Enhanced validation logic
  const trimmedName = updatedName.trim();
  const hasValidText = trimmedName !== "" && updatedName === trimmedName;
  const hasTextChanges = updatedName !== subCategory;
  const isDisabled = !hasValidText || !hasTextChanges;

  // custom update hooks
  const { mutate, isPending } = useUpdateMutation({
    endpoint: `/subcategory/update/${storeId}/${categoryId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  // Enhanced close function to reset state
  const handleClose = () => {
    setUpdatedName("");
    close();
  };

  // submit updated sub-category name
  const handleSubmit = (e) => {
    e.preventDefault();

    // Additional validation before submission
    if (!hasValidText) {
      toast.error("Sub-category name cannot be empty or have extra spaces!");
      return;
    }

    const payload = {
      oldSubcategory: subCategory,
      newSubcategory: trimmedName,
    };

    mutate(payload, {
      onSuccess: () => {
        toast.success("Sub-Category updated!");
        handleClose();
        queryClient.invalidateQueries(["subCategories", storeId, categoryId]);
      },
      onError: () => {
        toast.error("Something went wrong!");
        handleClose();
      },
    });
  };

  return (
    <>
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
            <span className="font-medium text-neutral-800">{subCategory}</span>
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

          {/* Optional: Show validation errors */}
          {updatedName && !hasValidText && (
            <p className="text-xs text-red-500">
              {trimmedName === ""
                ? "Name cannot be empty"
                : "Remove extra spaces from the beginning or end"}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            className="cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold text-neutral-600 transition-all duration-200 ease-in-out hover:bg-neutral-100 focus:outline-none"
            type="button"
            onClick={handleClose}
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
    </>
  );
}
