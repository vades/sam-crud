
/**
 *
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { v4 as uuid } from 'uuid';
import { getFormatedDateTime, hasBodyObject, ResponseBody } from '../../app';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const responseBody = new ResponseBody;
    const body = JSON.parse(event?.body || '\{\}');
    if (!hasBodyObject(body)) {
        return responseBody.status400('Missing input body');
    }

    const data: any = {};
    data.id = uuid();
    data.createdAt = getFormatedDateTime(new Date);
    data.updatedAt = getFormatedDateTime(new Date);
    data.title = body.title + ' ' + data.createdAt;

    try {
        const response = data;
        return responseBody.status201(response);
    } catch (err) {
        const message = responseBody.catch(err);
        return responseBody.status500(message);
    }
};
