import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SunEditor from "suneditor-react";
import { ChevronLeft, Upload, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import usePostMutation from "@/hooks/api/usePostMutation";
import useSelectedStore from "@/hooks/useSelectedStore";
import useUpdateMutation from "@/hooks/api/useUpdateMutation";

const maxFileSize = 2000 * 1024;

const handleFile = (files, onChange) => {
  const file = files[0];
  if (!file) return;

  // Validate file type
  if (!file.type.startsWith("image/")) {
    return;
  }

  // Validate file size
  if (file.size > maxFileSize) {
    toast.error("File size must be less than 2MB");
    return;
  }

  const imageData = {
    id: crypto.randomUUID(),
    file: file,
    preview: URL.createObjectURL(file),
    name: file.name,
  };

  onChange(imageData);
};

export default function BlogForm({ blogDetails }) {
  const { selectedStore } = useSelectedStore();
  const navigate = useNavigate();

  const imgRef = useRef();
  const sunEditorRef = useRef();

  const form = useForm({
    defaultValues: {
      blogImages: null,
      blogHeading: "",
      blogCustomUrl: "",
      blogDescription: "",
    },
  });

  const { handleSubmit, reset } = form;

  // Track original image URL for deletion on update
  const originalImageUrl = useRef(null);

  useEffect(() => {
    if (blogDetails?.blogId) {
      const { blogName, blogImage, blogCustomUrl, blogDescription } =
        blogDetails;

      // Store original image URL for later deletion
      originalImageUrl.current = blogImage[0];

      reset({
        blogImages: {
          preview: `https://ecomback.bfinit.com${blogImage[0]}`,
          isExisting: true, // Flag to identify existing image
        },
        blogHeading: blogName,
        blogCustomUrl,
        blogDescription,
      });
    }
  }, [blogDetails, reset]);

  const handleFileInput = (e, onChange) => {
    handleFile(e.target.files, onChange);
  };

  const handleDescriptionChange = (content) => {
    form.setValue("blogDescription", content);
  };

  const removeImage = (onChange, currentImage) => {
    if (currentImage && currentImage.preview && !currentImage.isExisting) {
      URL.revokeObjectURL(currentImage.preview);
    }
    if (imgRef.current) {
      imgRef.current.value = "";
    }
    onChange(null);
  };

  // Create mutation
  const { mutate: createMutate, isPending: isCreatePending } = usePostMutation({
    endpoint: `/blog/create/${selectedStore?.storeId}`,
    token: true,
    clientId: true,
  });

  // Update mutation
  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateMutation({
      endpoint: `/blog/update/${blogDetails?.blogId}`,
      token: true,
      clientId: true,
    });

  const onSubmit = (data) => {
    const { blogHeading, blogCustomUrl, blogDescription, blogImages } = data;

    const blogData = {
      blogHeading,
      blogCustomUrl,
      blogDescription,
    };

    const payload = new FormData();
    payload.append("blogData", JSON.stringify(blogData));

    // Check if we're updating
    if (blogDetails?.blogId) {
      // Only append new image if user selected one
      if (blogImages?.file) {
        payload.append("blogImages", blogImages.file);
        // Include original image URL for deletion as a stringified array
        payload.append(
          "deleteImageUrl",
          JSON.stringify([originalImageUrl.current]),
        );
      }

      updateMutate(payload, {
        onSuccess: () => {
          toast.success("Blog updated successfully!");
          navigate("/blogs/manage");
        },
        onError: () => {
          toast.error("Failed to update blog. Please try again.");
        },
      });
    } else {
      // Create new blog
      if (!blogImages?.file) {
        toast.error("Please add a blog image");
        return;
      }

      payload.append("blogImages", blogImages.file);

      createMutate(payload, {
        onSuccess: () => {
          toast.success("Blog published successfully!");
          navigate("/blogs/manage");
        },
        onError: () => {
          toast.error("Failed to publish blog. Please try again.");
        },
      });
    }
  };

  const isPending = isCreatePending || isUpdatePending;

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card space-y-6 space-x-4 rounded-lg border p-5 md:space-y-6 md:space-x-6"
      >
        {/* image */}
        <FormField
          control={form.control}
          name="blogImages"
          rules={{
            required: blogDetails?.blogId ? false : "Please add a blog image",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Featured Image <span className="text-destructive">*</span>
              </FormLabel>

              <FormControl>
                <div className="h-80 w-full">
                  {field.value ? (
                    <div className="group relative h-full">
                      <div className="bg-muted relative h-full w-full overflow-hidden rounded-md border">
                        <img
                          src={field.value.preview}
                          alt={field.value?.name || "Blog image"}
                          className="h-full w-full object-cover"
                        />
                        <button
                          onClick={() =>
                            removeImage(field.onChange, field.value)
                          }
                          type="button"
                          className="bg-destructive text-destructive-foreground absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-md shadow-sm transition-opacity hover:cursor-pointer hover:opacity-90 md:opacity-0 md:group-hover:opacity-100"
                          aria-label="Remove"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => imgRef.current?.click()}
                      className="bg-muted/25 hover:bg-muted/50 flex h-full flex-col items-center justify-center gap-3 rounded-md border border-dashed p-8 hover:cursor-pointer"
                    >
                      <div className="bg-muted rounded-full p-2.5">
                        <Upload className="size-3.5" />
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <h6 className="text-xs font-medium">Upload Image</h6>
                        <p className="text-muted-foreground text-xs">
                          Drag & drop your image here or{" "}
                          <span className="text-foreground font-medium">
                            browse
                          </span>
                        </p>
                      </div>
                      <div className="mt-1 flex flex-col items-center gap-1">
                        <p className="text-muted-foreground text-xs">
                          Maximum 2 MB • Recommended: 1200px × 675px (16:9)
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Supported formats: JPG, PNG & WebP
                        </p>
                      </div>
                    </div>
                  )}
                  {/* hidden file input */}
                  <input
                    ref={imgRef}
                    onChange={(e) => handleFileInput(e, field.onChange)}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    className="hidden"
                  />
                </div>
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* title & slug */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {/* title */}
          <FormField
            control={form.control}
            name="blogHeading"
            rules={{
              required: "Please enter a blog title",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">
                  Title <span className="text-destructive">*</span>
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="e.g., 10 Ways to Style Your Summer Wardrobe"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* slug */}
          <FormField
            control={form.control}
            name="blogCustomUrl"
            rules={{
              required: "Please enter a URL slug",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">
                  URL Slug <span className="text-destructive">*</span>
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="e.g., summer-wardrobe-styling-tips"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        {/* description */}
        <FormField
          control={form.control}
          name="blogDescription"
          rules={{
            required: "Please enter blog content",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Content <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <SunEditor
                  ref={sunEditorRef}
                  onChange={handleDescriptionChange}
                  name="blogDescription"
                  height="220px"
                  placeholder="Write your blog content here..."
                  setContents={field.value || ""}
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
                      ["fontSize", "fontColor", "hiliteColor", "removeFormat"],
                      ["align", "list", "outdent", "indent", "lineHeight"],
                      [
                        "blockquote",
                        "horizontalRule",
                        "table",
                        "link",
                        "image",
                        "video",
                      ],
                      ["fullScreen", "showBlocks", "preview"],
                    ],
                    charCounter: true,
                    charCounterLabel: "Characters:",

                    formats: [
                      "p",
                      "div",
                      "h1",
                      "h2",
                      "h3",
                      "h4",
                      "h5",
                      "h6",
                      "blockquote",
                    ],
                    fontSize: [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36],
                  }}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* back & submit buttons */}
        <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link to="/blogs/manage">
              <ChevronLeft /> Back to Blogs
            </Link>
          </Button>

          <Button
            disabled={isPending}
            type="submit"
            size="sm"
            className="min-w-28 text-xs"
          >
            {isPending ? (
              <>
                <Spinner size="3.5" />
                {blogDetails?.blogId ? "Updating..." : "Publishing..."}
              </>
            ) : blogDetails?.blogId ? (
              "Update Blog"
            ) : (
              "Publish Blog"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
