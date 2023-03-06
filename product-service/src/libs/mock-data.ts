import { env } from 'process';

import { DynamoDB } from 'aws-sdk';
import { v4 } from 'uuid';

import { Product } from '../types/product';

const db = new DynamoDB.DocumentClient();

const products: Omit<Product, 'id'>[] = [
  {
    title: 'Arcadia Quest',
    price: 75,
    count: 1,
    description:
      'Fight against rival guilds and monsters in a campaign to reclaim the city of Arcadia',
  },
  {
    title: 'Everdell',
    price: 78,
    count: 2,
    description:
      'Gather resources to develop a harmonious village of woodland critters and structures',
  },
  {
    title: 'Gloomhaven',
    price: 100,
    count: 3,
    description:
      'Vanquish monsters with strategic cardplay. Fulfill your quest to leave your legacy!',
  },
  {
    title: 'Dodos Riding Dinos',
    price: 70,
    count: 5,
    description:
      'Race in different tracks using projectiles vs your foes to test your dexterity skills',
  },
];

export async function createMockData(): Promise<void> {
  await Promise.all(
    products.map(async product => {
      const id = v4();
      const { title, description, price, count } = product;
      await db
        .put({
          TableName: env.PRODUCTS_TABLE_NAME,
          Item: {
            id,
            title,
            description,
            price,
          },
        })
        .promise();
      await db
        .put({
          TableName: env.STOCKS_TABLE_NAME,
          Item: {
            product_id: id,
            count,
          },
        })
        .promise();
    })
  );
}

export async function cleanMockData(): Promise<void> {
  const { Items } = await db
    .scan({
      TableName: env.PRODUCTS_TABLE_NAME,
    })
    .promise();

  if (Items.length > 0) {
    await Promise.all(
      Items.map(async (product: Product) => {
        await db
          .delete({
            TableName: env.PRODUCTS_TABLE_NAME,
            Key: { id: product.id },
          })
          .promise();

        await db
          .delete({
            TableName: env.STOCKS_TABLE_NAME,
            Key: { product_id: product.id },
          })
          .promise();
      })
    );
  }
}
