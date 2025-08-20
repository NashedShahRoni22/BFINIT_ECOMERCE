import SunEditor from "suneditor-react";
import EmptyState from "../../../../components/admin/EmptyState";
import PageHeading from "../../../../components/admin/PageHeading/PageHeading";
import StoreSelector from "../../../../components/admin/StoreSelector";
import useStoreSelector from "../../../../hooks/stores/useStoreSelector";
import { useEffect, useState } from "react";
import useGetHelpContent from "../../../../hooks/support/useGetHelpContent";
import useUpdateMutation from "../../../../hooks/mutations/useUpdateMutation";
import useAuth from "../../../../hooks/auth/useAuth";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../../../../components/admin/loaders/Spinner";

export default function AddHelpCenter() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { stores, selectedStore, handleStoreChange } = useStoreSelector();
  const { data: helpContent, isLoading } = useGetHelpContent(
    selectedStore.storeId,
  );
  const [content, setContent] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const isEmptyHtml = (html) => {
    if (!html) return true;
    const text = html.replace(/<[^>]+>/g, "").trim();
    return text.length === 0;
  };

  useEffect(() => {
    if (selectedStore?.storeId && !isLoading && helpContent?.data) {
      const initialContent = isEmptyHtml(helpContent?.data)
        ? ""
        : helpContent?.data;
      setContent(initialContent);
      setHasUnsavedChanges(false);
    } else {
      setContent("");
      setHasUnsavedChanges(false);
    }
  }, [selectedStore?.storeId, isLoading, helpContent?.data]);

  const { mutate, isPending } = useUpdateMutation({
    endpoint: `/store/update/storehelp/${selectedStore.storeId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  const handleContentChange = (content) => {
    setContent(content);
    setHasUnsavedChanges(content !== helpContent?.data);
  };

  const handlePublishContent = () => {
    if (!content?.trim()) {
      return toast.error("Help Center Article can't be empty!");
    }

    const payload = { data: content };

    mutate(payload, {
      onSuccess: () => {
        toast.success(
          helpContent?.data ? "Help center updated!" : "Help center created!",
        );
        setHasUnsavedChanges(false);
        queryClient.invalidateQueries(["help", selectedStore.storeId]);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    });
  };

  const isDisabled =
    helpContent?.data === content ||
    !hasUnsavedChanges ||
    !content.trim() ||
    isPending;

  return (
    <section>
      <PageHeading heading="Add Help Center" />
      <StoreSelector
        stores={stores}
        selectedStore={selectedStore}
        onChange={handleStoreChange}
        titleWhenSelected="Adding Help Center Article for:"
        titleWhenEmpty="Select a Store to Manage Help Center"
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
              ) : helpContent?.data ? (
                "Update Article"
              ) : (
                "Publish Article"
              )}
            </button>
          </div>
        </div>
      ) : (
        <EmptyState description="Please select a store to manage Help Center Content." />
      )}
    </section>
  );
}
