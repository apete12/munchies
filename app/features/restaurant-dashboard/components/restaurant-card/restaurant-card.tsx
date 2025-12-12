import Image from 'next/image';
import placeholder from '@/app/assets/placeholder.png';
import { RestaurantCardProps } from './types';
import RestaurantOpenStatusBadge from '../retaurant-open-status-badge/retaurant-open-status-badge';

const RestaurantCard = ({
  name,
  imageSrc,
  altText,
  isRestaurantOpen,
}: RestaurantCardProps) => {
  return (
    <div className="min-w-80 min-h-32 m-4 p-4 border-2 border-gray-300 rounded-lg shadow-lg">
      <RestaurantOpenStatusBadge isRestaurantOpen={isRestaurantOpen} />
      <Image
        className="max-w-72"
        src={imageSrc || placeholder}
        alt={altText}
        width={200}
        height={200}
      />
      <h3>{name}</h3>
    </div>
  );
};

export default RestaurantCard;
