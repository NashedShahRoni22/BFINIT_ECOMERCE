import { useSearchParams } from "react-router";
import useDebounce from "@/hooks/useDebounce";

export function useSearchParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const debouncedSearch = useDebounce(search);

  const handleSearch = (value) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (value.trim()) {
        params.set("search", value);
        params.delete("page");
      } else {
        params.delete("search");
      }
      return params;
    });
  };

  const clearSearch = () => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete("search");
      params.delete("page");
      return params;
    });
  };

  return { search, debouncedSearch, handleSearch, clearSearch };
}
