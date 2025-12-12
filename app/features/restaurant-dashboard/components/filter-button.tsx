type FilterButtonProps = {
  onFilterClick: (filterIdentifier: string) => void;
  filterIdentifier: string;
  baseClasses: string;
  activeFilterId: string;
  activeStateClasses: string;
  inactiveStateClasses: string;
  filterName: string;
};

const FilterButton = ({
  onFilterClick,
  filterIdentifier,
  baseClasses,
  activeFilterId,
  activeStateClasses,
  inactiveStateClasses,
  filterName,
}: FilterButtonProps) => {
  return (
    <button
      onClick={() => onFilterClick(filterIdentifier)}
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
