import { useState } from "react";
import toast from "react-hot-toast";
import { Plus, Upload, X } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function GalleryImages({ form }) {
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const maxFileSize = 300 * 1024; // 300KB
  const maxImages = 8; // Maximum number of gallery images

  const handleFiles = (files, currentGallery, onChange, targetIndex = null) => {
    const validFiles = Array.from(files).filter((file) => {
      const isValidType = file.type.startsWith("image/");
      const isValidSize = file.size <= maxFileSize;
      return isValidType && isValidSize;
    });

    if (validFiles.length === 0) {
      toast.error("Please select valid image files (max 300KB each)");
      return;
    }

    const newImages = validFiles.map((file) => ({
      id: Date.now() + Math.random(),
      file: file,
      preview: URL.createObjectURL(file),
      name: file.name,
      isExisting: false, // Mark as new upload
    }));

    let updatedGallery = [...(currentGallery || [])];

    if (targetIndex !== null && targetIndex < updatedGallery.length) {
      // Replace existing image at specific index
      const oldImage = updatedGallery[targetIndex];
      // Only revoke blob URLs, not server URLs
      if (oldImage && oldImage.preview && !oldImage.isExisting) {
        URL.revokeObjectURL(oldImage.preview);
      }
      updatedGallery[targetIndex] = newImages[0];
    } else {
      // Add new images to the gallery
      const availableSlots = maxImages - updatedGallery.length;
      const imagesToAdd = newImages.slice(0, availableSlots);
      updatedGallery = [...updatedGallery, ...imagesToAdd];
    }

    onChange(updatedGallery);
  };

  const handleDrop = (e, currentGallery, onChange, index = null) => {
    e.preventDefault();
    setDragOverIndex(null);
    handleFiles(e.dataTransfer.files, currentGallery, onChange, index);
  };

  const handleDragOver = (e, index = null) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOverIndex(null);
  };

  const removeImage = (index, currentGallery, onChange) => {
    const updatedGallery = [...(currentGallery || [])];
    const imageToRemove = updatedGallery[index];

    // Only revoke blob URLs, not server URLs
    if (imageToRemove && imageToRemove.preview && !imageToRemove.isExisting) {
      URL.revokeObjectURL(imageToRemove.preview);
    }

    updatedGallery.splice(index, 1);
    onChange(updatedGallery);
  };

  const handleSlotClick = (index, currentGallery, onChange) => {
    // Create a temporary input for this specific slot
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = index === (currentGallery?.length || 0); // Allow multiple only for new slot
    input.onchange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(
          e.target.files,
          currentGallery,
          onChange,
          index < (currentGallery?.length || 0) ? index : null,
        );
      }
    };
    input.click();
  };

  const ImageSlot = ({
    image,
    index,
    isEmpty,
    onRemove,
    onUpload,
    onDrop,
    onDragOver,
    onDragLeave,
  }) => {
    if (isEmpty) {
      return (
        <div
          className={`relative aspect-square w-full cursor-pointer rounded-md border transition-colors ${
            dragOverIndex === index
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50 border-dashed"
          }`}
          onClick={onUpload}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Plus className="text-muted-foreground/60 h-5 w-5" />
          </div>
        </div>
      );
    }

    return (
      <div
        className="group relative aspect-square"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <div
          className={`bg-muted relative h-full w-full overflow-hidden rounded-md border transition-colors ${
            dragOverIndex === index ? "border-primary" : "border-border"
          }`}
        >
          <img
            src={image.preview}
            alt={image.name}
            className="h-full w-full object-cover"
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(index);
            }}
            className="bg-destructive text-destructive-foreground absolute top-1.5 right-1.5 z-10 flex size-6 items-center justify-center rounded-md shadow-sm transition-opacity hover:opacity-90 md:opacity-0 md:group-hover:opacity-100"
            aria-label="Remove"
          >
            <X className="h-3 w-3" />
          </button>

          {dragOverIndex === index && (
            <div className="bg-primary/10 absolute inset-0 flex items-center justify-center backdrop-blur-[2px]">
              <Upload className="text-primary h-5 w-5" />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <FormField
      control={form.control}
      name="gallery"
      render={({ field }) => {
        const currentImages = field.value || [];
        const canAddMore = currentImages.length < maxImages;
        const totalSlots = Math.min(
          canAddMore ? currentImages.length + 1 : currentImages.length,
          maxImages,
        );

        return (
          <FormItem className="w-full md:w-2/3">
            <div className="flex items-center justify-between">
              <div>
                <FormLabel className="text-xs">Gallery Images</FormLabel>
                <p className="text-muted-foreground mt-0.5 text-[11px]">
                  PNG, JPG • max 300KB each
                </p>
              </div>
              <div className="text-muted-foreground text-[11px] font-medium tabular-nums">
                {currentImages.length}/{maxImages}
              </div>
            </div>
            <FormControl>
              <div className="mt-3">
                <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:gap-3">
                  {Array.from({ length: Math.max(totalSlots, 1) }).map(
                    (_, index) => {
                      const image = currentImages[index];
                      const isEmpty = !image;
                      return (
                        <ImageSlot
                          key={image?.id || `empty-${index}`}
                          image={image}
                          index={index}
                          isEmpty={isEmpty}
                          onRemove={(idx) =>
                            removeImage(idx, field.value, field.onChange)
                          }
                          onUpload={() =>
                            handleSlotClick(index, field.value, field.onChange)
                          }
                          onDrop={(e) =>
                            handleDrop(e, field.value, field.onChange, index)
                          }
                          onDragOver={(e) => handleDragOver(e, index)}
                          onDragLeave={handleDragLeave}
                        />
                      );
                    },
                  )}
                </div>
              </div>
            </FormControl>
            <FormMessage className="mt-1.5 text-[11px]" />
          </FormItem>
        );
      }}
    />
  );
}
