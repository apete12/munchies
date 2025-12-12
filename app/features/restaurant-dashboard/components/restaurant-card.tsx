import Image from 'next/image';
import placeholder from '@/app/assets/placeholder.png';

type RestaurantCardProps = {
  name: string;
  imageSrc: string;
  altText: string;
};

const RestaurantCard = ({ name, imageSrc, altText }: RestaurantCardProps) => {
  return (
    <div className="max-w-96 min-h-32 m-4 p-4 border-2 border-gray-300 rounded-lg shadow-lg">
      <h3>{name}</h3>
      <Image
        className="max-w-72"
        src={imageSrc || placeholder}
        alt={altText}
        width={200}
        height={200}
      />
    </div>
  );
};

export default RestaurantCard;
