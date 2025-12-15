'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { apiServices } from '@/app/lib/api';
import { Restaurant, FilterSection } from '@/app/lib/types';
import { FilterDashboardContent } from '../types';
//// CONTENT ////
import filterDashboardContentFromFile from '@/app/content';

export function useFetchRestaurnts() {
  const [isRestaurantDataLoading, setRestaurantDataLoading] =
    useState<boolean>(true);
  const [isCategoryFiltersLoading, setIsCategoryFiltersLoading] =
    useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [restaurantData, setRestaurantData] = useState<Restaurant[] | null>(
    null
  );
  const [filters, setFilters] = useState<FilterSection[] | []>([]);
  const filterDashboardContent: FilterDashboardContent =
    filterDashboardContentFromFile;

  const searchParams = useSearchParams();
  const categoryId = searchParams.get('category');
  const selectedCategory = filters
    ?.find((filter) => filter.filterType === 'category')
    ?.options.find((option) => option.id === categoryId);

  useEffect(() => {
    async function fetchRestaurants() {
      setRestaurantDataLoading(true);
      setError(null);

      try {
        const allRestaurantsResponse = await apiServices.getRestaurants(
          categoryId || ''
        );
        if (allRestaurantsResponse.data.length > 0) {
          setRestaurantData(allRestaurantsResponse.data);
        } else {
          setError(
            allRestaurantsResponse.error?.message ||
              'Failed to fetch restaurants'
          );
        }
      } catch (err) {
        console.log(err, 'error');
      } finally {
        setRestaurantDataLoading(false);
      }
    }

    fetchRestaurants();
  }, [categoryId]);

  useEffect(() => {
    async function fetchCategoryFilters() {
      setIsCategoryFiltersLoading(true);
      setError(null);

      try {
        const categoryFiltersResponse = await apiServices.getAllFilters();

        if (categoryFiltersResponse.data.filters.length > 0) {
          setFilters((prev) => [
            ...(prev || []),
            {
              filterType: 'category',
              options: categoryFiltersResponse.data.filters,
            },
          ]);
        } else {
          setError(
            categoryFiltersResponse.error?.message ||
              'Failed to fetch restaurants'
          );
        }
      } catch (err) {
        console.log(err, 'error');
      } finally {
        setIsCategoryFiltersLoading(false);
      }
    }

    fetchCategoryFilters();
  }, []);

  return {
    restaurantData,
    isRestaurantDataLoading,
    isCategoryFiltersLoading,
    filters,
    error,
    setRestaurantData,
    categoryId,
    selectedCategory,
    filterDashboardContent,
  };
}
