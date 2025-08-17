import { useState, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import toast from "react-hot-toast";
import Spinner from "../loaders/Spinner";
import useAuth from "../../../hooks/auth/useAuth";
import useUpdateMutation from "../../../hooks/mutations/useUpdateMutation";

export default function UpdateModal({ isOpen, close, item, selectedStore }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const imgRef = useRef();
  const [imgPreview, setImgPreview] = useState(null);
  const [newName, setNewName] = useState("");

  // custom update hooks
  const { mutate, isPending } = useUpdateMutation({
    endpoint: `/category/update/${selectedStore?.storeId}/${item?.id}`,
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  // Image click
  const handleImageClick = () => {
    imgRef.current.click();
  };

  // Show currently selected image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgPreview(file);
  };

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setNewName(item.name);
      setImgPreview(null);
    }
  }, [isOpen, item.name]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setNewName("");
      setImgPreview(null);
      // Reset file input
      if (imgRef.current) {
        imgRef.current.value = "";
      }
    }
  }, [isOpen]);

  const hasTextChanges = newName !== item.name;
  const hasImageChanges = !!imgPreview;
  const hasValidText = newName.trim() !== "" && newName === newName.trim();

  // Enhanced close function to ensure state reset
  const handleClose = () => {
    setNewName("");
    setImgPreview(null);
    if (imgRef.current) {
      imgRef.current.value = "";
    }
    close();
  };

  // handle category update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateCategoryData = new FormData();
    updateCategoryData.append("categoryName", newName);
    updateCategoryData.append(
      "categoryImage",
      imgPreview || import.meta.env.VITE_BASE_URL + item.image,
    );

    mutate(updateCategoryData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["categories", selectedStore?.storeId]);
        toast.success("Category name updated!");
        handleClose();
      },
      onError: () => {
        handleClose();
        toast.error("Something went wrong!");
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={handleClose}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/25 backdrop-blur-sm">
        <form
          className="flex min-h-full items-center justify-center p-4"
          onSubmit={handleSubmit}
        >
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-center text-xl font-semibold text-neutral-800"
            >
              Update Category Info.
            </DialogTitle>

            {/* Image */}
            <div className="my-6 flex flex-col items-center">
              <div
                onClick={handleImageClick}
                className="group relative size-28 overflow-hidden rounded-full"
              >
                {imgPreview ? (
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src={URL.createObjectURL(imgPreview)}
                    alt={item?.name}
                    loading="lazy"
                  />
                ) : (
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src={`${import.meta.env.VITE_BASE_URL}${item.image}`}
                    alt={item?.name}
                    loading="lazy"
                  />
                )}
                <div className="absolute top-0 left-0 flex h-full w-full scale-75 cursor-pointer items-center justify-center rounded-full bg-black/50 text-sm font-medium text-white opacity-0 backdrop-blur-sm transition-all duration-200 ease-linear group-hover:scale-100 group-hover:opacity-100">
                  Upload
                </div>
              </div>

              <input
                ref={imgRef}
                onChange={handleImageChange}
                className="hidden"
                type="file"
                id="image"
                name="image"
                accept="image/*"
              />

              <p className="mt-2 text-xs text-neutral-500">
                {imgPreview ? "Click to change image" : "Click to upload image"}
              </p>
            </div>

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
              <button
                type="button"
                onClick={handleClose}
                className="cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold text-neutral-600 transition-all duration-200 ease-in-out hover:bg-neutral-100 focus:outline-none"
              >
                Cancel
              </button>
              <button
                className={`flex min-w-20 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ease-in-out focus:outline-none ${
                  !hasValidText || (!hasTextChanges && !hasImageChanges)
                    ? "cursor-not-allowed bg-neutral-100 text-neutral-400"
                    : "bg-dashboard-primary hover:bg-dashboard-primary/90 cursor-pointer text-white"
                }`}
                disabled={
                  !hasValidText || (!hasTextChanges && !hasImageChanges)
                }
                type="submit"
              >
                {isPending ? <Spinner /> : "Update"}
              </button>
            </div>
          </DialogPanel>
        </form>
      </div>
    </Dialog>
  );
}
