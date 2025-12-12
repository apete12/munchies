import RestaurantDashboard from '@/app/features/restaurant-dashboard/components/restaurant-dashboard';
export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans ">
      <main className="flex flex-col min-h-screen w-full">
        <h1 className="text-4xl font-bold">Welcome to Munchies!</h1>
        <RestaurantDashboard />
      </main>
    </div>
  );
}
