import SunEditor from "suneditor-react";
import EmptyState from "../../../../components/admin/EmptyState";
import PageHeading from "../../../../components/admin/PageHeading/PageHeading";
import StoreSelector from "../../../../components/admin/StoreSelector";
import useStoreSelector from "../../../../hooks/stores/useStoreSelector";
import { useEffect, useState } from "react";
import useUpdateMutation from "../../../../hooks/mutations/useUpdateMutation";
import useAuth from "../../../../hooks/auth/useAuth";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../../../../components/admin/loaders/Spinner";
import useGetQuery from "../../../../hooks/queries/useGetQuery";

export default function TermsConditions() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { stores, selectedStore, handleStoreChange } = useStoreSelector();
  const { data: termsConditions, isLoading } = useGetQuery({
    endpoint: `/store/storeterms/${selectedStore.storeId}`,
    queryKey: ["/store/storeterms", selectedStore.storeId],
    enabled: !!selectedStore.storeId,
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
    endpoint: `/store/update/storeterms/${selectedStore.storeId}`,
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
            : "Terms & Conditions created!",
        );
        setHasUnsavedChanges(false);
        queryClient.invalidateQueries([
          "/store/storeterms",
          selectedStore.storeId,
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
    <section>
      <PageHeading heading="Add Terms & Conditions" />
      <StoreSelector
        stores={stores}
        selectedStore={selectedStore}
        onChange={handleStoreChange}
        titleWhenSelected="Adding Terms & Conditions Article for:"
        titleWhenEmpty="Select a Store to Manage Terms & Conditions"
      />

      {selectedStore.storeId ? (
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
              className={`inline-flex min-h-[38px] min-w-[138px] items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white transition-all duration-200 ease-linear outline-none ${isDisabled ? "bg-dashboard-primary/50 cursor-not-allowed" : "bg-dashboard-primary hover:bg-dashboard-primary-hover cursor-pointer"}`}
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
