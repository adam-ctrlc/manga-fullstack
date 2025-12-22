import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiService } from './api';

export const QUERY_KEYS = {
  ITEMS: 'items',
  ITEM_DETAILS: 'itemDetails',
  RANDOM_ITEM: 'randomItem',
};

export function useItems(filters = {}, page = 1) {
  return useQuery({
    queryKey: [QUERY_KEYS.ITEMS, filters, page],
    queryFn: () => ApiService.fetchItems(filters, page),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    keepPreviousData: true,
  });
}

export function useItemDetails(type, id) {
  return useQuery({
    queryKey: [QUERY_KEYS.ITEM_DETAILS, type, id],
    queryFn: () => ApiService.fetchItemDetails(type, id),
    enabled: !!(type && id),
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
}

export function useRandomItem(filters = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.RANDOM_ITEM, filters],
    queryFn: () => ApiService.fetchRandomItem(filters),
    staleTime: 0, // Always fresh for random items
    cacheTime: 0, // Don't cache random items
  });
}

export function useInvalidateQueries() {
  const queryClient = useQueryClient();
  
  return {
    invalidateItems: () => queryClient.invalidateQueries([QUERY_KEYS.ITEMS]),
    invalidateItemDetails: (type, id) => 
      queryClient.invalidateQueries([QUERY_KEYS.ITEM_DETAILS, type, id]),
    invalidateRandomItem: () => queryClient.invalidateQueries([QUERY_KEYS.RANDOM_ITEM]),
    invalidateAll: () => queryClient.invalidateQueries(),
  };
}