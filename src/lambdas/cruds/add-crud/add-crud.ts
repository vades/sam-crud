
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
import { v4 as uuid } from 'uuid';
import { getFormatedDateTime, hasBodyObject } from '../../../app/utils';
import { CrudTable } from '../cruds.mapper';

const client = new DynamoDB({ endpoint: 'http://host.docker.internal:8000' });
const mapper = new DataMapper({ client });

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const responseBody = new ResponseBody;
    const body = JSON.parse(event?.body || '\{\}');
    if (!hasBodyObject(body)) {
        return responseBody.status400('Missing input body');
    }

    const crud = new CrudTable();
    crud.id = uuid();
    crud.createdAt = getFormatedDateTime(new Date);
    crud.updatedAt = getFormatedDateTime(new Date);
    crud.title = body.title + ' ' + crud.createdAt;

    try {
        const response = await mapper.put({ item: crud });
        return responseBody.status201(response);
    } catch (err) {
        const message = responseBody.catch(err);
        return responseBody.status500(message);
    }
};
