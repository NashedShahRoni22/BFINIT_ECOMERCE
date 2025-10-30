import TopNav from "@/components/customize/TopNav";
import SectionSidebar from "@/components/customize/SectionSidebar";
import ContentEditorPanel from "@/components/customize/ContentEditorPanel";
import { useNavigate } from "react-router";

export default function ThemeCustomize() {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/themes");
  };

  return (
    <main className="font-inter">
      <TopNav handleExit={handleExit} />
      <div className="flex justify-between gap-8">
        <SectionSidebar />
        <div>Site Preview</div>
        <ContentEditorPanel />
      </div>
    </main>
  );
}
