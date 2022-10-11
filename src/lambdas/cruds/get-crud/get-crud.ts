
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import DynamoDB = require('aws-sdk/clients/dynamodb');
import { DataMapper } from "@aws/dynamodb-data-mapper";

import { ResponseBody, DdbConfig } from '../../../app';
import { isValidUuid } from '../../../app/utils';
import { CrudTable } from '../cruds.mapper';

const client = new DynamoDB(DdbConfig);
const mapper = new DataMapper({ client });

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const responseBody = new ResponseBody;
    const id = event.pathParameters?.id || '';
    if (!isValidUuid(id)) {
        return responseBody.status400('Invalid ID format');
    }
    const crud = new CrudTable();
    crud.id = id;
    try {
        const response = await mapper.get({ item: crud });
        return responseBody.status200(response);
    } catch (err: any) {
        const message = responseBody.catch(err);
        switch (err?.name) {
            case 'ItemNotFoundException':
                return responseBody.itemNotFound(id);

            default:
                return responseBody.status500(message);
        }


    }
};
