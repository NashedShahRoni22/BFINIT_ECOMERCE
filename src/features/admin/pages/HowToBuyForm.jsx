import SunEditor from "suneditor-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import useAuth from "@/hooks/auth/useAuth";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetQuery from "@/hooks/api/useGetQuery";
import useUpdateMutation from "@/hooks/api/useUpdateMutation";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import { Spinner } from "@/components/ui/spinner";
import EmptyStoreState from "../components/EmptyStoreState";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import InfoBanner from "../components/sections/support/InfoBanner";
import QuickTips from "../components/sections/support/QuickTips";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function HowToBuyForm() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { selectedStore } = useSelectedStore();
  const { data: buyingGuide, isLoading } = useGetQuery({
    endpoint: `/store/howtobuy/${selectedStore?.storeId}`,
    queryKey: ["/store/howtobuy", selectedStore?.storeId],
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
    if (selectedStore?.storeId && !isLoading && buyingGuide?.data) {
      const initialContent = isEmptyHtml(buyingGuide?.data)
        ? ""
        : buyingGuide?.data;
      setContent(initialContent);
      setHasUnsavedChanges(false);
    } else {
      setContent("");
      setHasUnsavedChanges(false);
    }
  }, [selectedStore?.storeId, isLoading, buyingGuide?.data]);

  const { mutate, isPending } = useUpdateMutation({
    endpoint: `/store/update/howtobuy/${selectedStore?.storeId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  const handleContentChange = (content) => {
    setContent(content);
    setHasUnsavedChanges(content !== buyingGuide?.data);
  };

  const handlePublishContent = () => {
    if (!content?.trim()) {
      return toast.error("Buying Guide can't be empty!");
    }

    const payload = { data: content };

    mutate(payload, {
      onSuccess: () => {
        toast.success(
          buyingGuide?.data ? "Buying Guide updated!" : "Buying Guide created!",
        );
        setHasUnsavedChanges(false);
        queryClient.invalidateQueries([
          "/store/howtobuy",
          selectedStore?.storeId,
        ]);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    });
  };

  const isDisabled =
    buyingGuide?.data === content ||
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
      <DynamicBreadcrumb items={breadcrubms.BuyGuide} />

      {/* Page Header */}
      <PageHeader
        icon={ShoppingBag}
        title="How to Buy"
        description="Create and update buying guide for"
      />

      <div className="bg-card space-y-6 rounded-lg p-5">
        {buyingGuide?.data && <InfoBanner />}

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
            ) : buyingGuide?.data ? (
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
