import SunEditor from "suneditor-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, FileText } from "lucide-react";
import useAuth from "@/hooks/auth/useAuth";
import useSelectedStore from "@/hooks/useSelectedStore";
import { Spinner } from "@/components/ui/spinner";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import EmptyStoreState from "@/features/admin/components/EmptyStoreState";
import InfoBanner from "@/features/admin/components/sections/support/InfoBanner";
import QuickTips from "@/features/admin/components/sections/home/QuickTips";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { usePostMutation } from "@/hooks-v2/api/usePostMutation";
import usePatchMutation from "@/hooks-v2/api/usePatchMutation";

export default function TermsConditionsForm() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { selectedStore } = useSelectedStore();

  const { data: termsConditions, isLoading } = useGetQuery({
    endpoint: `/api/v1/general/termsAndConditions/1`,
    isTokenRequired: true,
    clientId: true,
    queryKey: ["/store/storeterms", 1], //todo: update id to dynamic
    enabled: true, //todo: update it to dynamic
  });

  const { mutate: postMutate, isPending: postLoading } = usePostMutation({
    endpoint: `/api/v1/general/termsAndConditions`,
    isTokenRequired: true,
    clientId: true,
  });

  const { mutate, isPending } = usePatchMutation({
    endpoint: `/api/v1/general/termsAndConditions/1`, //todo: update id to dynamic
    isTokenRequired: true,
    clientId: user?.data?.clientId,
  });

  const [content, setContent] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const isEmptyHtml = (html) => {
    if (!html) return true;
    const text = html.replace(/<[^>]+>/g, "").trim();
    return text.length === 0;
  };

  useEffect(() => {
    if (
      // selectedStore?.storeId &&   //todo: update it to dynamic
      !isLoading &&
      termsConditions?.data?.description
    ) {
      const initialContent = isEmptyHtml(termsConditions?.data?.description)
        ? ""
        : termsConditions?.data?.description;
      setContent(initialContent);
      setHasUnsavedChanges(false);
    } else {
      setContent("");
      setHasUnsavedChanges(false);
    }
  }, [selectedStore?.storeId, isLoading, termsConditions?.data?.description]);

  const handleContentChange = (content) => {
    setContent(content);
    setHasUnsavedChanges(content !== termsConditions?.data?.description);
  };

  const handlePublishContent = () => {
    if (!content?.trim()) {
      return toast.error("Terms & Conditions can't be empty!");
    }

    const payload = { description: content, store_id: 4 }; //todo: update the id to dynamic
    console.log(payload);

    if (termsConditions?.data?.description) {
      mutate(payload, {
        onSuccess: () => {
          toast.success(
            termsConditions?.data
              ? "Terms & Conditions updated!"
              : "Terms & Conditions created!",
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
    } else {
      postMutate(payload, {
        onSuccess: () => {
          toast.success("Terms And Conditions created successfully!");
          setHasUnsavedChanges(false);
          queryClient.invalidateQueries([
            "/privacy-policy",
            // selectedStore?.storeId,
            4, //todo: update it to dynamic
          ]);
        },

        onError: () => {
          toast.error("Failed to create Terms And Conditions!");
        },
      });
    }
  };

  const isDisabled =
    termsConditions?.data === content ||
    !hasUnsavedChanges ||
    !content.trim() ||
    postLoading ||
    isPending;

  //   if (!selectedStore) {
  //     return (
  //       <EmptyStoreState
  //         title="Store Required"
  //         description="Create a store first to define your terms and conditions for customers."
  //       />
  //     );
  //   }

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={breadcrubms.Terms} />

      {/* Page Header */}
      <PageHeader
        icon={FileText}
        title="Terms & Conditions"
        description="Create and update terms of service for"
      />

      <div className="bg-card space-y-6 rounded-lg p-5">
        {termsConditions?.data && <InfoBanner />}

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
            ) : termsConditions?.data ? (
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
