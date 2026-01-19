import { useRef, useState } from "react";
import { Image, X } from "lucide-react";
import toast from "react-hot-toast";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
      id: crypto.randomUUID(),
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
        <FormItem className="w-full md:w-1/3">
          <div>
            <FormLabel className="text-xs">
              Thumbnail <span className="text-destructive">*</span>
            </FormLabel>
            <p className="text-muted-foreground mt-0.5 text-[11px]">
              1000×1000px • PNG, JPEG, JPG • max 500KB
            </p>
          </div>
          <FormControl>
            <div className="mt-3">
              {field.value ? (
                <div className="group relative">
                  <div className="border-border bg-muted relative aspect-square w-full overflow-hidden rounded-md border">
                    <img
                      src={field.value.preview}
                      alt={field.value?.name}
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={() => removeImage(field.onChange, field.value)}
                      type="button"
                      className="bg-destructive text-destructive-foreground absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-md shadow-sm transition-opacity hover:cursor-pointer hover:opacity-90 md:opacity-0 md:group-hover:opacity-100"
                      aria-label="Remove"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="text-muted-foreground mt-1.5 truncate text-[11px]">
                    {field.value?.name}
                  </p>
                </div>
              ) : (
                <div
                  className={`relative aspect-square w-full cursor-pointer rounded-md border transition-colors ${
                    dragActive
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/50 border-dashed"
                  }`}
                  onDrop={(e) => handleDrop(e, field.onChange)}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
                    <Image
                      strokeWidth={0.5}
                      className="text-muted-foreground/60 h-8 w-8"
                    />
                    <div className="text-center">
                      <p className="text-xs font-medium">Drop image or click</p>
                      <p className="text-muted-foreground mt-0.5 text-[11px]">
                        1000×1000px recommended
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={(e) => handleFileInput(e, field.onChange)}
                className="hidden"
              />
            </div>
          </FormControl>
          <FormMessage className="mt-1.5 text-xs" />
        </FormItem>
      )}
    />
  );
}
