import { env } from '@/app/config/env';

export async function GET() {
  try {
    const response = await fetch(`${env.API_URL}/restaurants`);
    const data = await response.json();
    return Response.json({
      data: data,
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      { error: 'Failed to fetch restaurants' },
      { status: 500 }
    );
  }
}
