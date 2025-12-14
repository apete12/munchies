import { RestaurantOpenStatusBadgeProps } from './types';
import Badge from '@/app/components/badge/badge';

const RestaurantOpenStatusBadge = ({
  isRestaurantOpen,
}: RestaurantOpenStatusBadgeProps) => {
  let badgeIcon;
  let badgeText;

  if (isRestaurantOpen) {
    badgeIcon = (
      <span className="inline-block size-2 rounded-full bg-green-600"></span>
    );
    badgeText = 'Open';
  } else {
    badgeIcon = (
      <span className="inline-block size-2 rounded-full bg-gray-800"></span>
    );
    badgeText = 'Closed';
  }
  return <Badge text={badgeText} icon={badgeIcon} />;
};

export default RestaurantOpenStatusBadge;
