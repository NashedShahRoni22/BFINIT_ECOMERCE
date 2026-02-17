import { Outlet } from "react-router";
import Footer from "@/components/storefront/Footer";
import Header from "@/components/storefront/Header";
import Canvas from "@/features/themes/components/layout/Canvas";
import Inspector from "@/features/themes/components/layout/Inspector";
import PreviewModeBar from "@/features/themes/components/layout/PreviewModeBar";
import ThemeEditorHeader from "@/features/themes/components/layout/ThemeEditorHeader";
import ThemeEditorSidebar from "@/features/themes/components/layout/ThemeEditorSidebar";
import useTheme from "@/hooks/useTheme";
import CountrySelectModal from "@/components/storefront/modals/CountrySelectModal";

export default function ThemeEditorLayout() {
  const { isPreviewMode } = useTheme();

  return (
    <main className="font-geist bg-muted">
      {!isPreviewMode && <ThemeEditorHeader />}

      {isPreviewMode && <PreviewModeBar />}

      <div className="flex justify-between">
        {/* left sidebar */}
        {!isPreviewMode && <ThemeEditorSidebar />}

        {/* canvas site preview */}
        <Canvas isPreviewMode={isPreviewMode}>
          <CountrySelectModal />
          <Header />
          <Outlet />
          <Footer />
        </Canvas>

        {/* section editing form field */}
        {!isPreviewMode && <Inspector />}
      </div>
    </main>
  );
}
