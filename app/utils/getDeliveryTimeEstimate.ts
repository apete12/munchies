export const getDeliveryTimeEstimate = (deliveryTime: number): string => {
  const rounded = Math.round(deliveryTime / 5) * 5;

  const min = rounded - 5;
  const max = rounded + 5;

  return `${min}-${max} min`;
};
