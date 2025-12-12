import { BadgeProps } from './types';

const Badge = ({ icon, text, containerClasses }: BadgeProps) => {
  return (
    <div className={containerClasses}>
      {icon && <>{icon}</>}
      {text}
    </div>
  );
};

export default Badge;
