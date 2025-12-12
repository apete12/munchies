import { env } from '@/app/config/env';
import { FilterResponse } from '@/app/lib/types';

export const revalidate = 300;
export async function GET() {
  const startTime = Date.now();
  try {
    // make api call to filter endpoint
    const response = await fetch(`${env.API_URL}/filter`, {
      next: {
        revalidate: 300,
        tags: ['filters'],
      },
    });

    // http errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      return Response.json(
        {
          success: false,
          error: errorData.message || 'External API request failed',
          details: errorData,
        },
        { status: response.status }
      );
    }
    const data: FilterResponse = await response.json();

    const endTime = Date.now();

    // if response okay, return data w/ metadata
    return Response.json(
      {
        meta: {
          timestamp: new Date().toISOString(),
          responseTime: `${endTime - startTime}ms`,
          endpoint: '/filters',
          recordCount: data.filters?.length || 0,
          cachedAt: new Date().toISOString(),
        },
        success: true,
        data: data,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    // catch network errors
    console.log(error);

    return Response.json({ error: 'Failed to fetch filters' }, { status: 500 });
  }
}
