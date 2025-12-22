import useSWR from "swr";
import { fetcher } from "./http";

export function useManga({ page = 1, filters = {} } = {}) {
  const queryParams = new URLSearchParams();

  if (page) queryParams.append("page", page);

  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== "All") {
      queryParams.append(key, value);
    }
  });

  const queryString = queryParams.toString();
  const { data, error, isLoading } = useSWR(`/items?${queryString}`, fetcher);

  return {
    data: data?.data || [],
    meta: data?.meta || {},
    isLoading,
    isError: error,
  };
}

export function useMangaDetails(id) {
  const { data, error, isLoading } = useSWR(
    id ? `/items/manga/${id}` : null,
    fetcher
  );

  return {
    item: data?.item,
    chapters: data?.chapters || [],
    isLoading,
    isError: error,
  };
}
