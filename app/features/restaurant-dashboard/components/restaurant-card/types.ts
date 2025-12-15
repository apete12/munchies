import { StaticImageData } from 'next/image';

export type RestaurantCardProps = {
  name: string;
  imageSrc: StaticImageData;
  altText: string;
  isRestaurantOpen: boolean;
  deliveryTimeEstimate: string;
  containerClasses?: string;
  imageClasses?: string;
};
