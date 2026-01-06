import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import usePostMutation from "@/hooks/api/usePostMutation";
import useSelectedStore from "@/hooks/useSelectedStore";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function AddCategoryDialog({ dialogOpen, setDialogOpen }) {
  const queryClient = useQueryClient();
  const { selectedStore } = useSelectedStore();

  const { mutate, isPending } = usePostMutation({
    endpoint: `/category/create/${selectedStore?.storeId}`,
    token: true,
    clientId: true,
  });

  const imageRef = useRef();

  const form = useForm({
    defaultValues: {
      name: "",
      image: null,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const handleFormClose = () => {
    setDialogOpen(false);
    reset();
  };

  const handleImgChange = (e, onChange) => {
    const files = e.target.files;
    const file = files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    if (file.size > 2000 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }

    const imgData = {
      id: crypto.randomUUID(),
      file: file,
      preview: URL.createObjectURL(file),
      name: file.name,
      isNew: true,
    };

    onChange(imgData);
  };

  const onSubmit = (data) => {
    const categoryPayload = new FormData();
    categoryPayload.append("categoryName", data.name);
    categoryPayload.append("categoryImage", data.image.file);

    mutate(categoryPayload, {
      onSuccess: () => {
        queryClient.invalidateQueries(["categories", selectedStore?.storeId]);
        handleFormClose();
        toast.success("Category created successfully");
      },
      onError: () => {
        toast.error("Failed to create category. Please try again.");
      },
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <h2 className="text-sm font-semibold">Add Category</h2>
          <DialogDescription className="text-xs">
            Create a new category to organize your products
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="image"
              rules={{ required: "Please upload a category image" }}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="shrink-0 space-y-2">
                      <div
                        onClick={() => imageRef?.current?.click()}
                        className={`bg-muted group hover:border-foreground/50 flex size-20 items-center justify-center overflow-hidden rounded-md border border-dashed transition-colors hover:cursor-pointer ${
                          errors.image
                            ? "border-destructive hover:border-destructive"
                            : ""
                        }`}
                      >
                        {field.value ? (
                          <img
                            src={field.value.preview}
                            alt="Category preview"
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-1">
                            <Image
                              strokeWidth={1.5}
                              className="text-muted-foreground group-hover:text-foreground size-6"
                            />
                            <span className="text-muted-foreground text-[10px]">
                              Upload
                            </span>
                          </div>
                        )}
                      </div>

                      <input
                        ref={imageRef}
                        onChange={(e) => handleImgChange(e, field.onChange)}
                        type="file"
                        accept="image/png,image/jpg,image/jpeg,image/webp"
                        className="hidden"
                      />

                      <FormMessage className="text-xs" />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Please enter a category name" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Category Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Electronics" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleFormClose}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={isPending}
                className="text-xs"
              >
                {isPending ? "Adding..." : "Add Category"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
