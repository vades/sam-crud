
/**
 *
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ResponseBody } from '../../../app/response-body';
import { v4 as uuid } from 'uuid';
import { getFormatedDateTime, hasBodyObject } from '../../../app/utils';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const responseBody = new ResponseBody;
    const body = JSON.parse(event?.body || '\{\}');
    if (!hasBodyObject(body)) {
        return responseBody.status400('Missing input body') as APIGatewayProxyResult;
    }


    // TODO: move this to the model
    let data = body;
    data.id = uuid();
    data.createdAt = getFormatedDateTime(new Date);
    data.updatedAt = getFormatedDateTime(new Date);

    let response: APIGatewayProxyResult;
    let message: string;

    try {
        response = responseBody.status201(data) as APIGatewayProxyResult;
    } catch (err) {
        message = responseBody.catch(err);
        response = responseBody.status500(message) as APIGatewayProxyResult;
    }

    return response;
};
