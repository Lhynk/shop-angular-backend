import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    headers: { 'Access-Control-Allow-Origin': '*' },
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export const formatJSONError = (response: Record<string, unknown>) => {
  return {
    headers: { 'Access-Control-Allow-Origin': '*' },
    statusCode: 500,
    body: JSON.stringify(response),
  };
};

export const formatJSONNotFound = (response: Record<string, unknown>) => {
  return {
    headers: { 'Access-Control-Allow-Origin': '*' },
    statusCode: 404,
    body: JSON.stringify(response),
  };
};

export const formatJSONBadRequest = (response: Record<string, unknown>) => {
  return {
    headers: { 'Access-Control-Allow-Origin': '*' },
    statusCode: 400,
    body: JSON.stringify(response),
  };
};
