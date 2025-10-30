import { useState } from "react";
import { ArrowLeft, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContentEditorPanel() {
  const [formData, setFormData] = useState({
    heading: "Welcome to Our Store",
    subheading: "Discover amazing products at unbeatable prices",
    ctaText: "Shop Now",
    backgroundImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          backgroundImage: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({
      ...prev,
      backgroundImage: null,
    }));
  };

  return (
    <aside className="custom-scrollbar-hide bg-background h-[calc(100dvh-63px)] w-full max-w-80 overflow-y-auto border-l">
      {/* Header */}
      <div className="border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            title="Back to sections"
          >
            <ArrowLeft size={16} />
          </Button>
          <div>
            <h2 className="text-sm font-semibold">Hero Banner</h2>
            <p className="text-muted-foreground text-xs">
              Edit section content
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Form Content */}
      <div className="overflow-y-auto p-5">
        <div className="space-y-5">
          {/* Heading Field */}
          <div className="space-y-2">
            <Label htmlFor="heading" className="text-sm font-medium">
              Heading
            </Label>
            <Input
              id="heading"
              value={formData.heading}
              onChange={(e) => handleInputChange("heading", e.target.value)}
              placeholder="Enter heading"
              className="text-sm"
            />
            <p className="text-muted-foreground text-xs">
              Main headline for your hero section
            </p>
          </div>

          {/* Subheading Field */}
          <div className="space-y-2">
            <Label htmlFor="subheading" className="text-sm font-medium">
              Subheading
            </Label>
            <Textarea
              id="subheading"
              value={formData.subheading}
              onChange={(e) => handleInputChange("subheading", e.target.value)}
              placeholder="Enter subheading"
              rows={3}
              className="resize-none text-sm"
            />
            <p className="text-muted-foreground text-xs">
              Supporting text below the headline
            </p>
          </div>

          {/* CTA Button Text */}
          <div className="space-y-2">
            <Label htmlFor="ctaText" className="text-sm font-medium">
              Button Text
            </Label>
            <Input
              id="ctaText"
              value={formData.ctaText}
              onChange={(e) => handleInputChange("ctaText", e.target.value)}
              placeholder="Enter button text"
              className="text-sm"
            />
            <p className="text-muted-foreground text-xs">
              Call-to-action button label
            </p>
          </div>

          {/* Background Image Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Background Image</Label>

            {imagePreview ? (
              <div className="relative">
                <div className="overflow-hidden rounded-lg border">
                  <img
                    src={imagePreview}
                    alt="Background preview"
                    className="h-40 w-full object-cover"
                  />
                </div>
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 h-7 w-7"
                  onClick={removeImage}
                >
                  <X size={14} />
                </Button>
              </div>
            ) : (
              <label
                htmlFor="backgroundImage"
                className="border-muted-foreground/25 bg-muted/30 hover:border-muted-foreground/50 hover:bg-muted/50 flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors"
              >
                <Upload size={24} className="text-muted-foreground mb-2" />
                <span className="text-muted-foreground text-sm font-medium">
                  Upload Image
                </span>
                <span className="text-muted-foreground mt-1 text-xs">
                  PNG, JPG up to 5MB
                </span>
                <input
                  id="backgroundImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}

            <p className="text-muted-foreground text-xs">
              Background image for the hero section
            </p>
          </div>

          {/* Divider */}
          <div className="border-t pt-5">
            <h3 className="mb-3 text-sm font-semibold">Layout Settings</h3>

            {/* Content Alignment */}
            <div className="space-y-2">
              <Label htmlFor="alignment" className="text-sm font-medium">
                Content Alignment
              </Label>
              <select
                id="alignment"
                className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t px-5 py-3">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 text-sm">
            Cancel
          </Button>
          <Button size="sm" className="flex-1 text-sm">
            Apply Changes
          </Button>
        </div>
      </div>
    </aside>
  );
}
