import { ChevronLeft, FileQuestionMark, Info } from "lucide-react";

import useSelectedStore from "@/hooks/useSelectedStore";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
// import useGetQuery from "@/hooks/api/useGetQuery";
// import usePostMutation from "@/hooks/api/usePostMutation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import SunEditor from "suneditor-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Spinner } from "@/components/ui/spinner";
// import usePatchMutaion from "@/hooks/api/usePatchMutaion";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import EmptyStoreState from "@/features/admin/components/EmptyStoreState";
import PageHeader from "@/components/shared/PageHeader";
import QuickTips from "@/features/admin/components/sections/home/QuickTips";
import InfoBanner from "@/features/admin/components/sections/support/InfoBanner";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { usePostMutation } from "@/hooks-v2/api/usePostMutation";
import usePatchMutation from "@/hooks-v2/api/usePatchMutation";

export default function FaqForm() {
  const queryClient = useQueryClient();
  const { selectedStore } = useSelectedStore();

  const { data: faqContent, isLoading } = useGetQuery({
    endpoint: `/api/v1/general/faq/4`, //todo: update the dynamic id
    isTokenRequired: true,
    clientId: true,
    queryKey: ["/faq", 4], // todo: query key should be dynamic
    enabled: true, //todo: this should be dynamic with !!selectedStore.storeId
  });

  const { mutate, isPending } = usePostMutation({
    endpoint: `/api/v1/general/faq`,
    isTokenRequired: true,
    clientId: true,
  });

  const { mutate: updateMutate, isPending: isUpdatePending } = usePatchMutation(
    {
      endpoint: `/api/v1/general/faq/4`, // todo: update the dynamic id
      isTokenRequired: true,
      clientId: true,
    },
  );

  const [content, setContent] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const isEmptyHtml = (html) => {
    if (!html) return true;
    const text = html.replace(/<[^>]+>/g, "").trim();
    return text.length === 0;
  };

  const handleContentChange = (content) => {
    setContent(content);
    setHasUnsavedChanges(content !== faqContent?.data?.description);
  };

  useEffect(() => {
    if (
      // selectedStore?.storeId && //todo: update it to dynamic
      !isLoading &&
      faqContent?.data?.description
    ) {
      const initialContent = isEmptyHtml(faqContent?.data?.description)
        ? ""
        : faqContent?.data?.description;
      setContent(initialContent);
      setHasUnsavedChanges(false);
    } else {
      setContent("");
      setHasUnsavedChanges(false);
    }
  }, [
    // selectedStore?.storeId,
    //todo: update it to dynamic
    isLoading,
    faqContent?.data?.description,
  ]);

  const handlePublishContent = () => {
    if (!content?.trim()) {
      return toast.error("Faq Content can't be empty!");
    }

    const payload = { description: content, title: "static title for all faq" }; //todo: title will be dynamic or be removed
    console.log(payload);

    if (faqContent?.data?.description) {
      updateMutate(payload, {
        onSuccess: () => {
          toast.success("Faq content updated!");
          setHasUnsavedChanges(false);
          queryClient.invalidateQueries([
            "/faq",
            //  selectedStore?.storeId
            4, //todo: update it to dynamic
          ]);
        },

        onError: () => {
          toast.error("Something went wrong!");
        },
      });
    } else {
      mutate(payload, {
        onSuccess: () => {
          toast.success("Faq content created!");
          setHasUnsavedChanges(false);
          queryClient.invalidateQueries([
            "/faq",
            //  selectedStore?.storeId
            6, //update it to dynamic
          ]);
        },

        onError: () => {
          toast.error("Something went wrong!");
        },
      });
    }
  };

  const isDisabled =
    faqContent?.data?.description === content ||
    !hasUnsavedChanges ||
    !content.trim() ||
    isPending ||
    isUpdatePending;

  //   if (!selectedStore) {
  //     return (
  //       <EmptyStoreState
  //         title="Store Required"
  //         description="Create a store before adding FAQ instructions for your customers."
  //       />
  //     );
  //   }

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={breadcrubms.Faq} />

      {/* Page Header */}
      <PageHeader
        icon={FileQuestionMark}
        title="FAQ"
        description="Create and update FAQ page for"
      />

      <div className="bg-card space-y-6 rounded-lg p-5">
        {faqContent?.data?.description && <InfoBanner />}

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
            ) : faqContent?.data?.description ? (
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
