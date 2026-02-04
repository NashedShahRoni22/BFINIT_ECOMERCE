import { useState } from "react";
import { Link } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CircleX, FolderTree, Plus, Layers } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import SubCategoryList from "../components/sections/sub-category/SubCategoryList";
import PageHeader from "../components/PageHeader";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import useGetCategories from "../hooks/category/useGetCategories";
import useSelectedStore from "@/hooks/useSelectedStore";
import usePostMutation from "@/hooks/api/usePostMutation";
import useAuth from "@/hooks/auth/useAuth";
import useGetSubCategories from "../hooks/category/useGetSubCategories";
import EmptyStoreState from "../components/EmptyStoreState";
import { breadcrubms } from "@/utils/constants/breadcrumbs";

export default function SubCategory() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { selectedStore } = useSelectedStore();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryInput, setSubCategoryInput] = useState("");
  const [subCategoires, setSubCategories] = useState([]);

  const { data: categories } = useGetCategories();
  const { data: subCategoriesData } = useGetSubCategories(
    selectedStore?.storeId,
    selectedCategory,
  );

  const { mutate, isPending } = usePostMutation({
    endpoint: `/subcategory/create/${selectedStore?.storeId}/${selectedCategory}`,
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleSubCategories = (e) => {
    if (!subCategoryInput.trim()) {
      return;
    }

    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      if (!subCategoires.includes(subCategoryInput)) {
        setSubCategories([...subCategoires, subCategoryInput]);
        setSubCategoryInput("");
      } else {
        toast.error("Sub-category already added to list");
      }
    }
  };

  const removeSubCategory = (indexToRemove) => {
    const filteredSubCategories = subCategoires.filter(
      (_, index) => index !== indexToRemove,
    );
    setSubCategories(filteredSubCategories);
  };

  const handleAddSubCategory = () => {
    const subCategoriesObj = {
      subcategories: subCategoires,
    };

    mutate(subCategoriesObj, {
      onSuccess: () => {
        setSubCategories([]);
        toast.success("New Sub-category created!");
        queryClient.invalidateQueries([
          "subCategories",
          selectedStore?.storeId,
          selectedCategory,
        ]);
      },
      onError: () => {
        setSubCategories([]);
        toast.error("Something went wrong!");
      },
    });
  };

  if (!selectedStore) {
    return (
      <EmptyStoreState
        title="No Store Selected"
        description="Create a store before adding subcategories to organize your product catalog."
      />
    );
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.subcategory} />

      <PageHeader
        icon={FolderTree}
        title="Add Subcategory"
        description="Create and manage subcategories for your products"
      />

      {/* categories */}
      {/* <div className="bg-card rounded-lg border">
        <div className="space-y-1 border-b p-5">
          <h2 className="text-sm font-semibold">Categories</h2>
          <p className="text-muted-foreground text-xs">Select a category</p>
        </div>

        <div className="space-y-2 divide-y px-5 py-2.5">
          {categories?.data?.map((category) => (
            <button key={category.id} className="flex items-center gap-2">
              <img
                src={`https://ecomback.bfinit.com${category.image}`}
                alt={category.name}
                className="size-12 object-contain"
              />
              <p>{category.name}</p>
            </button>
          ))}
        </div>
      </div> */}

      {selectedStore?.storeId && (
        <div className="mt-6 grid grid-cols-1 items-start gap-6 md:grid-cols-12">
          {/* Left Side: Add Sub-Category Form */}
          <div className="sticky top-4 col-span-1 md:col-span-12 lg:col-span-4">
            <Card className="border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">New Subcategory</CardTitle>
                <CardDescription>
                  Select a parent category and define sub-items.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {categories?.data?.length > 0 ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-foreground/80">
                        Parent Category
                      </Label>
                      <Select
                        value={selectedCategory}
                        onValueChange={handleCategoryChange}
                      >
                        <SelectTrigger id="category" className="w-full">
                          <SelectValue placeholder="Select a category" />
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

                    {selectedCategory && (
                      <div className="animate-in fade-in slide-in-from-top-2 space-y-4 duration-300">
                        <div className="space-y-2">
                          <Label
                            htmlFor="subCategoryName"
                            className="text-foreground/80"
                          >
                            Add Sub-items
                          </Label>
                          <div className="relative flex items-center">
                            <Input
                              type="text"
                              id="subCategoryName"
                              value={subCategoryInput}
                              onChange={(e) =>
                                setSubCategoryInput(e.target.value)
                              }
                              onKeyDown={handleSubCategories}
                              placeholder="e.g. Wireless, Gaming..."
                              className="pr-20"
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              disabled={!subCategoryInput}
                              className="text-dashboard-primary hover:text-dashboard-primary hover:bg-dashboard-primary/10 absolute top-1 right-1 h-7 px-3 text-xs font-medium"
                              onClick={handleSubCategories}
                            >
                              ADD
                            </Button>
                          </div>
                          <p className="text-muted-foreground text-[0.8rem]">
                            Press Enter to add to the list below.
                          </p>
                        </div>

                        {/* Staged Tags Area */}
                        {subCategoires.length > 0 && (
                          <div className="bg-muted/30 rounded-md border p-3">
                            <div className="flex flex-wrap gap-2">
                              {subCategoires.map((subCat, i) => (
                                <div
                                  key={i}
                                  className="group bg-dashboard-primary inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm text-white shadow-sm transition-all hover:shadow-md"
                                >
                                  <span>{subCat}</span>
                                  <button
                                    className="text-white/70 transition-colors hover:text-white"
                                    onClick={() => removeSubCategory(i)}
                                  >
                                    <CircleX className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <Button
                          disabled={subCategoires.length === 0 || isPending}
                          onClick={handleAddSubCategory}
                          className="bg-dashboard-primary hover:bg-dashboard-primary/90 w-full text-white"
                        >
                          {isPending ? (
                            <div className="flex items-center gap-2">
                              <Spinner className="text-white" /> Saving...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Plus className="h-4 w-4" /> Save Subcategories
                            </div>
                          )}
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-8 text-center">
                    <Layers className="text-muted-foreground/50 mb-3 h-10 w-10" />
                    <p className="text-muted-foreground mb-4 max-w-[200px] text-sm">
                      No categories found. Create a category first.
                    </p>
                    <Button variant="outline" asChild>
                      <Link to="/products/category">Create Category</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Side: List of Sub-Categories */}
          <div className="col-span-1 md:col-span-12 lg:col-span-8">
            <Card className="border-border/60 flex h-full flex-col shadow-sm">
              <CardHeader className="bg-muted/10 border-b pb-4">
                <CardTitle className="text-lg">
                  Existing Subcategories
                </CardTitle>
                <CardDescription>
                  {selectedCategory
                    ? "Manage items within the selected category"
                    : "Select a category to view and manage items"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                {selectedCategory ? (
                  subCategoriesData && subCategoriesData?.data?.length > 0 ? (
                    <div className="custom-scrollbar max-h-[600px] overflow-y-auto">
                      {subCategoriesData?.data?.map((subCategory, i) => (
                        <SubCategoryList
                          key={i}
                          subCategory={subCategory}
                          categoryId={selectedCategory}
                          storeId={selectedStore?.storeId}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="bg-muted/50 mb-3 rounded-full p-4">
                        <FolderTree className="text-muted-foreground h-8 w-8" />
                      </div>
                      <h3 className="text-foreground text-sm font-semibold">
                        No subcategories yet
                      </h3>
                      <p className="text-muted-foreground mt-1 text-sm">
                        Use the form on the left to add your first one.
                      </p>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-3 py-20 text-center">
                    <div className="bg-muted/30 rounded-full p-6">
                      <Layers className="text-muted-foreground/40 h-10 w-10" />
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Select a category from the dropdown to load data.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </section>
  );
}
