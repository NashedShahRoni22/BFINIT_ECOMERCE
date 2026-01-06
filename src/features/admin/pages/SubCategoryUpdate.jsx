import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FolderTree, Tag, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useGetCategories from "../hooks/category/useGetCategories";
import useSelectedStore from "@/hooks/useSelectedStore";
import usePostMutation from "@/hooks/api/usePostMutation";
import useAuth from "@/hooks/auth/useAuth";
import useGetSubCategories from "../hooks/category/useGetSubCategories";
import EmptyStoreState from "../components/EmptyStoreState";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import PageHeader from "../components/PageHeader";
import AddSubCategory from "../components/sections/sub-category/AddSubCategory";

export default function SubCategoryUpdate() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { selectedStore } = useSelectedStore();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryInput, setSubCategoryInput] = useState("");
  const [subCategoires, setSubCategories] = useState([]);

  // fetch categories based on storeId
  const { data: categories } = useGetCategories(selectedStore?.storeId);
  // fetch sub-categories based on storeId & categoryId
  const { data: subCategoriesData } = useGetSubCategories(
    selectedStore?.storeId,
    selectedCategory,
  );

  // custom hooks to create new sub-category
  const { mutate, isPending } = usePostMutation({
    endpoint: `/subcategory/create/${selectedStore?.storeId}/${selectedCategory}`,
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  // handle category select dropdown
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  // handle add sub-categories array in local state
  const handleSubCategories = (e) => {
    if (!subCategoryInput) {
      return;
    }

    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      setSubCategories([...subCategoires, subCategoryInput]);
      setSubCategoryInput("");
    }
  };

  // remove sub-category from local subCategories array
  const removeSubCategory = (indexToRemove) => {
    const filteredSubCategories = subCategoires.filter(
      (_, index) => index !== indexToRemove,
    );
    setSubCategories(filteredSubCategories);
  };

  // Add New Sub-Category
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

  const addSubCategoryProps = {
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
    <div className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.Subcategory} />

      <PageHeader
        icon={FolderTree}
        title="Subcategory Management"
        description="Subcategory Management Create and organize subcategories for"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Panel - Add Form */}
        <AddSubCategory {...addSubCategoryProps} />

        {/* Right Panel - Grid View */}
        <div className="lg:col-span-2">
          <div className="bg-card border-border overflow-hidden rounded-lg border">
            <div className="bg-muted border-border border-b px-6 py-4">
              <h2 className="text-card-foreground text-sm font-semibold">
                All Subcategories
              </h2>
              {selectedCategory && categories?.data && (
                <p className="text-muted-foreground mt-0.5 text-xs">
                  {categories.data.find((c) => c.id === selectedCategory)?.name}{" "}
                  • {subCategoriesData?.data?.length || 0} items
                </p>
              )}
            </div>

            <div className="p-6">
              {!selectedCategory ? (
                <div className="py-16 text-center">
                  <div className="bg-muted/50 mb-3 inline-flex rounded-full p-3">
                    <FolderTree className="text-muted-foreground size-6" />
                  </div>
                  <h3 className="mb-1.5 text-sm font-semibold">
                    No Category Selected
                  </h3>
                  <p className="text-muted-foreground mx-auto max-w-md text-center text-xs">
                    Select a category from the left panel to view its
                    subcategories
                  </p>
                </div>
              ) : subCategoriesData?.data?.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {subCategoriesData.data.map((subCategory, i) => (
                    <div
                      key={i}
                      className="group bg-card border-border hover:border-primary/50 relative rounded-lg border p-5 transition-all duration-200 hover:shadow-sm"
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div className="bg-muted group-hover:bg-accent flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                          <Tag className="text-foreground h-5 w-5" />
                        </div>
                        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <h4 className="text-foreground truncate font-semibold">
                        {subCategory}
                      </h4>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <div className="bg-muted mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
                    <Tag className="text-muted-foreground h-8 w-8" />
                  </div>
                  <h3 className="text-foreground mb-2 text-lg font-medium">
                    No Subcategories Yet
                  </h3>
                  <p className="text-muted-foreground">
                    Start by adding your first subcategory using the form on the
                    left
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
