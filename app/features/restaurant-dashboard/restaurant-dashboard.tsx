'use client';

//// GENERAL ////
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

//// ROUTES ////
import { useFetchRestaurnts } from '@/app/features';

//// COMPONENTS ////
import { FilterButton } from '@/app/components';
import { RestaurantCard } from '@/app/features';
import Loading from '@/app/loading';
import Error from '@/app/error';

//// CONTENT ////
import filterDashboardContent from '@/app/content';

//// UTILS ////
import { getDeliveryTimeEstimate, getRestaurantImage } from '@/app/utils';

//// ASSETS ////
import placeholder from '@/app/assets';

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
    <div className="flex min-h-screen  items-center justify-center font-sans mt-8 ">
      <main className="flex min-h-screen w-full items-start justify-between">
        <section className="hidden lg:flex flex-col border-2 border-gray-300 p-5 rounded-lg w-2/12 bg-white">
          <h2 className="text-2xl mb-5">{verticalFilterSectionHeading}</h2>
          {verticalFilterSectionOptions.map((option) => (
            <div key={option.id} className="flex flex-col mb-7 ">
              <h3 className="text-md mb-2">{option.label}</h3>
              {option.isEnabled ? (
                <ul className="flex flex-col gap-y-5">
                  {categoryFilters &&
                    categoryFilters.map((categoryFilter) => (
                      <li key={categoryFilter.id}>
                        <FilterButton
                          filterName={categoryFilter.name}
                          baseClasses="hover:underline hover:cursor-pointer text-black text-sm bg-white"
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
        <section className="flex flex-col w-9/12 ">
          <h2 className="sr-only">{horizontalFilterSectionHeading}</h2>
          <div className="overflow-x-auto w-full">
            <ul className="w-full flex gap-x-5 overflow-x-auto flex-nowrap ">
              {horizontalFilterSectionOptions.map((option) => (
                <li
                  key={option.id}
                  className="flex flex-col mb-7 flex-shrink-0"
                >
                  {option.isEnabled && (
                    <ul className="flex gap-x-5">
                      {categoryFilters &&
                        categoryFilters.map((categoryFilter) => (
                          <li key={categoryFilter.id}>
                            <FilterButton
                              filterName={categoryFilter.name}
                              baseClasses="hover:bg-gray-200 hover:cursor-pointer text-black text-sm min-w-40 min-h-20 border-2 border-gray-300 rounded-lg flex flex-col items-center justify-around bg-white"
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
          </div>
          <div className="flex flex-col ">
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
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {restaurantData &&
                  restaurantData.map((restaurant) => (
                    <li key={restaurant.id}>
                      {/* using decorative alt text */}
                      <RestaurantCard
                        name={restaurant.name}
                        imageSrc={
                          getRestaurantImage(restaurant.image_url) ||
                          placeholder
                        }
                        altText={''}
                        isRestaurantOpen={restaurant.is_open}
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
