import { formatJSONError, formatJSONResponse } from '@libs/api-gateway';
import { getAllProducts } from '@libs/db-helper';

import { middyfy } from '../../libs/lambda';

const getProductsList = async () => {
  try {
    const products = await getAllProducts();

    return formatJSONResponse({
      products,
    });
  } catch (error) {
    return formatJSONError(error);
  }
};

export const main = middyfy(getProductsList);
