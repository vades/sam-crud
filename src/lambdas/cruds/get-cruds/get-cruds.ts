
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
import { CrudTable } from '../cruds.mapper';

const client = new DynamoDB({ endpoint: 'http://host.docker.internal:8000' });
const mapper = new DataMapper({ client });


export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const crud = new CrudTable();
    const responseBody = new ResponseBody;
    try {
        const response: CrudTable[] = [];
        for await (const item of mapper.scan({ valueConstructor: CrudTable })) {
            response.push(item);
        }
        return responseBody.status200(response);
    } catch (err) {
        const message = responseBody.catch(err);
        return responseBody.status500(message);
    }
};
