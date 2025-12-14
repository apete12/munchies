// app/api/restaurants/route.ts
import { NextRequest } from 'next/server';
import { env } from '@/app/config/env';
import {
  Restaurant,
  OpenStatusResponse,
  RestaurantsResponse,
  PriceRangeResponse,
} from '@/app/lib/types';

export const revalidate = 300;
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const categoryId = request.nextUrl.searchParams.get('category');

  try {
    // fetch all restaurants
    const restaurantsRepsonse = await fetch(`${env.API_URL}/restaurants`, {
      next: { revalidate: 300 },
    });
    const data: RestaurantsResponse = await restaurantsRepsonse.json();

    // if categoryId is present, filter restaurants w/ filter_ids that include categoryId
    const restaurantsData: Restaurant[] = categoryId
      ? data.restaurants.filter((restaurant) =>
          restaurant.filter_ids?.includes(categoryId)
        )
      : data.restaurants;

    // fetch all open statuses
    const openStatusesResponse: OpenStatusResponse[] = await Promise.all(
      restaurantsData.map((restaurant) =>
        fetch(`${env.API_URL}/open/${restaurant.id}`).then((res) => res.json())
      )
    );

    const priceRangesResponse: PriceRangeResponse[] = await Promise.all(
      restaurantsData.map((restaurant) =>
        fetch(`${env.API_URL}/price-range/${restaurant.price_range_id}`).then(
          (res) => res.json()
        )
      )
    );

    // format restaurant data to include open status and price range
    const restaurantDataWithAdditionalData = restaurantsData.map(
      (restaurant) => ({
        ...restaurant,
        is_open: openStatusesResponse.find(
          (status) => status.restaurant_id === restaurant.id
        )?.is_open,
        price_range: priceRangesResponse.find(
          (priceRange) => priceRange.id === restaurant.price_range_id
        )?.range,
      })
    );

    const endTime = Date.now();

    return Response.json({
      meta: {
        timestamp: new Date().toISOString(),
        responseTime: `${endTime - startTime}ms`,
        endpoint: '/filters',
        recordCount: restaurantDataWithAdditionalData?.length || 0,
        cachedAt: new Date().toISOString(),
      },
      success: true,

      data: restaurantDataWithAdditionalData,
    });
  } catch (error) {
    console.log(error, 'error');
    return Response.json({ error: 'Failed' }, { status: 500 });
  }
}
