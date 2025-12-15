'use client';

//// GENERAL ////
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

//// ROUTES ////
import { useFetchRestaurnts } from '@/app/features';

//// COMPONENTS ////
import { FilterSection } from '@/app/components';
import { RestaurantCard } from '@/app/features';
import Loading from '@/app/loading';
import Error from '@/app/error';

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
    filters,
    error,
    categoryId,
    selectedCategory,
    filterDashboardContent,
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

  //// CONTENT VARS ////
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

  //////////////////////// TODO: create util w/ logic ////////////////////////
  const formattedVerticalFilterSections = verticalFilterSectionOptions.map(
    (section) => ({
      ...section,
      options:
        (filters &&
          filters.find((filter) => filter.filterType === section.filterType)
            ?.options) ||
        [],
    })
  );

  const formattedHorizontalFilterSections = horizontalFilterSectionOptions.map(
    (section) => ({
      ...section,
      options:
        (filters &&
          filters.find((filter) => filter.filterType === section.filterType)
            ?.options) ||
        [],
    })
  );
  //////////////////////////////////////////////////////////////////////////////

  //// CLASSNAMES ////
  const baseCardClasses = `border-2 border-gray-300 rounded-lg bg-white`;
  const horizontalfilterSectionCardClasses = `hover:bg-gray-200 hover:underline text-sm min-w-40 min-h-20 flex flex-col items-center justify-around ${baseCardClasses}`;
  const verticalfilterSectionContainerClasses = `hidden lg:flex flex-col p-5 rounded-lg w-2/12 ${baseCardClasses}`;
  const restaurantGridClasses = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10`;

  return (
    <div className="flex items-start justify-center mt-8 ">
      <main className="flex w-full justify-between">
        {/* VERTICAL FILTER SECTION */}
        <FilterSection
          filterSubSectionsData={formattedVerticalFilterSections}
          sectionHeading={verticalFilterSectionHeading}
          displaySectionHeading={true}
          handleFilterClick={handleFilterClick}
          activeFilterId={categoryId || ''}
          containerClasses={verticalfilterSectionContainerClasses}
          optionBaseClasses="hover:underline text-sm"
          optionListContainerClasses="flex flex-col mb-7 "
          listsDirectionClasses="flex flex-col gap-y-5"
        />
        <section className="flex flex-col w-9/12 ">
          {/* HORIZONTAL FILTER SECTION */}
          <FilterSection
            filterSubSectionsData={formattedHorizontalFilterSections}
            sectionHeading={horizontalFilterSectionHeading}
            displaySectionHeading={false}
            handleFilterClick={handleFilterClick}
            activeFilterId={categoryId || ''}
            optionBaseClasses={horizontalfilterSectionCardClasses}
            optionListContainerClasses={'overflow-x-auto w-full'}
            listsDirectionClasses={
              'w-full flex gap-x-5 overflow-x-auto flex-nowrap'
            }
          />
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
              <ul className={restaurantGridClasses}>
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
