// app/api/restaurants/route.ts
import { NextRequest } from 'next/server';
import { env } from '@/app/config/env';
import { Restaurant, OpenStatus, RestaurantsResponse } from '@/app/lib/types';

export const revalidate = 300;
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const categoryId = request.nextUrl.searchParams.get('category');

  try {
    // fetch all restaurants
    const response = await fetch(`${env.API_URL}/restaurants`, {
      next: { revalidate: 300 },
    });
    const data: RestaurantsResponse = await response.json();

    // if categoryId is present, filter restaurants w/ filter_ids that include categoryId
    const restaurants: Restaurant[] = categoryId
      ? data.restaurants.filter((restaurant) =>
          restaurant.filter_ids?.includes(categoryId)
        )
      : data.restaurants;

    // fetch all open statuses
    const openStatuses: OpenStatus[] = await Promise.all(
      restaurants.map((restaurant) =>
        fetch(`${env.API_URL}/open/${restaurant.id}`).then((res) => res.json())
      )
    );

    // format restaurant data to include open status boolean
    const restaurantDataWithOpenStatus = restaurants.map((restaurant) => ({
      ...restaurant,
      is_open: openStatuses.find(
        (status) => status.restaurant_id === restaurant.id
      )?.is_open,
    }));

    const endTime = Date.now();

    return Response.json({
      meta: {
        timestamp: new Date().toISOString(),
        responseTime: `${endTime - startTime}ms`,
        endpoint: '/filters',
        recordCount: restaurantDataWithOpenStatus?.length || 0,
        cachedAt: new Date().toISOString(),
      },
      success: true,

      data: restaurantDataWithOpenStatus,
    });
  } catch (error) {
    console.log(error, 'error');
    return Response.json({ error: 'Failed' }, { status: 500 });
  }
}
