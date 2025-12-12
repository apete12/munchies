'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useFetchRestaurnts } from '@/app/features/restaurant-dashboard/hooks/useFetchRestaurants';
import Loading from '@/app/loading';
import RestaurantCard from './restaurant-card';
import FilterButton from './filter-button';

export default function RestaurantDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { restaurantData, isRestaurantDataLoading, categoryFilters } =
    useFetchRestaurnts();

  if (isRestaurantDataLoading) {
    return <Loading />;
  }

  const handleFilterClick = (filterId: string, filterType: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (current.get(filterType) === filterId) {
      current.delete(filterType);
    } else {
      current.set(filterType, filterId);
    }

    const query = current.toString() ? `?${current.toString()}` : '';
    router.push(`${pathname}${query}`);
  };

  return (
    <div className="flex min-h-screen w-full  items-center justify-center bg-pink-300 font-sans ">
      <main className="flex min-h-screen w-full gap-y-5 items-center justify-between sm:items-start px-24 py-24">
        <ul className="flex flex-col gap-y-5">
          {categoryFilters &&
            categoryFilters.map((categoryFilter) => {
              return (
                <li key={categoryFilter.id}>
                  <FilterButton
                    key={categoryFilter.id}
                    filterName={categoryFilter.name}
                    baseClasses="bg-black text-white"
                    onFilterClick={handleFilterClick}
                    filterIdentifier={categoryFilter.id}
                    filterType={'category'}
                    activeFilterId={searchParams.get('category') || ''}
                    activeStateClasses="bg-blue-500"
                    inactiveStateClasses="bg-gray-500"
                  />
                </li>
              );
            })}
        </ul>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {restaurantData &&
            restaurantData.map((restaurant) => (
              <li key={restaurant.id}>
                <RestaurantCard restaurant={restaurant} />
              </li>
            ))}
        </ul>
      </main>
    </div>
  );
}
