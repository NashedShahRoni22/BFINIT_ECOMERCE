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
        <FormItem>
          <div>
            <FormLabel className="text-xs font-medium text-gray-700">
              Thumbnail Image *
            </FormLabel>
            <p className="mt-1.5 text-xs text-gray-500">PNG, JPG • max 500KB</p>
          </div>

          <FormControl>
            <div className="relative mt-4">
              {field.value ? (
                // Show uploaded image
                <div className="group relative">
                  <div className="relative aspect-square h-72 shrink-0 overflow-hidden rounded-lg border-2 border-gray-200 bg-white">
                    <img
                      src={field.value.preview}
                      alt={field.value.name}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(field.onChange, field.value)}
                      className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ) : (
                // Show upload area
                <div
                  className={`relative flex aspect-square h-72 shrink-0 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors duration-200 ease-linear hover:border-gray-400 ${
                    dragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                  onDrop={(e) => handleDrop(e, field.onChange)}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-5 w-5 text-gray-400" />
                  <div className="mt-1.5 text-center text-xs text-gray-500">
                    <div>Drag & Drop your thumbnail image here or</div>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="mt-3 cursor-pointer text-xs"
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
