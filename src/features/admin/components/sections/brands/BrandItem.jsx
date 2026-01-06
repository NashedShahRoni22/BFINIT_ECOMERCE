import { useEffect, useRef, useState } from "react";
import { Check, Edit2, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSelectedStore from "@/hooks/useSelectedStore";
import useUpdateMutation from "@/hooks/api/useUpdateMutation";
import { baseUrl } from "@/utils/api";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmationDialog from "../../modals/ConfirmationDialog";
import useDeleteMutation from "@/hooks/api/useDeleteMutation";

export default function BrandItem({ brand }) {
  const { id, name, image } = brand;

  const queryClient = useQueryClient();
  const { selectedStore } = useSelectedStore();

  const { mutate, isPending } = useUpdateMutation({
    endpoint: `/brand/update/${selectedStore?.storeId}/${id}`,
    token: true,
    clientId: true,
  });

  const { mutate: deleteMutate, isPending: isDeletePending } =
    useDeleteMutation({
      endpoint: `/brand/delete/${selectedStore?.storeId}/${id}`,
      token: true,
      clientId: true,
    });

  const imageRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [editedName, setEditedName] = useState(name);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    return () => {
      if (newImage?.preview) {
        URL.revokeObjectURL(newImage.preview);
      }
    };
  }, [newImage]);

  const toggleEditing = () => {
    if (isEditing) {
      setEditedName(name);
      setNewImage(null);
    }
    setIsEditing((prev) => !prev);
  };

  const handleImgUpload = () => {
    imageRef.current.click();
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    if (file.size > 2000 * 1024) {
      return toast.error("File size must be less than 2MB");
    }

    if (newImage?.preview) {
      URL.revokeObjectURL(newImage.preview);
    }

    const imgData = {
      file: file,
      preview: URL.createObjectURL(file),
    };

    setNewImage(imgData);
  };

  const handleUpdateBrand = () => {
    if (!editedName.trim()) {
      toast.error("Brand name cannot be empty");
      return;
    }

    const brandPayload = new FormData();
    brandPayload.append("brandName", editedName.trim());

    if (newImage?.file) {
      brandPayload.append("brandImage", newImage.file);
    }

    mutate(brandPayload, {
      onSuccess: () => {
        queryClient.invalidateQueries(["brands", selectedStore?.storeId]);
        toast.success("Brand updated successfully!");
        setIsEditing(false);
        setNewImage(null);
      },
      onError: () => {
        toast.error("Failed to update brand");
      },
    });
  };

  const handleBrandDelete = () => {
    deleteMutate(null, {
      onSuccess: () => {
        queryClient.invalidateQueries(["brands", selectedStore?.storeId]);
        toast.success("Brand deleted!");
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    });
  };

  const currentImageSrc = newImage?.preview || `${baseUrl}${image}`;

  return (
    <>
      <div className="hover:bg-accent/50 flex items-center justify-between rounded-lg border p-3 transition-colors">
        <div className="flex items-center gap-3">
          <div className="bg-muted group relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border transition-colors">
            {/* image */}
            <img
              src={currentImageSrc}
              alt={name}
              className="h-full w-full object-contain"
            />

            {isEditing && (
              <button
                onClick={handleImgUpload}
                type="button"
                disabled={isPending}
                className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-md bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Edit2 className="h-3.5 w-3.5 text-white" />
              </button>
            )}
          </div>

          {isEditing ? (
            <>
              <Input
                disabled={isPending}
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="text-sm"
              />
              <Input
                ref={imageRef}
                onChange={handleImgChange}
                type="file"
                accept="image/png,image/jpg,image/jpeg,image/webp"
                className="hidden"
              />
            </>
          ) : (
            <p className="text-sm">{name}</p>
          )}
        </div>

        <div className="shrink-0">
          {isEditing ? (
            <>
              <Button
                onClick={handleUpdateBrand}
                disabled={isPending}
                variant="icon"
                className="text-success"
              >
                <Check />
              </Button>

              <Button
                onClick={toggleEditing}
                disabled={isPending}
                variant="icon"
                className="text-destructive"
              >
                <X />
              </Button>
            </>
          ) : (
            <>
              <Button onClick={toggleEditing} variant="icon">
                <Edit2 />
              </Button>

              <Button
                onClick={() => setIsDeleteOpen(true)}
                variant="icon"
                className="text-destructive"
              >
                <Trash2 />
              </Button>
            </>
          )}
        </div>
      </div>

      <ConfirmationDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete brand?"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-medium">&quot;{name}&quot;</span>? This action
            cannot be undone.
          </>
        }
        onConfirm={handleBrandDelete}
        onCancel={() => setIsDeleteOpen(false)}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeletePending}
        loadingText="Deleting"
        variant="destructive"
      />
    </>
  );
}
