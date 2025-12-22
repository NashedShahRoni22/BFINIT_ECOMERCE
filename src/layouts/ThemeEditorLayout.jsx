import { Outlet } from "react-router";
import ThemeEditorHeader from "../features/themes/components/layout/ThemeEditorHeader";
import ThemeEditorSidebar from "../features/themes/components/layout/ThemeEditorSidebar";
import Inspector from "../features/themes/components/layout/Inspector";
import Header from "@/features/themes/components/canvas/Header";
import Footer from "@/features/themes/components/canvas/Footer";
import Canvas from "@/features/themes/components/layout/Canvas";

export default function ThemeEditorLayout() {
  return (
    <main className="font-geist bg-muted">
      <ThemeEditorHeader />

      <div className="flex justify-between">
        {/* left sidebar */}
        <ThemeEditorSidebar />

        {/* canvas site preview */}
        <Canvas>
          <Header />
          <Outlet />
          <Footer />
        </Canvas>

        {/* section editing form field */}
        <Inspector />
      </div>
    </main>
  );
}
