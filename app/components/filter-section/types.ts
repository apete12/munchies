import { Filter } from '@/app/lib/types';
export type FilterSectionProps = {
  sectionHeading: string;
  filterSubSectionsData: {
    displayHeading: boolean;
    id: string;
    label: string;
    filterType: string;
    isEnabled: boolean;
    options: Filter[];
  }[];
  displaySectionHeading: boolean;
  handleFilterClick: (filterId: string, filterType: string) => void;
  activeFilterId: string;
  containerClasses?: string;
  optionBaseClasses: string;
  optionListContainerClasses: string;
  listsDirectionClasses?: string;
};
