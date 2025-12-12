'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useFetchRestaurnts } from '@/app/features/restaurant-dashboard/hooks/useFetchRestaurants';
import Loading from '@/app/loading';
import Error from '@/app/error';
import RestaurantCard from '../components/restaurant-card/restaurant-card';
import FilterButton from '@/app/components/filter-button/filter-button';

export default function RestaurantDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    restaurantData,
    isRestaurantDataLoading,
    categoryFilters,
    error,
    categoryId,
  } = useFetchRestaurnts();

  if (isRestaurantDataLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
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
    <div className="flex min-h-screen w-full  items-center justify-centerfont-sans ">
      <main className="flex min-h-screen w-full gap-y-5 items-start justify-between sm:items-start px-12 py-24">
        <section className="flex flex-col">
          <h2 className="text-2xl mb-5">Filter</h2>
          <h3 className="text-md mb-2">FOOD CATEGORY</h3>
          <ul className="flex flex-col gap-y-5">
            {categoryFilters &&
              categoryFilters.map((categoryFilter) => {
                return (
                  <li key={categoryFilter.id}>
                    <FilterButton
                      key={categoryFilter.id}
                      filterName={categoryFilter.name}
                      baseClasses="hover:underline hover:cursor-pointer text-black text-sm"
                      onFilterClick={handleFilterClick}
                      filterIdentifier={categoryFilter.id}
                      filterType={'category'}
                      activeFilterId={categoryId || ''}
                      activeStateClasses="underline"
                      inactiveStateClasses=""
                    />
                  </li>
                );
              })}
          </ul>
        </section>
        <section className="flex flex-col">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurantData &&
              restaurantData.map((restaurant) => (
                <li key={restaurant.id}>
                  <RestaurantCard
                    name={restaurant.name}
                    imageSrc={''}
                    altText={''}
                  />
                </li>
              ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
