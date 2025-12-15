import breakfastImage from '../assets/breakfast.png';
import hamburgerImage from '../assets/hamburger.png';
import coffeeImage from '../assets/coffee.png';
import friesImage from '../assets/fries.png';
import tacoImage from '../assets/taco.png';
import burritoImage from '../assets/burrito.png';
import pizzaImage from '../assets/pizza.png';
import placeholder from '../assets/placeholder.png';

export function getRestaurantImage(imageSrc: string) {
  switch (imageSrc) {
    case '/images/breakfast.png':
      return breakfastImage;
    case '/images/hamburger.png':
      return hamburgerImage;
    case '/images/coffee.png':
      return coffeeImage;
    case '/images/fries.png':
      return friesImage;
    case '/images/taco.png':
      return tacoImage;
    case '/images/pizza.png':
      return pizzaImage;
    case '/images/burrito.png':
      return burritoImage;
    default:
      return placeholder;
  }
}
