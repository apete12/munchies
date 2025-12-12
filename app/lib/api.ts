export const apiServices = {
  getAllRestaurants: async () => {
    const response = await fetch(`/api/restaurants`);
    return response.json();
  },

  getAllFilters: async () => {
    const response = await fetch(`/api/filters`);
    return response.json();
  },
};
