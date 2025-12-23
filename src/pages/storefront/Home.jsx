import SectionRenderer from "@/components/storefront/core/SectionRenderer";
import useTheme from "@/hooks/useTheme";

export default function Home() {
  const { sections, activeSection } = useTheme();

  return (
    <SectionRenderer
      sections={sections?.body}
      activeSection={activeSection}
      isEditorMode={true}
    />
  );
}
