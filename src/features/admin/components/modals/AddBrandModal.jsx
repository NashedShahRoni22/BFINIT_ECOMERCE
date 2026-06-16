import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Image } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
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
import { Spinner } from "@/components/ui/spinner";
import usePostMutation from "@/hooks-v2/api/usePostMutation";
import useSelectedStore from "@/hooks/useSelectedStore";

export default function AddBrandModal({ dialogOpen, setDialogOpen }) {
  const queryClient = useQueryClient();
  const { activeStore } = useSelectedStore();

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

  const handleFormClose = () => {
    setDialogOpen(false);
    reset();
  };

  const { mutate, isPending } = usePostMutation({
    endpoint: "/api/v1/brand",
    isTokenRequired: true,
  });

  const onSubmit = (data) => {
    const payload = new FormData();
    payload.append("name", data.name);
    payload.append("store_id", activeStore?.id);
    payload.append("image", data.image.file);

    mutate(payload, {
      onSuccess: (data) => {
        if (!data?.success) {
          return toast.error(data?.message);
        }
        handleFormClose();
        toast.success(data?.message);
        queryClient.invalidateQueries(["brands"]);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <h2 className="text-sm font-semibold">Add Brand</h2>
          <DialogDescription className="text-xs">
            Create a new brand to organize your products
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="image"
              rules={{ required: "Please upload a brand image" }}
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
                            alt="Brand preview"
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
                      <p className="text-muted-foreground text-xs">
                        PNG, JPG, WEBP. Max 2MB.
                      </p>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Please enter a brand name" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Brand Name</FormLabel>
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
              >
                Cancel
              </Button>

              <Button
                disabled={isPending}
                type="submit"
                size="sm"
                className="min-w-[104px]"
              >
                {isPending ? (
                  <>
                    <Spinner /> Adding...
                  </>
                ) : (
                  "Add Brand"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
