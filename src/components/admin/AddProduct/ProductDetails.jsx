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
      className="rounded-lg border bg-white p-8"
    >
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            Product Details
          </h2>
          <p className="mt-1 text-xs text-gray-600">
            Enter the basic information about your product including name,
            description and category
          </p>
        </div>

        {/* section collapse toggle button */}
        <CollapsibleTrigger asChild>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="size-6 cursor-pointer text-xs"
          >
            <ChevronUp
              className={`h-3 w-3 transition-transform duration-200 ease-linear ${isOpen ? "rotate-0" : "rotate-180"}`}
            />
          </Button>
        </CollapsibleTrigger>
      </div>

      {/* main form content like input field, select and text area */}
      <CollapsibleContent className="mt-6 grid grid-cols-1 items-start gap-6 md:grid-cols-2">
        {/* product name */}
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Product name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium text-gray-700">
                Product Name *
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Product Name"
                  {...field}
                  className="text-xs shadow-none"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* brand selector */}
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium text-gray-700">
                Brand
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full text-xs shadow-none">
                    <SelectValue placeholder="Select Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apple" className="text-xs">
                      Apple
                    </SelectItem>
                    <SelectItem value="samsung" className="text-xs">
                      Samsung
                    </SelectItem>
                    <SelectItem value="google" className="text-xs">
                      Google
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-xs" />
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
              <FormLabel className="text-xs font-medium text-gray-700">
                Category *
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full text-xs shadow-none">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mobile" className="text-xs">
                      Mobile
                    </SelectItem>
                    <SelectItem value="laptop" className="text-xs">
                      Laptop
                    </SelectItem>
                    <SelectItem value="airplane" className="text-xs">
                      Airplane
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* subcategory selector */}
        <FormField
          control={form.control}
          name="subcategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium text-gray-700">
                Subcategory
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full text-xs shadow-none">
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured" className="text-xs">
                      Featured
                    </SelectItem>
                    <SelectItem value="android" className="text-xs">
                      Android
                    </SelectItem>
                    <SelectItem value="ios" className="text-xs">
                      iOS
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-xs" />
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
                <FormLabel className="text-xs font-medium text-gray-700">
                  Product Tags
                </FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {/* Display existing tags */}
                    {getTagsArray(field.value).length > 0 && (
                      <div className="flex flex-wrap gap-2 rounded-md border bg-gray-50 p-2">
                        {getTagsArray(field.value).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 rounded-md border bg-white px-2 py-1 text-xs"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag, field)}
                              className="rounded-full p-0.5 text-red-500 hover:bg-red-50"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    {/* Tag input */}
                    <Input
                      placeholder="Add tags (separate with | for multiple)"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => handleTagKeyPress(e, field)}
                      className="text-xs shadow-none"
                    />
                    <p className="text-xs text-gray-500">
                      Press Enter to add tags
                    </p>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
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
                <FormLabel className="text-xs font-medium text-gray-700">
                  Short Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={3}
                    maxLength={150}
                    placeholder="Write a short description of the product (150 characters max)"
                    className="text-xs shadow-none"
                  />
                </FormControl>
                <div className="mt-1.5 flex items-center justify-end">
                  <FormMessage className="text-xs" />
                  <p className="text-xs text-gray-500">
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
                <FormLabel className="text-xs font-medium text-gray-700">
                  Description
                </FormLabel>
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
