type FilterButtonProps = {
  onFilterClick: (filterIdentifier: string, filterType: string) => void;
  filterIdentifier: string;
  baseClasses: string;
  activeFilterId: string;
  activeStateClasses: string;
  inactiveStateClasses: string;
  filterName: string;
  filterType: string;
};

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
