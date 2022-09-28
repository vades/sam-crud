
/**
 *
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ResponseBody } from '../../../app/response-body';
import { getFormatedDateTime, isValidUuid, hasBodyObject } from '../../../app/utils';

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


    // TODO: move this to the model
    let data = body;
    data.id = id;
    data.createdAt = '2022-09-28 17:12:06';
    data.updatedAt = getFormatedDateTime(new Date);

    let response: APIGatewayProxyResult;
    let message: string;

    try {
        response = responseBody.status200(data) as APIGatewayProxyResult;
    } catch (err) {
        message = responseBody.catch(err);
        response = responseBody.status500(message) as APIGatewayProxyResult;
    }

    return response;
};
