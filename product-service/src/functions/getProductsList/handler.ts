import { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONError, formatJSONResponse } from '@libs/api-gateway';

import { getProducts } from '../../libs/mock-data';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<unknown> = async () => {
  try {
    const products = await getProducts();
    return formatJSONResponse({
      products,
    });
  } catch (error) {
    return formatJSONError(error);
  }
};

export const main = getProductsList;
