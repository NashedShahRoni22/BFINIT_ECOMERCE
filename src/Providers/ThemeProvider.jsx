import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

export default function ThemeProvider({ children }) {
  const themes = {
    1: {
      primary: "#000000",
      accent: "#ff6900",
      textOnPrimary: "#fff",
    },
    2: {
      primary: "#1e96fc",
      accent: "#FF8C42",
      textOnPrimary: "#fff",
    },
    3: {
      primary: "#2f855a",
      accent: "#84cc16",
      textOnPrimary: "#fff",
    },
    4: {
      primary: "#faf3e0",
      accent: "#c084fc",
      textOnPrimary: "#000",
    },
  };

  const [selectedTheme, setSelectedTheme] = useState(1);
  const theme = themes[selectedTheme];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", theme?.primary);
    root.style.setProperty("--color-accent", theme?.accent);
    root.style.setProperty("--color-on-primary", theme?.textOnPrimary);
    localStorage.setItem("selectedTheme", JSON.stringify(selectedTheme));
  }, [theme, selectedTheme]);

  const themeInfo = {
    selectedTheme,
    setSelectedTheme,
  };

  return (
    <ThemeContext.Provider value={themeInfo}>{children}</ThemeContext.Provider>
  );
}
