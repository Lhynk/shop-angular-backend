import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';

export const middyfy = (handler, schema?: any) => {
  let middyMiddleware = middy(handler).use(middyJsonBodyParser());

  if (schema !== undefined) {
    middyMiddleware = middyMiddleware
      .use(
        validator({
          eventSchema: transpileSchema(schema),
        })
      )
      .use(httpErrorHandler());
  }

  return middyMiddleware;
};
