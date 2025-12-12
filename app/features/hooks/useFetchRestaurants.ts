'use client';
import { useEffect } from 'react';

export function useFetchRestaurnts() {
   useEffect(() => {
    async function fetchRestaurants() {
      try {
        const response = await fetch('/api/restaurants');
        const data = await response.json();
         console.log(data, 'data in home');
      } catch (err) {
        console.log(err, 'error');
      }
    }

    fetchRestaurants();
  }, []);
}
