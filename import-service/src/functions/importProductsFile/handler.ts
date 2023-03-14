import { env } from 'process';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  formatJSONError,
  formatJSONNotFound,
  formatJSONResponse,
} from '@libs/api-gateway';

import { middyfy } from '../../libs/lambda';

const s3Client = new S3Client({
  region: 'us-east-1',
});

const importProductFile = async event => {
  try {
    const { name } = event.queryStringParameters;

    if (!name) {
      return formatJSONNotFound({
        message: 'File name is required',
      });
    }

    const command = new PutObjectCommand({
      Bucket: env.BUCKET_NAME,
      Key: `uploaded/${name}`,
      ContentType: 'text/csv',
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });

    return formatJSONResponse({
      url,
    });
  } catch (error) {
    return formatJSONError(error);
  }
};

export const main = middyfy(importProductFile);
