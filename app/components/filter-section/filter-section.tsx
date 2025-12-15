import { FilterButton } from '../index';
import { FilterSectionProps } from './types';
export default function FilterSection({
  sectionHeading,
  filterSubSectionsData,
  displaySectionHeading,
  handleFilterClick,
  activeFilterId,
  containerClasses,
  optionBaseClasses,
  optionListContainerClasses,
  listsDirectionClasses,
}: FilterSectionProps) {
  return (
    <section className={containerClasses}>
      <h2 className={`${displaySectionHeading ? 'text-2xl mb-5' : 'sr-only'}`}>
        {sectionHeading}
      </h2>

      {filterSubSectionsData.map((filterSection) => (
        <div key={filterSection.id} className={optionListContainerClasses}>
          <h3
            className={`${
              filterSection.displayHeading ? 'text-md mb-2' : 'sr-only'
            }`}
          >
            {filterSection.label}
          </h3>

          {filterSection.isEnabled ? (
            <ul className={listsDirectionClasses}>
              {filterSection.options &&
                filterSection.options.map((option) => (
                  <li key={option.id}>
                    <FilterButton
                      filterName={option.name}
                      baseClasses={`hover:cursor-pointer ${optionBaseClasses}`}
                      onFilterClick={handleFilterClick}
                      filterIdentifier={option.id}
                      filterType={filterSection.filterType}
                      activeFilterId={activeFilterId}
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
  );
}
