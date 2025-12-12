import RestaurantDashboard from '@/app/features/restaurant-dashboard/restaurant-dashboard';

export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center   font-sans ">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <h1 className="text-4xl font-bold">Welcome to Munchies!</h1>
        <RestaurantDashboard />
      </main>
    </div>
  );
}
