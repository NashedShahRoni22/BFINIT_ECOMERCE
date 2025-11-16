import { useEffect, useState } from "react";
import { Link } from "react-router";
import { BsInfoCircle } from "react-icons/bs";
import ActionBtn from "../../../components/admin/buttons/ActionBtn";
import toast from "react-hot-toast";
import FormInput from "../../../components/admin/FormInput";
import usePostMutation from "../../../hooks/mutations/usePostMutation";
import useAuth from "../../../hooks/auth/useAuth";
import useGetAllMeta from "../../../hooks/meta/getAllMeta";
import useUpdateMutation from "../../../hooks/mutations/useUpdateMutation";
import { useQueryClient } from "@tanstack/react-query";
import EmptyState from "../../../components/admin/EmptyState";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Search, SlashIcon } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import useSelectedStore from "@/hooks/stores/useSelectedStore";

export default function AddSeo() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { selectedStore } = useSelectedStore();

  const [formData, setFormData] = useState({
    metaId: "",
    metaTitle: "",
    metaDescription: "",
  });

  const { data: metaData, isLoading } = useGetAllMeta(selectedStore?.storeId);

  const isDisabled = !formData.metaTitle || !formData.metaDescription;
  const isUpdate =
    metaData?.data?.length > 0
      ? metaData.data[0].Title && metaData.data[0].Description
        ? true
        : false
      : false;

  // set formData with default meta data if already added
  useEffect(() => {
    if (!isLoading && metaData?.data?.length > 0) {
      const firstMeta = metaData.data[0];
      setFormData({
        metaId: firstMeta.id,
        metaTitle: firstMeta.Title,
        metaDescription: firstMeta.Description,
      });
    }
  }, [isLoading, metaData]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle textarea change for description
  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, metaDescription: value }));
  };

  // add seo post hook
  const { mutate, isPending } = usePostMutation({
    endpoint: `/meta/create/${selectedStore?.storeId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  // update seo
  const { mutate: updateMeta, isPending: isUpdatePending } = useUpdateMutation({
    endpoint: `/meta/update/${formData.metaId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.metaTitle || !formData.metaDescription) {
      return toast.error("Please fill in all required fields");
    }

    if (!isUpdate) {
      mutate(formData, {
        onSuccess: (data) => {
          toast.success(data?.message);
          queryClient.invalidateQueries(["storeMeta", selectedStore?.storeId]);
        },

        onError: (error) => {
          toast.error(error?.message || "Something went wrong!");
          console.error(error);
        },
      });

      return;
    }

    updateMeta(formData, {
      onSuccess: (data) => {
        toast.success(data?.message);
        queryClient.invalidateQueries(["storeMeta", selectedStore?.storeId]);
      },

      onError: (error) => {
        toast.error(error?.message || "Something went wrong!");
        console.error(error);
      },
    });
  };

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>SEO & Meta</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <PageHeader
        icon={Search}
        title="SEO & Meta"
        description="Manage SEO settings and meta tags for"
      />

      {selectedStore?.storeId ? (
        <>
          <div className="mt-8 flex items-center justify-end gap-1 text-xs font-medium text-red-600/80">
            <BsInfoCircle className="size-4" />
            <p>* Required fields</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-6">
            {/* Meta Title */}
            <div>
              <FormInput
                label="Meta Title"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                placeholder="Enter meta title for your store"
                required
                maxLength={60}
              />

              <div className="mt-1 flex items-center justify-between text-xs text-neutral-500">
                <p>
                  This appears as the page title in search results and browser
                  tabs
                </p>
                <p
                  className={`${formData.metaTitle.length > 60 ? "text-red-500" : ""}`}
                >
                  {formData.metaTitle.length}/60
                </p>
              </div>
            </div>

            {/* Meta Description */}
            <div>
              <label
                htmlFor="metaDescription"
                className="mb-1.5 block text-sm font-medium"
              >
                Meta Description: <span className="text-red-600">*</span>
              </label>
              <textarea
                id="metaDescription"
                name="metaDescription"
                placeholder="Enter meta description for your store"
                rows={4}
                maxLength={160}
                required
                onChange={handleDescriptionChange}
                value={formData.metaDescription}
                className="w-full resize-none rounded border border-neutral-200 bg-neutral-50 px-4 py-3 outline-none focus:border-neutral-400"
              />
              <div className="mt-1 flex items-center justify-between text-xs text-neutral-500">
                <p>This appears as the description snippet in search results</p>
                <p
                  className={`${formData.metaDescription.length > 160 ? "text-red-500" : ""}`}
                >
                  {formData.metaDescription.length}/160
                </p>
              </div>
            </div>

            {/* Preview Section */}
            <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-3 text-sm font-semibold text-gray-700">
                Search Engine Preview Example:
              </h3>
              <div className="rounded border bg-white p-4">
                <div className="cursor-pointer text-lg font-medium text-blue-600 hover:underline">
                  {"Your Store Title"}
                </div>
                <div className="mt-1 text-sm text-green-700">
                  https://yourstore.com
                </div>
                <div className="mt-2 text-sm leading-relaxed text-gray-600">
                  {"Your store description will appear here..."}
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                type="button"
                // onClick={() => navigate("/seo")}
                className="min-h-10 rounded border border-gray-400 px-6 py-2 text-gray-800 transition-all duration-200 ease-linear hover:bg-gray-200 active:scale-[0.98]"
              >
                Cancel
              </button>

              <ActionBtn
                type="submit"
                disabled={isDisabled || isPending || isUpdatePending}
                loading={isPending || isUpdatePending}
              >
                {isUpdate ? "Update SEO & Meta Tags" : "Add SEO & Meta Tags"}
              </ActionBtn>
            </div>
          </form>
        </>
      ) : (
        <EmptyState description="Please select a store to add or update meta tags." />
      )}
    </section>
  );
}
