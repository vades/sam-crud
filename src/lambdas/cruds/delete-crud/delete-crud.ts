
/**
 *
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ResponseBody } from '../../../app/response-body';
import { getFormatedDateTime, isValidUuid } from '../../../app/utils';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const responseBody = new ResponseBody;
    const id = event.pathParameters?.id || '';
    if (!isValidUuid(id)) {
        return responseBody.status400('Invalid ID format') as APIGatewayProxyResult;
    }

    let response: APIGatewayProxyResult;
    let message: string;
    const data = {
        id: id,
        deletedAt: getFormatedDateTime(new Date)
    };

    try {
        response = responseBody.status200(data) as APIGatewayProxyResult;
    } catch (err) {
        message = responseBody.catch(err);
        response = responseBody.status500(message) as APIGatewayProxyResult;
    }

    return response;
};
