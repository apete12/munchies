import RestaurantDashboard from '@/app/features/restaurant-dashboard/components/restaurant-dashboard';
export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans ">
      <main className="flex flex-col min-h-screen w-full">
        <RestaurantDashboard />
      </main>
    </div>
  );
}
