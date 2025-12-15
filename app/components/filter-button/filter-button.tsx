import { FilterButtonProps } from './types';
import Image from 'next/image';

const FilterButton = ({
  onFilterClick,
  filterIdentifier,
  baseClasses,
  activeFilterId,
  activeStateClasses,
  inactiveStateClasses,
  filterName,
  filterType,
  imageSrc,
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
      {imageSrc && (
        <Image
          src={imageSrc}
          width={30}
          height={30}
          alt={''} // images should be decorative for buttons - unless no text present - need to account for that here 
        />
      )}
    </button>
  );
};

export default FilterButton;
