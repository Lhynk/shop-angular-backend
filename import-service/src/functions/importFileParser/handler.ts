import { config, env } from 'process';
import { Readable } from 'stream';

import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import csv from 'csv-parser';

import { formatJSONError } from '../../libs/api-gateway';

const s3Client = new S3Client({
  region: 'us-east-1',
});

const importFileParser = async event => {
  try {
    const { Records } = event;
    const key = Records[0].s3.object.key;

    const command = new GetObjectCommand({
      Bucket: env.BUCKET_NAME,
      Key: key,
    });

    const response = await s3Client.send(command);

    const result = [];
    (response.Body as Readable)
      .pipe(csv())
      .on('data', data => result.push(data))
      .on('error', err => console.log(err))
      .on('end', async () => {
        try {
          console.log('Data:', result);

          console.log('Moving file');
          await moveFile(key);
        } catch (error) {
          console.log(error);
        }
      });
  } catch (error) {
    return formatJSONError(error);
  }
};

function moveFile(key: string) {
  const command = new CopyObjectCommand({
    Bucket: env.BUCKET_NAME,
    CopySource: `${env.BUCKET_NAME}/${key}`,
    Key: `parsed/${key.split('/')[1]}`,
  });
  return s3Client.send(command).then(() => deleteFile(key));
}

function deleteFile(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: env.BUCKET_NAME,
    Key: key,
  });
  return s3Client.send(command);
}

export const main = importFileParser;
