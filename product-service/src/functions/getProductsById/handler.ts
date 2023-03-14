import {
  ValidatedEventAPIGatewayProxyEvent,
  formatJSONError,
  formatJSONNotFound,
  formatJSONResponse,
} from '@libs/api-gateway';
import { getProduct } from '@libs/db-helper';

import { middyfy } from '../../libs/lambda';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<unknown> = async event => {
  try {
    const { productId } = event.pathParameters;

    const product = await getProduct(productId);

    if (!product) {
      return formatJSONNotFound({
        message: 'Product not found',
      });
    }

    return formatJSONResponse(product);
  } catch (error) {
    return formatJSONError(error);
  }
};

export const main = middyfy(getProductsById);
