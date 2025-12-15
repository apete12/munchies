// app/content/filter-dashboard-content.ts

export type FilterDashboardContent = {
  verticalFilterSection: {
    sectionHeading: { label: string };
    filterOptions: {
      label: string;
      id: string;
      displayHeading: boolean;
      isEnabled: boolean;
      filterType: string;
    }[];
  };
  horizontalFilterSection: {
    sectionHeading: { label: string };
    filterOptions: {
      label: string;
      id: string;
      displayHeading: boolean;
      isEnabled: boolean;
      filterType: string;
    }[];
  };
  restaurantListSection: {
    sectionHeading: { label: string };
  };
};
