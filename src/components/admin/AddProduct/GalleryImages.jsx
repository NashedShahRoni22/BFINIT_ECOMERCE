import { useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";

export default function GalleryImages({ form }) {
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const fileInputRef = useRef(null);
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
    }));

    let updatedGallery = [...(currentGallery || [])];

    if (targetIndex !== null && targetIndex < updatedGallery.length) {
      // Replace existing image at specific index
      const oldImage = updatedGallery[targetIndex];
      if (oldImage && oldImage.preview) {
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

  const handleFileInput = (e, currentGallery, onChange, targetIndex = null) => {
    handleFiles(e.target.files, currentGallery, onChange, targetIndex);
  };

  const removeImage = (index, currentGallery, onChange) => {
    const updatedGallery = [...(currentGallery || [])];
    const imageToRemove = updatedGallery[index];

    if (imageToRemove && imageToRemove.preview) {
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
          className={`relative flex aspect-square h-32 shrink-0 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-gray-500 transition-colors duration-200 ease-linear hover:border-gray-400 ${
            dragOverIndex === index
              ? "scale-[1.02] border-blue-400 bg-blue-50/50"
              : "border-gray-300"
          }`}
          onClick={onUpload}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
        >
          <Plus className="h-5 w-5" />
        </div>
      );
    }

    return (
      <div
        className="group relative"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <div className="relative aspect-square h-32 overflow-hidden rounded-lg border-2 border-gray-200 bg-white">
          <img
            src={image.preview}
            alt={image.name}
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute top-1.5 right-1.5 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600"
          >
            <X className="h-3 w-3" />
          </button>
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
        // Create slots: all existing images + one empty slot if we can add more
        const totalSlots = canAddMore
          ? currentImages.length + 1
          : currentImages.length;
        return (
          <FormItem>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <FormLabel className="text-sm font-medium text-gray-700">
                  Gallery Images
                </FormLabel>
                <p className="mt-1.5 text-xs text-gray-500">
                  Upload up to {maxImages} images (PNG, JPG • max 300KB each)
                </p>
              </div>
              <div className="text-sm font-medium text-gray-600">
                {currentImages.length}/{maxImages} uploaded
              </div>
            </div>
            <FormControl>
              <div className="mt-4">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
                  {Array.from({ length: totalSlots }).map((_, index) => {
                    const image = currentImages[index];
                    const isEmpty = !image;
                    return (
                      <ImageSlot
                        key={index}
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
                  })}
                </div>
                {/* Hidden input for general file upload */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) =>
                    handleFileInput(e, field.value, field.onChange)
                  }
                  className="hidden"
                />
              </div>
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        );
      }}
    />
  );
}
