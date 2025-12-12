export type Restaurant = {
  id: string;
  name: string;
  rating: string;
  filter_ids: string[];
  image_url: string;
  delivery_time_minutes: number;
  price_range_id: string;
};

export type Filter = {
  id: string;
  name: string;
  image_url: string;
};
