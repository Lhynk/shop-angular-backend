import { addProduct } from '@libs/db-helper';

import {
  ValidatedEventAPIGatewayProxyEvent,
  formatJSONError,
  formatJSONResponse,
} from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import { Product } from '../../types/product';
import schema from './schema';

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async event => {
  try {
    const product = event.body as Product;

    const result = await addProduct(product);

    return formatJSONResponse({
      id: result,
    });
  } catch (error) {
    return formatJSONError(error);
  }
};

export const main = middyfy(createProduct, schema);
