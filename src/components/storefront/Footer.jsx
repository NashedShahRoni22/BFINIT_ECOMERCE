import useTheme from "@/hooks/useTheme";
import SectionRenderer from "./core/SectionRenderer";

export default function Footer() {
  const { sections, activeSection } = useTheme();

  return (
    <SectionRenderer
      sections={sections?.footer}
      activeSection={activeSection}
      isEditorMode={true}
    />
  );
}
