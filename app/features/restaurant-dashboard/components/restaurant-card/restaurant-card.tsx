import Image from 'next/image';
import { RestaurantCardProps } from './types';
import RestaurantOpenStatusBadge from '../retaurant-open-status-badge/retaurant-open-status-badge';

import Badge from '@/app/components/badge/badge';
const RestaurantCard = ({
  name,
  imageSrc,
  altText,
  isRestaurantOpen,
  placeholderImage,
  deliveryTimeEstimate,
}: RestaurantCardProps) => {
  return (
    <div className="min-w-80 min-h-32 m-4 p-4 border-2 border-gray-300 rounded-lg shadow-lg">
      <div className="flex items-center justify-start gap-x-3 mb-4">
        <RestaurantOpenStatusBadge isRestaurantOpen={isRestaurantOpen} />
        <Badge text={deliveryTimeEstimate} />
      </div>

      <Image
        className="max-w-72"
        src={imageSrc || placeholderImage}
        alt={altText}
        width={200}
        height={200}
      />
      <h3>{name}</h3>
    </div>
  );
};

export default RestaurantCard;
