import { Plus, X, Package, Tag } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";

export default function AddSubCategory({
  categories,
  selectedCategory,
  handleCategoryChange,
  subCategoryInput,
  setSubCategoryInput,
  handleSubCategories,
  subCategoires,
  removeSubCategory,
  handleAddSubCategory,
  isPending,
}) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-card border-border sticky top-6 overflow-hidden rounded-lg border">
        <div className="bg-muted border-border border-b px-6 py-4">
          <h2 className="text-card-foreground text-sm font-semibold">
            Add Subcategory
          </h2>
          <p className="text-muted-foreground mt-1 text-xs">
            Select a category first
          </p>
        </div>

        <div className="space-y-6 px-6 py-4">
          {/* Category Selection */}
          {categories?.data?.length > 0 ? (
            <>
              <div className="space-y-2">
                <Label className="text-xs">
                  Select Category
                  <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={selectedCategory}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>

                  <SelectContent>
                    {categories?.data?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subcategory Input */}
              {selectedCategory && (
                <>
                  <div className="space-y-2">
                    <Label className="text-xs">
                      Subcategory Name
                      <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        value={subCategoryInput}
                        onChange={(e) => setSubCategoryInput(e.target.value)}
                        onKeyDown={handleSubCategories}
                        placeholder="e.g., Laptops, Smartphones"
                      />
                      <Button
                        onClick={handleSubCategories}
                        disabled={!subCategoryInput.trim()}
                        size="icon"
                      >
                        <Plus />
                      </Button>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      Press Enter or click + to add
                    </p>
                  </div>

                  {/* Tags Display */}
                  {subCategoires.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-xs">
                        Added Subcategories ({subCategoires.length})
                      </Label>
                      <div className="bg-muted border-border flex flex-wrap gap-2 rounded-md border p-3">
                        {subCategoires.map((subCat, i) => (
                          <div
                            key={i}
                            className="bg-primary text-primary-foreground inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium"
                          >
                            <Tag className="h-3.5 w-3.5" />
                            <span>{subCat}</span>
                            <button
                              onClick={() => removeSubCategory(i)}
                              className="ml-1 rounded p-0.5 transition-opacity hover:cursor-pointer hover:opacity-80"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    onClick={handleAddSubCategory}
                    disabled={subCategoires.length === 0 || isPending}
                    size="sm"
                    className="w-full text-xs"
                  >
                    {isPending ? (
                      <Spinner />
                    ) : (
                      <>
                        Add{" "}
                        {subCategoires.length > 0 && `${subCategoires.length} `}
                        Subcategor
                        {subCategoires.length === 1 ? "y" : "ies"}
                      </>
                    )}
                  </Button>
                </>
              )}
            </>
          ) : (
            <div className="py-8 text-center">
              <Package className="text-muted-foreground mx-auto mb-3 size-6" />
              <p className="text-muted-foreground mb-3 text-xs">
                No categories found for this store.
              </p>
              <Button asChild size="sm" className="text-xs">
                <Link to="/products/category">Create New Category</Link>
              </Button>
            </div>
          )}

          {/* Empty State when no category selected */}
          {!selectedCategory && categories?.data?.length > 0 && (
            <div className="py-8 text-center">
              <div className="bg-muted/50 mb-3 inline-flex rounded-full p-3">
                <Package className="text-muted-foreground size-6" />
              </div>
              <p className="text-muted-foreground text-xs">
                Select a category above to start adding subcategories
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
