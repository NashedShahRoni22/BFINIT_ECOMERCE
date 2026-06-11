import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, Info, Store } from "lucide-react";
import toast from "react-hot-toast";
import SunEditor from "suneditor-react";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import EmptyState from "@/components/shared/EmptyState";
import PageHeader from "../components/PageHeader";
import QuickTips from "../components/sections/support/QuickTips";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import InfoBanner from "../components/sections/support/InfoBanner";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import usePostMutation from "@/hooks-v2/api/usePostMutation";
import usePatchMutation from "@/hooks-v2/api/usePatchMutation";
import { breadcrubms } from "@/utils/constants/breadcrumbs";

const isEmptyHtml = (html) => {
  if (!html) return true;
  const text = html.replace(/<[^>]+>/g, "").trim();
  return text.length === 0;
};

export default function AddAbout() {
  const { activeStore } = useSelectedStore();

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/general/about/${activeStore?.id}`,
    enabled: !!activeStore?.id,
    isTokenRequired: true,
    queryKey: ["about", activeStore?.id],
  });

  const isEditMode = !!data?.data?.id;
  const [content, setContent] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const { mutate, isPending } = usePostMutation({
    endpoint: "/api/v1/general/about",
    isTokenRequired: true,
  });

  const { mutate: update, isPending: isUpdating } = usePatchMutation({
    endpoint: `/api/v1/general/about/${data?.data?.id}`,
    isTokenRequired: true,
  });

  const handleContentChange = (content) => {
    setContent(content);
    setHasUnsavedChanges(content !== data?.data?.description);
  };

  const onSubmit = () => {
    if (!content?.trim()) {
      return toast.error("Content cannot be empty");
    }

    const payload = { store_id: activeStore?.id, description: content };

    const onSuccess = (data) => {
      if (!data?.success) return toast.error(data?.message);
      toast.success(data?.message);
      setHasUnsavedChanges(false);
    };

    const onError = (error) => {
      console.log(error);
    };

    if (!isEditMode) {
      mutate(payload, {
        onSuccess,
        onError,
      });

      return;
    }

    update(payload, {
      onSuccess,
      onError,
    });
  };

  useEffect(() => {
    if (activeStore?.id && !isLoading && data?.data?.description) {
      const initialContent = isEmptyHtml(data?.data?.description)
        ? ""
        : data?.data?.description;
      setContent(initialContent);
      setHasUnsavedChanges(false);
    } else {
      setContent("");
      setHasUnsavedChanges(false);
    }
  }, [activeStore?.id, isLoading, data?.data?.description]);

  const isDisabled =
    data?.data?.description === content ||
    !hasUnsavedChanges ||
    !content.trim() ||
    isPending ||
    isUpdating;

  if (!activeStore) {
    return (
      <EmptyState
        icon={Store}
        title="Store Required"
        description="Create a store first to start adding your about page content."
        actionText="Create Store"
        actionPath="/stores/create"
      />
    );
  }

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={breadcrubms.AddAbout} />

      {/* Page Header */}
      <PageHeader
        icon={Info}
        title="About"
        description="Manage your store's about page content"
      />

      <div className="bg-card space-y-6 rounded-lg p-5">
        {isEditMode && <InfoBanner />}

        <div className="space-y-2">
          <h2 className="text-sm font-semibold">Article Content</h2>

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

          <QuickTips />
        </div>

        <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
          <Button variant="outline" size="sm" asChild className="text-xs">
            <Link to="/">
              <ChevronLeft /> Back to Home
            </Link>
          </Button>

          <Button
            disabled={isDisabled}
            onClick={onSubmit}
            size="sm"
            className="text-xs"
          >
            {isPending ? (
              <Spinner />
            ) : data?.data?.description ? (
              "Update Article"
            ) : (
              "Publish Article"
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
