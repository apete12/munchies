import RestaurantDashboard from '@/app/features/restaurant-dashboard/restaurant-dashboard';
export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-centerfont-sans ">
      <main className="flex flex-col min-h-screen w-full">
        <h1 className="sr-only">Welcome to Munchies!</h1>
        <RestaurantDashboard />
      </main>
    </div>
  );
}
