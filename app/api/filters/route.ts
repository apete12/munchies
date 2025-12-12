import { env } from '@/app/config/env';

export async function GET() {
  try {
    const response = await fetch(`${env.API_URL}/filter`);
    const data = await response.json();
    return Response.json({
      data: data,
    });
  } catch (error) {
    console.log(error);

    return Response.json({ error: 'Failed to fetch filters' }, { status: 500 });
  }
}
