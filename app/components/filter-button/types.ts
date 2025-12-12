import { StaticImageData } from 'next/image';

export type FilterButtonProps = {
  onFilterClick: (filterIdentifier: string, filterType: string) => void;
  filterIdentifier: string;
  baseClasses: string;
  activeFilterId: string;
  activeStateClasses: string;
  inactiveStateClasses: string;
  filterName: string;
  filterType: string;
  imageSrc?: StaticImageData;
};
