import { BadgeProps } from './types';

const Badge = ({
  icon,
  text,
  containerClasses = 'flex items-center justify-center gap-x-2 px-2 rounded-full border-2 border-gray-300',
}: BadgeProps) => {
  return (
    <div className={containerClasses}>
      {icon && <>{icon}</>}
      {text}
    </div>
  );
};

export default Badge;
