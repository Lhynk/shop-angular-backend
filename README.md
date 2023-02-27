# Shop Angular Backend

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

## Installation

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

## Test Services Locally

To run the following commands, you should be inside the service folder that you want to test

### Products Services
  
| Function | Command  |
|--|--|
| GetProductsList  | `npx sls invoke local -f getProductsList`  |
| GetProductsById  | `npx sls invoke local -f getProducstById --path src/function/getProductsById/mock.json`|
