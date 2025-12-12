'use client';
import { useEffect, useState } from 'react';
import { apiServices } from '@/app/lib/api';
import { Restaurant } from '@/app/features/restaurant-dashboard/types';
export function useFetchRestaurnts() {
  const [isRestaurantDataLoading, setRestaurantDataLoading] =
    useState<boolean>(true);
  const [isCategoryFiltersLoading, setIsCategoryFiltersLoading] =
    useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [restaurantData, setRestaurantData] = useState<Restaurant[] | null>(
    null
  );
  const [categoryFilters, setCategoryFilters] = useState<Restaurant[] | null>(
    null
  );

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

  return {
    restaurantData,
    isRestaurantDataLoading,
    isCategoryFiltersLoading,
    categoryFilters,
    error,
  };
}
