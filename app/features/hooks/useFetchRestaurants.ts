'use client';
import { useEffect } from 'react';
import { apiServices } from '@/app/lib/api';
export function useFetchRestaurnts() {
  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const response = await apiServices.getAllRestaurants();
        const data = await response.json();
        console.log(data, 'restaurants in home');
      } catch (err) {
        console.log(err, 'error');
      }
    }

    fetchRestaurants();
  }, []);

  useEffect(() => {
    async function fetchFilters() {
      try {
        const response = await apiServices.getAllFilters();
        const data = await response.json();
        console.log(data, 'filters in home');
      } catch (err) {
        console.log(err, 'error');
      }
    }

    fetchFilters();
  }, []);
}
