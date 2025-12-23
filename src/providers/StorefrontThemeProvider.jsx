import { StorefrontThemeContext } from "@/context/StorefrontThemeContext";
import useGetQuery from "@/hooks/api/useGetQuery";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function StorefrontThemeProvider({ children }) {
  const { storeId } = useParams();
  const [sections, setSections] = useState({
    header: [],
    body: [],
    footer: [],
  });
  const [colorTheme, setColorTheme] = useState("default");

  const { data, isLoading } = useGetQuery({
    endpoint: `/store/theme/data/${storeId}`,
    queryKey: ["storeFront", "stores", storeId, "theme", "data"],
    enabled: !!storeId,
  });

  useEffect(() => {
    if (
      !isLoading &&
      data?.message === "Store Theme Data Fetched Succussfully" &&
      data?.data?.sections
    ) {
      setColorTheme(data?.data?.theme);
      setSections(data?.data?.sections);
    }
  }, [isLoading, data?.message, data?.data?.sections, data?.data?.theme]);

  useEffect(() => {
    document.documentElement.classList.remove("theme-green", "theme-violet");

    if (colorTheme !== "default") {
      document.documentElement.classList.add(`theme-${colorTheme}`);
    }
  }, [colorTheme]);

  const value = {
    sections,
    colorTheme,
    isLoading,
    storeId,
  };

  return (
    <StorefrontThemeContext value={value}>{children}</StorefrontThemeContext>
  );
}
