
/**
 *
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */


import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import DynamoDB = require('aws-sdk/clients/dynamodb');
import { DataMapper } from "@aws/dynamodb-data-mapper";

import { ResponseBody } from '../../../app/response-body';
import { getFormatedDateTime, isValidUuid, hasBodyObject } from '../../../app/utils';
import { CrudTable } from '../cruds.mapper';

const client = new DynamoDB({ endpoint: 'http://host.docker.internal:8000' });
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
        const fetched: any = await mapper.get({ item: crud });
        const response = await mapper.delete({ item: fetched });
        return responseBody.status200(crud, 'Deleted');
    } catch (err) {
        const message = responseBody.catch(err);
        return responseBody.status500(message);
    }
};
