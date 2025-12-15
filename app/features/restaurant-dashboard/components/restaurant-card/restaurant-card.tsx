//// GENERAL ////
import Image from 'next/image';

//// COMPONENTS ////
import { Badge } from '@/app/components';
import { RestaurantOpenStatusBadge } from '@/app/features';

//// TYPES ////
import { RestaurantCardProps } from './types';

const RestaurantCard = ({
  name,
  imageSrc,
  altText,
  isRestaurantOpen,
  deliveryTimeEstimate,
  containerClasses = 'relative w-full h-full p-4 rounded-lg shadow-lg overflow-hidden bg-white ',
  imageClasses = 'absolute -top-0 -right-2 rotate-[-15deg] opacity-90',
}: RestaurantCardProps) => {
  return (
    <div className={containerClasses}>
      <Image
        className={imageClasses}
        src={imageSrc}
        alt={altText}
        width={100}
        height={100}
      />

      <div className="flex items-center justify-start gap-x-3 mb-4">
        <RestaurantOpenStatusBadge isRestaurantOpen={isRestaurantOpen} />
        <Badge text={deliveryTimeEstimate} />
      </div>
      <h3>{name}</h3>
    </div>
  );
};

export default RestaurantCard;
