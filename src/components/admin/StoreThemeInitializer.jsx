import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { ThemeContext } from "../../Providers/ThemeProvider";
import useGetStorePreference from "../../hooks/stores/useGetStorePreference";

export default function StoreThemeInitializer({ children }) {
  const { storeId } = useParams();
  const { setSelectedTheme } = useContext(ThemeContext);

  // fetch store preference
  const { data: storePreferenceData } = useGetStorePreference(storeId);

  // update store theme preference on component mount
  useEffect(() => {
    setSelectedTheme(storePreferenceData?.storeTheme);
  }, [storePreferenceData, setSelectedTheme]);

  return children;
}
