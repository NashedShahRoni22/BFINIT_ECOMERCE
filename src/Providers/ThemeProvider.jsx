import { createContext, useEffect } from "react";

export const ThemeContext = createContext(null);

export default function ThemeProvider({ children }) {
  const blackTheme = {
    primary: "#000000",
    accent: "#ff6900",
    textOnPrimary: "#fff",
  };

  const blueTheme = {
    primary: "#1e96fc",
    accent: "#FF8C42",
    textOnPrimary: "#fff",
  };

  const greenTheme = {
    primary: "#2f855a",
    accent: "#84cc16",
    textOnPrimary: "#fff",
  };

  const creamTheme = {
    primary: "#faf3e0",
    accent: "#c084fc",
    textOnPrimary: "#000",
  };

  const theme = blackTheme;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", theme.primary);
    root.style.setProperty("--color-accent", theme.accent);
    root.style.setProperty("--color-on-primary", theme.textOnPrimary);
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}
