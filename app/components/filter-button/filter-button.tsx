import { FilterButtonProps } from './types';

const FilterButton = ({
  onFilterClick,
  filterIdentifier,
  baseClasses,
  activeFilterId,
  activeStateClasses,
  inactiveStateClasses,
  filterName,
  filterType,
}: FilterButtonProps) => {
  return (
    <button
      onClick={() => onFilterClick(filterIdentifier, filterType)}
      className={`${baseClasses} ${
        activeFilterId === filterIdentifier
          ? activeStateClasses
          : inactiveStateClasses
      }`}
    >
      {filterName}
    </button>
  );
};

export default FilterButton;
