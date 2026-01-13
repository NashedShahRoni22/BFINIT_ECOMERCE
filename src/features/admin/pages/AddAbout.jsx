import { ChevronLeft, Info } from "lucide-react";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import EmptyStoreState from "../components/EmptyStoreState";
import PageHeader from "../components/PageHeader";
import useSelectedStore from "@/hooks/useSelectedStore";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import useGetQuery from "@/hooks/api/useGetQuery";
import usePostMutation from "@/hooks/api/usePostMutation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import SunEditor from "suneditor-react";
import QuickTips from "../components/sections/support/QuickTips";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import InfoBanner from "../components/sections/support/InfoBanner";

export default function AddAbout() {
  const queryClient = useQueryClient();
  const { selectedStore } = useSelectedStore();

  const { data: aboutContent, isLoading } = useGetQuery({
    endpoint: `/store/aboutData/${selectedStore?.storeId}`,
    token: true,
    clientId: true,
    queryKey: ["/store/aboutData", selectedStore?.storeId],
    enabled: !!selectedStore?.storeId,
  });

  const { mutate, isPending } = usePostMutation({
    endpoint: `/store/about/${selectedStore?.storeId}`,
    token: true,
    clientId: true,
  });

  const [content, setContent] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const isEmptyHtml = (html) => {
    if (!html) return true;
    const text = html.replace(/<[^>]+>/g, "").trim();
    return text.length === 0;
  };

  const handleContentChange = (content) => {
    setContent(content);
    setHasUnsavedChanges(content !== aboutContent?.aboutDescription);
  };

  useEffect(() => {
    if (
      selectedStore?.storeId &&
      !isLoading &&
      aboutContent?.aboutDescription
    ) {
      const initialContent = isEmptyHtml(aboutContent?.aboutDescription)
        ? ""
        : aboutContent?.aboutDescription;
      setContent(initialContent);
      setHasUnsavedChanges(false);
    } else {
      setContent("");
      setHasUnsavedChanges(false);
    }
  }, [selectedStore?.storeId, isLoading, aboutContent?.aboutDescription]);

  const handlePublishContent = () => {
    if (!content?.trim()) {
      return toast.error("About Content can't be empty!");
    }

    const payload = { aboutDescription: content };

    mutate(payload, {
      onSuccess: () => {
        toast.success("About content created!");
        setHasUnsavedChanges(false);
        queryClient.invalidateQueries([
          "/store/aboutData",
          selectedStore?.storeId,
        ]);
      },

      onError: () => {
        toast.error("Something went wrong!");
      },
    });
  };

  const isDisabled =
    aboutContent?.aboutDescription === content ||
    !hasUnsavedChanges ||
    !content.trim() ||
    isPending;

  if (!selectedStore) {
    return (
      <EmptyStoreState
        title="Store Required"
        description="Create a store before adding shopping instructions for your customers."
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
        description="Create and update about page for"
      />

      <div className="bg-card space-y-6 rounded-lg p-5">
        {aboutContent?.aboutDescription && <InfoBanner />}

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
            onClick={handlePublishContent}
            size="sm"
            className="text-xs"
          >
            {isPending ? (
              <Spinner />
            ) : aboutContent?.aboutDescription ? (
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
