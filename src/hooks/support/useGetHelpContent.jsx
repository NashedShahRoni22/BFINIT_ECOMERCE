import useGetQuery from "../queries/useGetQuery";

export default function useGetHelpContent(storeId) {
  return useGetQuery({
    endpoint: `/store/storehelp/${storeId}`,
    queryKey: ["help", storeId],
    enabled: !!storeId,
  });
}
