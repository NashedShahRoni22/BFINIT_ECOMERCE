import { StorefrontThemeContext } from "@/context/StorefrontThemeContext";
import { ThemeEditorContext } from "@/context/ThemeEditorContext";
import { useContext } from "react";

export default function useTheme() {
  const editorContext = useContext(ThemeEditorContext);
  const storefrontContext = useContext(StorefrontThemeContext);

  const context = editorContext || storefrontContext;

  if (!context) {
    throw new Error(
      "useTheme must be used within ThemeEditorProvider or StorefrontThemeProvider",
    );
  }

  return context;
}
