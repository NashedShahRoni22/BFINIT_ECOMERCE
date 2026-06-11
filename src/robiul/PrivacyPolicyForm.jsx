import { ChevronLeft, FileQuestionMark, Info, Shield } from "lucide-react";
// import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
// import EmptyStoreState from "../components/EmptyStoreState";
// import PageHeader from "../components/PageHeader";
import useSelectedStore from "@/hooks/useSelectedStore";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
// import useGetQuery from "@/hooks/api/useGetQuery";
// import usePostMutation from "@/hooks/api/usePostMutation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import SunEditor from "suneditor-react";
// import QuickTips from "../components/sections/support/QuickTips";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Spinner } from "@/components/ui/spinner";
// import InfoBanner from "../components/sections/support/InfoBanner";
// import usePatchMutaion from "@/hooks/api/usePatchMutaion";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import EmptyStoreState from "@/features/admin/components/EmptyStoreState";
import PageHeader from "@/components/shared/PageHeader";
import InfoBanner from "@/features/admin/components/sections/support/InfoBanner";
import QuickTips from "@/features/admin/components/sections/home/QuickTips";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { usePostMutation } from "@/hooks-v2/api/usePostMutation";
import usePatchMutation from "@/hooks-v2/api/usePatchMutation";

export default function PrivacyPoliceForm() {
  const queryClient = useQueryClient();
  const { selectedStore } = useSelectedStore();

  const { data: privacyData, isLoading } = useGetQuery({
    endpoint: `/api/v1/general/privacyPolicy/1`, //todo: update id to dynamic
    isTokenRequired: true,
    clientId: true,
    queryKey: ["/privacyPolice", 1], //todo: update id to dynamic
    enabled: true, //todo: update it to dynamic
  });

  //   console.log(privacyData);

  const { mutate, isPending } = usePostMutation({
    endpoint: `/api/v1/general/privacyPolicy`,
    isTokenRequired: true,
    clientId: true,
  });

  const { mutate: updateMutate, isPending: isUpdatePending } = usePatchMutation(
    {
      endpoint: `/api/v1/general/privacyPolicy/1`, //todo: update id to dynamic
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
    setHasUnsavedChanges(content !== privacyData?.data?.description);
  };

  useEffect(() => {
    if (
      //   selectedStore?.storeId && //todo: update it to dynamic
      !isLoading &&
      privacyData?.data?.description
    ) {
      const initialContent = isEmptyHtml(privacyData?.data?.description)
        ? ""
        : privacyData?.data?.description;
      setContent(initialContent);
      setHasUnsavedChanges(false);
    } else {
      setContent("");
      setHasUnsavedChanges(false);
    }
  }, [isLoading, privacyData?.data?.description]);

  const handlePublishContent = () => {
    if (!content?.trim()) {
      return toast.error("Privacy Policy content can't be empty!");
    }

    const payload = { description: content, store_id: 4 };
    console.log(payload);

    if (privacyData?.data?.description) {
      updateMutate(payload, {
        onSuccess: () => {
          toast.success("Privacy Policy updated successfully!");
          setHasUnsavedChanges(false);
          queryClient.invalidateQueries([
            "/privacy-policy",
            // selectedStore?.storeId,
            4, //todo: update it to dynamic
          ]);
        },

        onError: () => {
          toast.error("Failed to update Privacy Policy!");
        },
      });
    } else {
      mutate(payload, {
        onSuccess: () => {
          toast.success("Privacy Policy created successfully!");
          setHasUnsavedChanges(false);
          queryClient.invalidateQueries([
            "/privacy-policy",
            // selectedStore?.storeId,
            4, //todo: update it to dynamic
          ]);
        },

        onError: () => {
          toast.error("Failed to create Privacy Policy!");
        },
      });
    }
  };

  const isDisabled =
    privacyData?.data?.description === content ||
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
      <DynamicBreadcrumb items={breadcrubms.Privacy} />

      {/* Page Header */}
      <PageHeader
        icon={Shield}
        title="Privacy Policy"
        description="Create and update Privacy Policy page for"
      />

      <div className="bg-card space-y-6 rounded-lg p-5">
        {privacyData?.data?.description && <InfoBanner />}

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
            ) : privacyData?.data?.description ? (
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
