const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <div className="max-w-96 max-h-96 m-4 p-4 border-2 border-gray-300 rounded-lg shadow-lg">
      <h3>{restaurant.name}</h3>
    </div>
  );
};

export default RestaurantCard;
