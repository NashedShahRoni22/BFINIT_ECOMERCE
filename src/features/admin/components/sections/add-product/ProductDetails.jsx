import { useRef, useState } from "react";
import { ChevronUp, Plus, X } from "lucide-react";
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
import { useNavigate } from "react-router";
import useGetCategories from "@/features/admin/hooks/category/useGetCategories";
import useGetBrands from "@/features/admin/hooks/brands/useGetBrands";
import SectionHeader from "./SectionHeader";

export default function ProductDetails({ form }) {
  // fetch categories
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategories();
  // fetch brands
  const { data: brands, isLoading: isBrandsLoading } = useGetBrands();

  const navigate = useNavigate();
  const sunEditorRef = useRef();

  const [isOpen, setIsOpen] = useState(true);
  const [tagInput, setTagInput] = useState("");

  // Watch category value from form
  const selectedCategoryName = form.watch("category");

  const selectedCategory = categories?.data?.find(
    (cat) => cat?.name === selectedCategoryName
  );

  // Get subcategories (empty array if none)
  const subcategories = selectedCategory?.subcategory || [];

  // handle category select onchange handler
  const handleCategoryChange = (value, field) => {
    if (value === "new_category") {
      return navigate("/products/category");
    }

    field.onChange(value);
    form.setValue("subcategory", "");
  };

  // handle subcategory selct onchange hanlder
  const handleSubcategoryChange = (value, field) => {
    if (value === "new_subcategory") {
      return navigate("/products/sub-category");
    }

    field.onChange(value);
  };

  // handle brand select onchange handler
  const handleBrandChange = (value, field) => {
    if (value === "new_brand") {
      return navigate("/products/brands");
    }

    field.onChange(value);
  };

  const handleTagKeyPress = (e, field) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const currentTags = field.value
        ? field.value.split(",").filter((tag) => tag.trim())
        : [];
      const newTag = tagInput.trim();

      if (!currentTags.includes(newTag)) {
        const updatedTags = [...currentTags, newTag];
        field.onChange(updatedTags.join(","));
      }
      setTagInput("");
    }
  };

  // Remove tag
  const removeTag = (tagToRemove, field) => {
    const currentTags = field.value
      ? field.value.split(",").filter((tag) => tag.trim())
      : [];
    const updatedTags = currentTags.filter((tag) => tag !== tagToRemove);
    field.onChange(updatedTags.join(","));
  };

  // Get tags array from field value
  const getTagsArray = (value) => {
    return value ? value.split(",").filter((tag) => tag.trim()) : [];
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
              className={`h-4 w-4 transition-transform duration-200 ease-linear md:h-3 md:w-3 ${
                isOpen ? "rotate-0" : "rotate-180"
              }`}
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
              <FormLabel className="text-xs">
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
              <FormLabel className="text-xs">
                Category <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => handleCategoryChange(value, field)}
                  value={field.value}
                  disabled={isCategoriesLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        isCategoriesLoading
                          ? "Loading categories..."
                          : "Select Category"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.data && categories?.data?.length > 0 ? (
                      <>
                        {categories.data.map((cat) => (
                          <SelectItem key={cat?.id} value={cat?.name}>
                            {cat?.name}
                          </SelectItem>
                        ))}
                        <SelectItem
                          value="new_category"
                          className="text-primary mt-1 cursor-pointer border-t pt-2"
                        >
                          <Plus />
                          <span>Create new category</span>
                        </SelectItem>
                      </>
                    ) : (
                      <>
                        <div className="text-muted-foreground px-2 py-2 text-center text-sm">
                          No category found!
                        </div>
                        <SelectItem
                          value="new_category"
                          className="text-primary cursor-pointer"
                        >
                          <Plus />
                          <span>Create your first category</span>
                        </SelectItem>
                      </>
                    )}
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
              <FormLabel className="text-xs">Subcategory</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) =>
                    handleSubcategoryChange(value, field)
                  }
                  value={field.value}
                  disabled={isCategoriesLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {!selectedCategoryName ? (
                      <div className="text-muted-foreground px-2 py-2 text-center text-sm">
                        Select category first to view subcategories
                      </div>
                    ) : subcategories?.length > 0 ? (
                      <>
                        {subcategories.map((subcat, index) => (
                          <SelectItem key={index} value={subcat}>
                            {subcat}
                          </SelectItem>
                        ))}
                        <SelectItem
                          value="new_subcategory"
                          className="text-primary mt-1 cursor-pointer border-t pt-2 font-medium"
                        >
                          <div className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            <span>Create new subcategory</span>
                          </div>
                        </SelectItem>
                      </>
                    ) : (
                      <>
                        <div className="text-muted-foreground px-2 py-2 text-center text-sm">
                          No subcategories found for this category
                        </div>
                        <SelectItem
                          value="new_subcategory"
                          className="text-primary cursor-pointer font-medium"
                        >
                          <div className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            <span>Create your first subcategory</span>
                          </div>
                        </SelectItem>
                      </>
                    )}
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
              <FormLabel className="text-xs">Brand</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    handleBrandChange(value, field);
                  }}
                  value={field.value}
                  disabled={isBrandsLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        isBrandsLoading ? "Loading brands..." : "Select Brand"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {brands?.data && brands?.data?.length > 0 ? (
                      <>
                        {brands?.data?.map((brand) => (
                          <SelectItem key={brand?.id} value={brand?.name}>
                            {brand?.name}
                          </SelectItem>
                        ))}
                        <SelectItem
                          value="new_brand"
                          className="text-primary mt-1 cursor-pointer border-t pt-2"
                        >
                          <Plus />
                          <span>Create new brand</span>
                        </SelectItem>
                      </>
                    ) : (
                      <>
                        <div className="text-muted-foreground px-2 py-2 text-center text-sm">
                          No brand found!
                        </div>
                        <SelectItem
                          value="new_brand"
                          className="text-primary cursor-pointer"
                        >
                          <Plus />
                          <span>Create your first brand</span>
                        </SelectItem>
                      </>
                    )}
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
                <FormLabel className="text-xs">Product Tags</FormLabel>
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
                    <Input
                      placeholder="Press Enter or use commas for multiple tags (e.g., organic, seasonal)"
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
                <FormLabel className="text-xs">Short Description</FormLabel>
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
                <FormLabel className="text-xs">Description</FormLabel>
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
