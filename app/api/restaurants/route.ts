// app/api/restaurants/route.ts
import { NextRequest } from 'next/server';
import { env } from '@/app/config/env';
import { Restaurant, OpenStatus, RestaurantsResponse } from '@/app/lib/types';

export const revalidate = 300;
export async function GET(request: NextRequest) {
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
        fetch(`${env.API_URL}/open/${restaurant.id}`)
          .then((res) => res.json())
          .catch(() => ({ is_currently_open: false }))
      )
    );

    const openStatusMap = new Map(
      openStatuses.map((status) => [
        status.restaurant_id,
        status.is_currently_open,
      ])
    );

    // format restaurant data to include open status boolean
    const restaurantDataWithOpenStatus = restaurants.map((restaurant) => ({
      ...restaurant,
      is_currently_open: openStatusMap.get(restaurant.id) ?? false,
    }));

    return Response.json({ success: true, data: restaurantDataWithOpenStatus });
  } catch (error) {
    console.log(error, 'error');
    return Response.json({ error: 'Failed' }, { status: 500 });
  }
}
