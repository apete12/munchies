'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useFetchRestaurnts } from '@/app/features/restaurant-dashboard/hooks/useFetchRestaurants';
import Loading from '@/app/loading';
import Error from '@/app/error';

import RestaurantCard from './components/restaurant-card/restaurant-card';
import FilterButton from '@/app/components/filter-button/filter-button';
import placeholder from '@/app/assets/placeholder.png';
import filterDashboardContent from '@/app/content/restaurant-dashboard.json';
import { getDeliveryTimeEstimate } from '@/app/utils/getDeliveryTimeEstimate';

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
    selectedCategory,
  } = useFetchRestaurnts();

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

  // CONTENT VARS
  const verticalFilterSectionHeading =
    filterDashboardContent.verticalFilterSection.sectionHeading.label;
  const verticalFilterSectionOptions =
    filterDashboardContent.verticalFilterSection.filterOptions;

  const horizontalFilterSectionHeading =
    filterDashboardContent.horizontalFilterSection.sectionHeading.label;
  const horizontalFilterSectionOptions =
    filterDashboardContent.horizontalFilterSection.filterOptions;

  const restaurantListSectionHeading =
    filterDashboardContent.restaurantListSection.sectionHeading.label;

  // aria-live region to announce restaurant count and category filters
  const restaurantLength = restaurantData?.length || 0;
  const plural = restaurantLength === 1 ? '' : 's';
  const categoryText = selectedCategory?.name
    ? ` in ${selectedCategory.name} category`
    : '';

  const announcementText =
    restaurantLength > 0
      ? `${restaurantLength} restaurant ${plural} found${categoryText}`
      : `No restaurants found ${categoryText}`;

  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center font-sans ">
      <main className="flex min-h-screen w-full gap-y-5 items-start justify-between sm:items-start lg:px-12 py-24">
        <section className="hidden lg:flex flex-col border-2 border-gray-300 p-5 rounded-lg min-w-48">
          <h2 className="text-2xl mb-5">{verticalFilterSectionHeading}</h2>
          {verticalFilterSectionOptions.map((option) => (
            <div key={option.id} className="flex flex-col mb-7">
              <h3 className="text-md mb-2">{option.label}</h3>
              {option.isEnabled ? (
                <ul className="flex flex-col gap-y-5">
                  {categoryFilters &&
                    categoryFilters.map((categoryFilter) => (
                      <li key={categoryFilter.id}>
                        <FilterButton
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
                    ))}
                </ul>
              ) : (
                <p>Coming soon!</p>
              )}
            </div>
          ))}
        </section>
        <section className="flex flex-col max-w-3/4">
          <h2 className="sr-only">{horizontalFilterSectionHeading}</h2>
          <ul className="w-full flex gap-x-5 overflow-x-auto flex-nowrap">
            {horizontalFilterSectionOptions.map((option) => (
              <li key={option.id} className="flex flex-col mb-7 flex-shrink-0">
                {option.isEnabled && (
                  <ul className="flex gap-x-5">
                    {categoryFilters &&
                      categoryFilters.map((categoryFilter) => (
                        <li key={categoryFilter.id}>
                          <FilterButton
                            filterName={categoryFilter.name}
                            baseClasses="hover:bg-gray-200 hover:cursor-pointer text-black text-sm min-w-40 min-h-20 border-2 border-gray-300 rounded-lg flex flex-col items-center justify-around"
                            onFilterClick={handleFilterClick}
                            filterIdentifier={categoryFilter.id}
                            filterType={'category'}
                            activeFilterId={categoryId || ''}
                            activeStateClasses="bg-gray-300"
                            inactiveStateClasses=""
                            imageSrc={placeholder}
                          />
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="flex flex-col">
            <h2 className="text-2xl mt-10 mb-5">
              {restaurantListSectionHeading}
            </h2>
            {/* Note, for aria live section to work, it always needs to be present in the DOM */}
            <div className="sr-only">
              <p aria-live="polite" aria-atomic="true">
                {announcementText}
              </p>
            </div>
            {isRestaurantDataLoading ? (
              <Loading />
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {restaurantData &&
                  restaurantData.map((restaurant) => (
                    <li key={restaurant.id}>
                      {/* using placeholder images w/ decorative alt text */}
                      <RestaurantCard
                        name={restaurant.name}
                        imageSrc={''}
                        altText={''}
                        isRestaurantOpen={restaurant.is_open}
                        placeholderImage={placeholder}
                        deliveryTimeEstimate={getDeliveryTimeEstimate(
                          restaurant.delivery_time_minutes
                        )}
                      />
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
