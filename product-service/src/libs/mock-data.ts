import { Product } from '../types/product';

const products: Product[] = [
  {
    id: 'arcadia-quest',
    title: 'Arcadia Quest',
    price: 75,
    count: 1,
    description:
      'Fight against rival guilds and monsters in a campaign to reclaim the city of Arcadia',
  },
  {
    id: 'everdell',
    title: 'Everdell',
    price: 78,
    count: 2,
    description:
      'Gather resources to develop a harmonious village of woodland critters and structures',
  },
  {
    id: 'glommhaven',
    title: 'Gloomhaven',
    price: 100,
    count: 3,
    description:
      'Vanquish monsters with strategic cardplay. Fulfill your quest to leave your legacy!',
  },
  {
    id: 'dodos-riding-dino',
    title: 'Dodos Riding Dinos',
    price: 70,
    count: 5,
    description:
      'Race in different tracks using projectiles vs your foes to test your dexterity skills',
  },
];

export function getProducts(): Promise<Product[]> {
  return Promise.resolve(products);
}

export function getProductById(productId: string): Promise<Product> {
  const product = products.find(p => p.id === productId);
  return Promise.resolve(product);
}
