import { env } from 'process';

import { DynamoDB } from 'aws-sdk';
import { v4 } from 'uuid';

import { Product } from '../types/product';
import { Stock } from '../types/stock';

const db = new DynamoDB.DocumentClient();

export async function getAllProducts(): Promise<Product[]> {
  console.log('Get All products');

  const products = await scan<Product[]>(env.PRODUCTS_TABLE_NAME);
  const stocks = await scan<Stock[]>(env.STOCKS_TABLE_NAME);

  return products.map<Product>(p => {
    const stock = stocks.find(s => s.product_id === p.id);
    return joinProductWithStock(p, stock);
  });
}

export async function getProduct(id: string): Promise<Product> {
  console.log(`Get Product - ProductId:${id}`);
  const product = await get<Product>(env.PRODUCTS_TABLE_NAME, { id });

  if (!product) return null;

  const stock = await get<Stock>(env.STOCKS_TABLE_NAME, {
    product_id: id,
  });

  return joinProductWithStock(product, stock);
}

export async function addProduct(item: Product): Promise<string> {
  console.log(`Create Product - Product:${JSON.stringify(item)}`);

  item.id = v4();

  await db
    .put({
      TableName: env.PRODUCTS_TABLE_NAME,
      Item: item,
    })
    .promise();

  await db
    .put({
      TableName: env.STOCKS_TABLE_NAME,
      Item: {
        product_id: item.id,
        count: item.count,
      } as Stock,
    })
    .promise();

  return item.id;
}

async function scan<T>(tableName: string): Promise<T> {
  const { Items = [] } = await db
    .scan({
      TableName: tableName,
    })
    .promise();

  return Items as T;
}

async function get<T>(tableName: string, key: any): Promise<T> {
  const { Item } = await db
    .get({
      TableName: tableName,
      Key: key,
    })
    .promise();

  return Item as T;
}

function joinProductWithStock(product: Product, stock: Stock): Product {
  return {
    ...product,
    count: stock.count,
  };
}
