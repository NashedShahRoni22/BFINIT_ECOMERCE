import useTheme from "../../hooks/useTheme";

export default function Canvas({ children }) {
  const { sections } = useTheme();

  if (
    sections?.header?.length === 0 &&
    sections?.body?.length === 0 &&
    sections?.footer?.length === 0
  ) {
    return (
      <div className="flex h-96 flex-1 items-center justify-center text-gray-400">
        <p>Click &quot;Add&quot; to add sections to your page</p>
      </div>
    );
  }

  return (
    <div className="bg-background custom-scrollbar w-full overflow-y-auto rounded-md m-2 h-[calc(100dvh-79px)]">
      {children}
    </div>
  );
}
