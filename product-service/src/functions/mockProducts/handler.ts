import {
  ValidatedEventAPIGatewayProxyEvent,
  formatJSONError,
  formatJSONResponse,
} from '@libs/api-gateway';

import { cleanMockData, createMockData } from '../../libs/mock-data';

const mockProducts: ValidatedEventAPIGatewayProxyEvent<unknown> = async () => {
  try {
    await cleanMockData();
    await createMockData();
    return formatJSONResponse({
      message: 'Mocking data is now ready to use',
    });
  } catch (error) {
    return formatJSONError(error);
  }
};

export const main = mockProducts;
