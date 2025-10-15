import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";

export default function ThumbnailImage({ form }) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const maxFileSize = 500 * 1024; // 500KB

  const handleFiles = (files, onChange) => {
    const file = files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return;
    }

    // Validate file size
    if (file.size > maxFileSize) {
      toast.error("File size must be less than 500KB");
      return;
    }

    // Create image object with preview
    const imageData = {
      id: Date.now(),
      file: file,
      preview: URL.createObjectURL(file),
      name: file.name,
    };

    onChange(imageData);
  };

  const handleDrop = (e, onChange) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files, onChange);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileInput = (e, onChange) => {
    handleFiles(e.target.files, onChange);
  };

  const removeImage = (onChange, currentImage) => {
    if (currentImage && currentImage.preview) {
      URL.revokeObjectURL(currentImage.preview);
      fileInputRef.current.value = "";
    }
    onChange(null);
  };

  return (
    <FormField
      control={form.control}
      name="thumbnail"
      rules={{ required: "Thumbnail image is required" }}
      render={({ field }) => (
        <FormItem className="w-full">
          <div>
            <FormLabel className="text-sm font-medium text-gray-700">
              Thumbnail Image <span className="text-destructive">*</span>
            </FormLabel>
            <p className="mt-1.5 text-xs text-gray-500">PNG, JPG • max 500KB</p>
          </div>
          <FormControl>
            <div className="relative mt-4">
              {field.value ? (
                // Show uploaded image
                <div className="group relative">
                  <div className="relative mx-auto aspect-square w-full max-w-xs shrink-0 overflow-hidden rounded-lg border-2 border-gray-200 bg-white md:h-72 md:max-w-none">
                    <img
                      src={field.value.preview}
                      alt={field.value.name}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(field.onChange, field.value)}
                      className="absolute top-2 right-2 flex size-8 touch-manipulation items-center justify-center rounded-full bg-red-500 text-white opacity-100 transition-opacity hover:bg-red-600 md:size-6 md:opacity-0 md:group-hover:opacity-100"
                    >
                      <X className="h-4 w-4 md:h-3 md:w-3" />
                    </button>
                  </div>
                </div>
              ) : (
                // Show upload area
                <div
                  className={`relative mx-auto flex aspect-square w-full max-w-xs shrink-0 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors duration-200 ease-linear hover:border-gray-400 md:h-72 md:max-w-none md:p-6 ${
                    dragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                  onDrop={(e) => handleDrop(e, field.onChange)}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-8 w-8 text-gray-400 md:h-6 md:w-6" />
                  <div className="mt-2 text-center text-xs text-gray-600 md:text-sm">
                    <div>Drag & Drop your thumbnail image here or</div>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="mt-3 h-9 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                    >
                      Browse Files
                    </Button>
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileInput(e, field.onChange)}
                className="hidden"
              />
            </div>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
