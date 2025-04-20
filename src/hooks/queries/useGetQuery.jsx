/*
 ** Custom hook to perform a GET request using TanStack Query.
 
 ** Props:
 * - endpoint (string): The API endpoint path (without baseURL).
 * - token (string): Optional user token for Authorization header.
 * - queryKey (array): Unique key for caching and re-fetching.
 * - enabled (boolean): Whether the query should run automatically.
 */

import { useQuery } from "@tanstack/react-query";
import { getApi } from "../../api/getApi";

export default function useGetQuery({ endpoint, token, queryKey, enabled }) {
  return useQuery({
    queryKey,
    queryFn: () => getApi(endpoint, token),
    enabled,
  });
}
