import StorefrontLoader from "@/components/storefront/loader/StorefrontLoader";
import useTheme from "@/hooks/useTheme";

export default function Canvas({ children, isPreviewMode }) {
  const { isLoading, sections } = useTheme();

  if (isLoading) {
    return (
      <div
        className={`bg-background custom-scrollbar flex w-full items-center justify-center ${
          isPreviewMode ? "h-dvh" : "m-2 h-[calc(100dvh-79px)] rounded-md"
        }`}
      >
        <StorefrontLoader canvasHeight={true} />
      </div>
    );
  }

  // Check if sections exist AND are all empty
  const hasSections =
    sections?.header?.length > 0 ||
    sections?.body?.length > 0 ||
    sections?.footer?.length > 0;

  if (!isLoading && !hasSections) {
    return (
      <div className="flex h-96 flex-1 items-center justify-center text-gray-400">
        <p>Click &quot;Add&quot; to add sections to your page</p>
      </div>
    );
  }

  return (
    <div
      id="canvas"
      className={`bg-background custom-scrollbar w-full ${
        isPreviewMode
          ? "h-screen overflow-y-auto"
          : "m-2 h-[calc(100dvh-79px)] overflow-y-auto rounded-md"
      }`}
    >
      {children}
    </div>
  );
}
