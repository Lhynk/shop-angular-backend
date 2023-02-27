import {
  ValidatedEventAPIGatewayProxyEvent,
  formatJSONError,
  formatJSONNotFound,
  formatJSONResponse,
} from '@libs/api-gateway';

import { getProductById } from '../../libs/mock-data';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<unknown> = async event => {
  try {
    const { productId } = event.pathParameters;

    const product = await getProductById(productId);

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

export const main = getProductsById;
