import { useRef, useState } from "react";
import { ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import SunEditor from "suneditor-react";
import SectionHeader from "../SectionHeader";

export default function ProductDetails({ form }) {
  const [isOpen, setIsOpen] = useState(true);
  const [tagInput, setTagInput] = useState("");
  const sunEditorRef = useRef();

  const handleTagKeyPress = (e, field) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const currentTags = field.value
        ? field.value.split("|").filter((tag) => tag.trim())
        : [];
      const newTag = tagInput.trim();

      if (!currentTags.includes(newTag)) {
        const updatedTags = [...currentTags, newTag];
        field.onChange(updatedTags.join("|"));
      }
      setTagInput("");
    }
  };

  // Remove tag
  const removeTag = (tagToRemove, field) => {
    const currentTags = field.value
      ? field.value.split("|").filter((tag) => tag.trim())
      : [];
    const updatedTags = currentTags.filter((tag) => tag !== tagToRemove);
    field.onChange(updatedTags.join("|"));
  };

  // Get tags array from field value
  const getTagsArray = (value) => {
    return value ? value.split("|").filter((tag) => tag.trim()) : [];
  };

  // Handle SunEditor change
  const handleDescriptionChange = (content) => {
    form.setValue("description", content);
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-card rounded-lg border p-5"
    >
      {/* header */}
      <div className="flex items-start justify-between gap-3">
        <SectionHeader
          title="Product Details"
          description="Enter the basic information about your product including name,
            description and category"
        />

        {/* section collapse toggle button */}
        <CollapsibleTrigger asChild>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="size-8 shrink-0 md:size-6"
          >
            <ChevronUp
              className={`h-4 w-4 transition-transform duration-200 ease-linear md:h-3 md:w-3 ${isOpen ? "rotate-0" : "rotate-180"}`}
            />
          </Button>
        </CollapsibleTrigger>
      </div>

      {/* main form content like input field, select and text area */}
      <CollapsibleContent className="mt-4 grid grid-cols-1 items-start gap-4 md:mt-6 md:grid-cols-2 md:gap-6">
        {/* product name */}
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Product name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Product Name <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input type="text" placeholder="Product Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* category selector */}
        <FormField
          control={form.control}
          name="category"
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Category <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="laptop">Laptop</SelectItem>
                    <SelectItem value="airplane">Airplane</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* subcategory selector */}
        <FormField
          control={form.control}
          name="subcategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subcategory</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="android">Android</SelectItem>
                    <SelectItem value="ios">iOS</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* brand selector */}
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="samsung">Samsung</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* product tags with visual tags display */}
        <div className="col-span-full">
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Tags</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {/* Display existing tags */}
                    {getTagsArray(field.value).length > 0 && (
                      <div className="flex flex-wrap items-center gap-2">
                        {getTagsArray(field.value).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1.5 rounded-md border bg-white px-2.5 py-1.5 text-xs"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag, field)}
                              className="shrink-0 rounded-full p-0.5 text-red-500 hover:bg-red-50"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Tag input */}
                    {/* TODO: placeholder text should be more ux friendly */}
                    <Input
                      placeholder="Type tags and press Enter. to add multiple values (separate with | for multiple)"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => handleTagKeyPress(e, field)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* short description textarea */}
        <div className="col-span-full">
          <FormField
            control={form.control}
            name="short_description"
            rules={{
              maxLength: {
                value: 150,
                message: "Short description must be 150 characters or less",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={3}
                    maxLength={150}
                    placeholder="Write a short description (150 characters max)"
                    className="resize-none"
                  />
                </FormControl>
                <div className="mt-0.5 flex items-center justify-between gap-2">
                  <FormMessage className="flex-1 text-xs" />
                  <p className="text-muted-foreground shrink-0 text-xs tabular-nums">
                    {field.value ? field.value.length : 0}/150
                  </p>
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* long description textarea */}
        <div className="col-span-full">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <SunEditor
                    ref={sunEditorRef}
                    onChange={handleDescriptionChange}
                    name="description"
                    height="220px"
                    placeholder="Detail product description with features, benefits and specifications"
                    defaultValue={field.value || ""}
                    setOptions={{
                      buttonList: [
                        [
                          "undo",
                          "redo",
                          "formatBlock",
                          "bold",
                          "italic",
                          "underline",
                          "strike",
                        ],
                        [
                          "fontSize",
                          "fontColor",
                          "hiliteColor",
                          "align",
                          "list",
                          "link",
                          "image",
                          "video",
                        ],
                        ["removeFormat", "preview"],
                      ],
                    }}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
