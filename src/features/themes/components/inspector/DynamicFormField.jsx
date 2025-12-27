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
import ProductSourceField from "./ProductSourceField";
import { Switch } from "@/components/ui/switch";
import ImageUploadField from "../dynamic-form-fields/ImageUploadField";

export default function DynamicFormField({ field, value, onChange }) {
  switch (field.type) {
    case "text":
      return (
        <div className="space-y-2">
          <Label htmlFor={field.key} className="text-xs font-medium">
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
          <Label htmlFor={field.key} className="text-xs font-medium">
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
          <Label htmlFor={field.key} className="text-xs font-medium">
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
        <ImageUploadField field={field} value={value} onChange={onChange} />
      );

    case "switch":
      return (
        <div className="border-border bg-muted/20 flex items-center justify-between rounded-lg border p-3">
          <div className="space-y-1">
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
          <Switch
            id={field.key}
            checked={value || false}
            onCheckedChange={onChange}
          />
        </div>
      );

    case "product-source":
      return (
        <ProductSourceField
          field={field}
          value={value || { type: "all", value: null }}
          onChange={onChange}
        />
      );

    default:
      return null;
  }
}
