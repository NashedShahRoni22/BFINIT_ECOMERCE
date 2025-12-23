import { useParams } from "react-router";

export default function useBasePath() {
  const { storeId } = useParams();
  const isEditor = location.pathname.includes("/theme-editor");

  return `/stores/${storeId}${isEditor ? "/theme-editor" : ""}`;
}
