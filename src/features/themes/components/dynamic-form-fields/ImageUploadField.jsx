import { useEffect, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import usePostMutation from "@/hooks/api/usePostMutation";
import useDeleteMutation from "@/hooks/api/useDeleteMutation";
import useTheme from "@/hooks/useTheme";

const validateImage = (file) => {
  const allowedImageTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  // Check file type
  if (!allowedImageTypes.includes(file.type)) {
    toast.error("Please upload JPG, PNG, or WebP images only");
    return false;
  }

  // Check file size - max 2MB
  if (file.size > 2 * 1024 * 1024) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    toast.error(`Image is too large (${sizeMB}MB). Maximum size is 2MB`);
    return false;
  }

  return true;
};

export default function ImageUploadField({ field, value, onChange }) {
  const { setIsUploading } = useTheme();

  const { mutate, isPending: isUploading } = usePostMutation({
    endpoint: `/store/theme/image/upload`,
    token: true,
  });

  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteMutation({
    endpoint: `/store/theme/image/delete`,
    token: true,
  });

  const [imagePreview, setImagePreview] = useState(value);

  useEffect(() => {
    setImagePreview(value);
  }, [value]);

  // handle image upload loading state globally
  useEffect(() => {
    setIsUploading(isUploading || isDeleting);
  }, [setIsUploading, isUploading, isDeleting]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!validateImage(file)) {
      e.target.value = "";
      return;
    }

    // set local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // upload to backend
    const formData = new FormData();
    formData.append("themeImages", file);

    mutate(formData, {
      onSuccess: (res) => {
        setImagePreview(res.imageAddress);
        onChange(res.imageAddress);
      },
      onError: (err) => {
        console.error("Upload failed:", err);
        setImagePreview(value);
        toast.error("Image upload failed. Please try again.");
      },
    });
  };

  const removeImage = () => {
    if (value === "/uploads/default_slider/hero-default.webp") {
      return setImagePreview(null);
    }

    const data = {
      imageAddress: imagePreview,
    };

    deleteMutate(data, {
      onSuccess: () => {
        setImagePreview(null);
        onChange(null);
      },
      onError: (err) => {
        console.error("Delete failed:", err);
        toast.error("Failed to delete image. Please try again.");
      },
    });
  };

  return (
    <div className="space-y-2">
      <Label className="text-foreground text-xs font-medium">
        {field.label}
      </Label>
      {field.helpText && (
        <p className="text-muted-foreground -mt-0.5 text-[11px] leading-relaxed">
          {field.helpText}
        </p>
      )}
      {imagePreview ? (
        <div className="group relative">
          <div className="overflow-hidden rounded-lg border">
            <img
              src={
                imagePreview.startsWith("data:")
                  ? imagePreview
                  : `https://ecomback.bfinit.com${imagePreview}`
              }
              alt="Preview"
              className="h-32 w-full object-cover"
            />
            {/* Upload loading overlay */}
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              </div>
            )}
            {/* Delete loading overlay */}
            {isDeleting && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              </div>
            )}
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={removeImage}
            disabled={isUploading || isDeleting}
            className="absolute top-2 right-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-50"
          >
            <X size={12} />
          </Button>
        </div>
      ) : (
        <label
          className={`border-border bg-muted/20 hover:border-muted-foreground/40 hover:bg-muted/30 flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
            isUploading ? "pointer-events-none opacity-60" : ""
          }`}
        >
          {isUploading ? (
            <>
              <Loader2
                size={18}
                className="text-muted-foreground mb-1.5 animate-spin"
              />
              <span className="text-foreground text-xs font-medium">
                Uploading...
              </span>
            </>
          ) : (
            <>
              <Upload size={18} className="text-muted-foreground mb-2" />
              <span className="mb-1 text-xs font-medium">Upload Image</span>
              <span className="text-muted-foreground px-4 text-center text-[11px] leading-relaxed">
                JPG, PNG, WebP • Max 2MB
              </span>
              <span className="text-muted-foreground mt-0.5 text-[11px]">
                Recommended: 1920x1080px
              </span>
            </>
          )}
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleImageUpload}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      )}
    </div>
  );
}
