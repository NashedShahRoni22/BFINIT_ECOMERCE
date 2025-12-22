import useTheme from "../../hooks/useTheme";
import SectionRenderer from "../core/SectionRenderer";

export default function Header() {
  const { sections, activeSection } = useTheme();

  return (
    <header className="sticky top-0 z-50">
      <SectionRenderer
        sections={sections?.header}
        activeSection={activeSection}
        isEditorMode={true}
      />
    </header>
  );
}
