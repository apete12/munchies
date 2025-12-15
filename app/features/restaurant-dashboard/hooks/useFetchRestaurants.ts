'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { apiServices } from '@/app/lib/api';
import { Restaurant, Filter } from '@/app/lib/types';

export function useFetchRestaurnts() {
  const [isRestaurantDataLoading, setRestaurantDataLoading] =
    useState<boolean>(true);
  const [isCategoryFiltersLoading, setIsCategoryFiltersLoading] =
    useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [restaurantData, setRestaurantData] = useState<Restaurant[] | null>(
    null
  );
  const [categoryFilters, setCategoryFilters] = useState<Filter[] | null>(null);

  const searchParams = useSearchParams();
  const categoryId = searchParams.get('category');

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
          setCategoryFilters(categoryFiltersResponse.data.filters);
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

  const selectedCategory = categoryFilters?.find(
    (filter) => filter.id === categoryId
  );

  return {
    restaurantData,
    isRestaurantDataLoading,
    isCategoryFiltersLoading,
    categoryFilters,
    error,
    setRestaurantData,
    categoryId,
    selectedCategory,
  };
}
