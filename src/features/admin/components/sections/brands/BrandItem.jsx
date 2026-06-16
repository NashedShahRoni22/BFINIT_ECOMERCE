import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { Check, Pencil, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ConfirmationDialog from "../../modals/ConfirmationDialog";
import useSelectedStore from "@/hooks/useSelectedStore";
import usePatchMutation from "@/hooks-v2/api/usePatchMutation";
import useDeleteMutation from "@/hooks-v2/api/useDeleteMutation";
import { getImgUrl } from "@/utils/getImgUrl";
import { cn } from "@/lib/utils";

export default function BrandItem({ brand }) {
  const { id, name, image } = brand;

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const queryClient = useQueryClient();
  const { activeStore } = useSelectedStore();

  const imageRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [editedName, setEditedName] = useState(name);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const imgSrc = newImage?.preview || getImgUrl(image);

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

  const { mutate: update, isPending: isUpdating } = usePatchMutation({
    endpoint: `/api/v1/brand/${id}`,
    isTokenRequired: true,
  });

  const handleUpdate = () => {
    if (!editedName.trim()) {
      toast.error("Brand name cannot be empty");
      return;
    }

    const payload = new FormData();
    payload.append("name", editedName.trim());
    payload.append("store_id", activeStore?.id);
    if (newImage?.file) {
      payload.append("image", newImage.file);
    }

    update(payload, {
      onSuccess: (data) => {
        if (!data?.success) {
          return toast.error(data?.message);
        }
        setIsEditing(false);
        setNewImage(null);
        toast.success(data?.message);
        queryClient.invalidateQueries(["brands", activeStore?.id, page]);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const { mutate: remove, isPending: isDeleting } = useDeleteMutation({
    endpoint: `/api/v1/brand/${id}`,
    isTokenRequired: true,
  });

  const handleDelete = () => {
    remove(null, {
      onSuccess: (data) => {
        if (!data?.success) {
          return toast.error(data?.message);
        }
        toast.success(data?.message);
        queryClient.invalidateQueries(["brands", activeStore?.id, page]);
      },

      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <div className="hover:bg-accent/50 flex items-center justify-between rounded-lg border p-3 transition-colors">
        <div className="flex items-center gap-3">
          <div className="bg-muted group relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border transition-colors">
            {/* image */}
            <img
              src={imgSrc}
              alt={name}
              className="h-full w-full object-contain"
            />

            {isEditing && (
              <button
                onClick={handleImgUpload}
                type="button"
                disabled={isUpdating}
                className={cn(
                  "bg-foreground/60 absolute inset-0 flex items-center justify-center rounded-md opacity-0 transition-opacity",
                  !isUpdating && "cursor-pointer group-hover:opacity-100",
                )}
              >
                <Pencil className="h-3.5 w-3.5 text-white" />
              </button>
            )}
          </div>

          {isEditing ? (
            <>
              <Input
                disabled={isUpdating}
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

        <div className="shrink-0 items-center">
          {isEditing ? (
            <>
              <Button
                onClick={handleUpdate}
                disabled={isUpdating}
                variant="icon"
                className="text-success"
              >
                <Check />
              </Button>

              <Button
                onClick={toggleEditing}
                disabled={isUpdating}
                variant="icon"
                className="text-destructive"
              >
                <X />
              </Button>
            </>
          ) : (
            <>
              <Button onClick={toggleEditing} variant="icon">
                <Pencil />
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
        title="Delete Brand?"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-medium">&quot;{name}&quot;</span>? This action
            cannot be undone.
          </>
        }
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteOpen(false)}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
        loadingText="Deleting"
        variant="destructive"
      />
    </>
  );
}
