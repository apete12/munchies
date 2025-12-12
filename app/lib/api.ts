export const apiServices = {
  getRestaurants: async (categoryId?: string) => {
    const url = categoryId
      ? `/api/restaurants?category=${categoryId}`
      : `/api/restaurants`;
    const response = await fetch(url);
    return response.json();
  },

  getAllFilters: async () => {
    const response = await fetch(`/api/filters`);
    return response.json();
  },
};
