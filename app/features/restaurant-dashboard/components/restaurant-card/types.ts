import { StaticImageData } from 'next/image';

export type RestaurantCardProps = {
  name: string;
  imageSrc: string;
  altText: string;
  isRestaurantOpen: boolean;
  placeholderImage: StaticImageData;
  priceRange: string;
};
