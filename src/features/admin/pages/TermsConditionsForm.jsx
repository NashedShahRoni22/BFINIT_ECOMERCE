import SunEditor from "suneditor-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { FileText } from "lucide-react";
import useAuth from "@/hooks/auth/useAuth";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetQuery from "@/hooks/api/useGetQuery";
import useUpdateMutation from "@/hooks/api/useUpdateMutation";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import { Spinner } from "@/components/ui/spinner";
import EmptyState from "../components/EmptyState";

const SUPPORT_BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Support",
    dropdown: [
      { label: "Help Center", href: "/support/help-center" },
      { label: "Return & Refunds", href: "/support/returns-refunds" },
      { label: "How to Buy", href: "/support/how-to-buy" },
    ],
  },
  { label: "Terms & Conditions" },
];

export default function TermsConditionsForm() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { selectedStore } = useSelectedStore();
  const { data: termsConditions, isLoading } = useGetQuery({
    endpoint: `/store/storeterms/${selectedStore?.storeId}`,
    queryKey: ["/store/storeterms", selectedStore?.storeId],
    enabled: !!selectedStore?.storeId,
  });
  const [content, setContent] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const isEmptyHtml = (html) => {
    if (!html) return true;
    const text = html.replace(/<[^>]+>/g, "").trim();
    return text.length === 0;
  };

  useEffect(() => {
    if (selectedStore?.storeId && !isLoading && termsConditions?.data) {
      const initialContent = isEmptyHtml(termsConditions?.data)
        ? ""
        : termsConditions?.data;
      setContent(initialContent);
      setHasUnsavedChanges(false);
    } else {
      setContent("");
      setHasUnsavedChanges(false);
    }
  }, [selectedStore?.storeId, isLoading, termsConditions?.data]);

  const { mutate, isPending } = useUpdateMutation({
    endpoint: `/store/update/storeterms/${selectedStore?.storeId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  const handleContentChange = (content) => {
    setContent(content);
    setHasUnsavedChanges(content !== termsConditions?.data);
  };

  const handlePublishContent = () => {
    if (!content?.trim()) {
      return toast.error("Terms & Conditions can't be empty!");
    }

    const payload = { data: content };

    mutate(payload, {
      onSuccess: () => {
        toast.success(
          termsConditions?.data
            ? "Terms & Conditions updated!"
            : "Terms & Conditions created!"
        );
        setHasUnsavedChanges(false);
        queryClient.invalidateQueries([
          "/store/storeterms",
          selectedStore?.storeId,
        ]);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    });
  };

  const isDisabled =
    termsConditions?.data === content ||
    !hasUnsavedChanges ||
    !content.trim() ||
    isPending;

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={SUPPORT_BREADCRUMB_ITEMS} />

      {/* Page Header */}
      <PageHeader
        icon={FileText}
        title="Terms & Conditions"
        description="Create and update terms of service for"
      />

      {selectedStore?.storeId ? (
        <div className="">
          <small className="mb-2 inline-block text-xs text-neutral-500">
            Write helpful content to assist your customers
          </small>
          <SunEditor
            name="content"
            height="400px"
            setContents={content}
            onChange={handleContentChange}
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
              charCounter: true,
            }}
          />
          <div className="mt-4 flex items-center justify-end">
            <button
              type="button"
              disabled={isDisabled}
              onClick={handlePublishContent}
              className={`inline-flex min-h-[38px] min-w-[138px] items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white transition-all duration-200 ease-linear outline-none ${
                isDisabled
                  ? "bg-dashboard-primary/50 cursor-not-allowed"
                  : "bg-dashboard-primary hover:bg-dashboard-primary-hover cursor-pointer"
              }`}
            >
              {isPending ? (
                <Spinner />
              ) : termsConditions?.data ? (
                "Update Article"
              ) : (
                "Publish Article"
              )}
            </button>
          </div>
        </div>
      ) : (
        <EmptyState description="Please select a store to manage Terms & Conditions Content." />
      )}
    </section>
  );
}
