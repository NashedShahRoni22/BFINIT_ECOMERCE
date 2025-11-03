import { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function DynamicFormField({ field, value, onChange }) {
  const [imagePreview, setImagePreview] = useState(value);

  useEffect(() => {
    setImagePreview(value);
  }, [value]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        onChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    onChange(null);
  };

  switch (field.type) {
    case "text":
      return (
        <div className="space-y-1.5">
          <Label htmlFor={field.key} className="text-xs font-medium">
            {field.label}
          </Label>
          <Input
            id={field.key}
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
          />
          {field.helpText && (
            <p className="text-muted-foreground text-xs">{field.helpText}</p>
          )}
        </div>
      );

    case "textarea":
      return (
        <div className="space-y-2">
          <Label htmlFor={field.key}>{field.label}</Label>
          <Textarea
            id={field.key}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 3}
          />
          {field.helpText && (
            <p className="text-muted-foreground text-xs">{field.helpText}</p>
          )}
        </div>
      );

    case "select":
      return (
        <div className="space-y-2">
          <Label htmlFor={field.key}>{field.label}</Label>
          <Select value={value || ""} onValueChange={onChange}>
            <SelectTrigger id={field.key}>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {field.helpText && (
            <p className="text-muted-foreground text-xs">{field.helpText}</p>
          )}
        </div>
      );

    case "checkbox":
      return (
        <div className="flex items-start gap-3">
          <Checkbox
            id={field.key}
            checked={value || false}
            onCheckedChange={onChange}
            className="mt-1"
          />
          <div className="flex-1 space-y-1">
            <Label htmlFor={field.key} className="cursor-pointer">
              {field.label}
            </Label>
            {field.helpText && (
              <p className="text-muted-foreground text-xs">{field.helpText}</p>
            )}
          </div>
        </div>
      );

    case "image":
      return (
        <div className="space-y-2">
          <Label>{field.label}</Label>
          {imagePreview ? (
            <div className="relative">
              <div className="overflow-hidden rounded-lg border">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-40 w-full object-cover"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={removeImage}
                className="absolute top-2 right-2 h-7 w-7"
              >
                <X size={14} />
              </Button>
            </div>
          ) : (
            <label className="hover:bg-accent flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors hover:border-gray-400">
              <Upload size={24} className="text-muted-foreground mb-2" />
              <span className="text-sm font-medium">Upload Image</span>
              <span className="text-muted-foreground mt-1 text-xs">
                PNG, JPG up to 5MB
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
          {field.helpText && (
            <p className="text-muted-foreground text-xs">{field.helpText}</p>
          )}
        </div>
      );

    default:
      return null;
  }
}
