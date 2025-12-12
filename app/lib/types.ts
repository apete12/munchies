export type Restaurant = {
  id: string;
  name: string;
  rating: string;
  filter_ids: string[];
  image_url: string;
  delivery_time_minutes: number;
  price_range_id: string;
};

export type OpenStatus = {
  restaurant_id: string;
  is_currently_open: boolean;
};

export interface EnrichedRestaurant extends Restaurant {
  is_currently_open: boolean;
}

export interface RestaurantsResponse {
  restaurants: Restaurant[];
}
