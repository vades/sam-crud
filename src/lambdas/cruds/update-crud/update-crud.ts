
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

import { ResponseBody, DdbConfig, getFormatedDateTime, isValidUuid, hasBodyObject } from '../../../app';
import { CrudTable } from '../cruds.mapper';

const client = new DynamoDB(DdbConfig);
const mapper = new DataMapper({ client });

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const responseBody = new ResponseBody;
    const id = event.pathParameters?.id || '';
    if (!isValidUuid(id)) {
        return responseBody.status400('Invalid ID format') as APIGatewayProxyResult;
    }

    const body = JSON.parse(event?.body || '\{\}');
    if (!hasBodyObject(body)) {
        return responseBody.status400('Missing input body') as APIGatewayProxyResult;
    }

    const crud = new CrudTable();
    crud.id = id;

    try {
        const fetched: any = await mapper.get({ item: crud });
        fetched.title = body.title;
        fetched.updatedAt = getFormatedDateTime(new Date);

        const response = await mapper.update({ item: fetched });
        return responseBody.status200(response, 'Updated');
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
