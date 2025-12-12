'use client';
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { apiServices } from '@/app/lib/api';
import { Restaurant, Filter } from '@/app/features/restaurant-dashboard/types';

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
        const allRestaurantsResponse = await apiServices.getAllRestaurants();

        if (allRestaurantsResponse.data.restaurants.length > 0) {
          setRestaurantData(allRestaurantsResponse.data.restaurants);
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
  }, []);

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

  const filteredRestaurants = useMemo(() => {
    if (!restaurantData) return null;
    if (!categoryId) return restaurantData;

    return restaurantData.filter((restaurant) =>
      restaurant.filter_ids?.includes(categoryId)
    );
  }, [restaurantData, categoryId]);

  return {
    restaurantData: filteredRestaurants,
    isRestaurantDataLoading,
    isCategoryFiltersLoading,
    categoryFilters,
    error,
    setRestaurantData,
    categoryId,
  };
}
