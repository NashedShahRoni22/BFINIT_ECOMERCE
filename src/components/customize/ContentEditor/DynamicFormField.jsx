import { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        <div className="space-y-2">
          <Label
            htmlFor={field.key}
            className="text-foreground text-xs font-medium"
          >
            {field.label}
          </Label>
          {field.helpText && (
            <p className="text-muted-foreground -mt-0.5 text-[11px] leading-relaxed">
              {field.helpText}
            </p>
          )}
          <Input
            id={field.key}
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className="h-9 text-sm"
          />
        </div>
      );

    case "textarea":
      return (
        <div className="space-y-2">
          <Label
            htmlFor={field.key}
            className="text-foreground text-xs font-medium"
          >
            {field.label}
          </Label>
          {field.helpText && (
            <p className="text-muted-foreground -mt-0.5 text-[11px] leading-relaxed">
              {field.helpText}
            </p>
          )}
          <Textarea
            id={field.key}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 3}
            className="resize-none text-sm"
          />
        </div>
      );

    case "select":
      return (
        <div className="space-y-2">
          <Label
            htmlFor={field.key}
            className="text-foreground text-xs font-medium"
          >
            {field.label}
          </Label>
          {field.helpText && (
            <p className="text-muted-foreground -mt-0.5 text-[11px] leading-relaxed">
              {field.helpText}
            </p>
          )}
          <Select value={value || ""} onValueChange={onChange}>
            <SelectTrigger id={field.key} className="h-9 text-sm">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-sm"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );

    case "checkbox":
      return (
        <div className="border-border bg-muted/20 flex items-start gap-3 rounded-lg border p-3">
          <Checkbox
            id={field.key}
            checked={value || false}
            onCheckedChange={onChange}
            className="mt-0.5"
          />
          <div className="flex-1 space-y-1">
            <Label
              htmlFor={field.key}
              className="cursor-pointer text-xs leading-none font-medium"
            >
              {field.label}
            </Label>
            {field.helpText && (
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                {field.helpText}
              </p>
            )}
          </div>
        </div>
      );

    case "image":
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
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 w-full object-cover"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={removeImage}
                className="absolute top-2 right-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X size={12} />
              </Button>
            </div>
          ) : (
            <label className="border-border bg-muted/20 hover:border-muted-foreground/40 hover:bg-muted/30 flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors">
              <Upload size={18} className="text-muted-foreground mb-1.5" />
              <span className="text-foreground text-xs font-medium">
                Upload Image
              </span>
              <span className="text-muted-foreground mt-0.5 text-[11px]">
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
        </div>
      );

    default:
      return null;
  }
}
