
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
import { ResponseBody } from '../../../app/response-body';
import { getFormatedDate, getFormatedDateTime, isValidUuid } from '../../../app/utils';


export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const responseBody = new ResponseBody;
    const id = event.pathParameters?.id || '';
    if (!isValidUuid(id)) {
        return responseBody.status400('Invalid ID format') as APIGatewayProxyResult;
    }
    let response: APIGatewayProxyResult;
    let message: string;

    const data = {
        //event,
        id: event.pathParameters?.id,
        title: 'First crud',
        validUuid: isValidUuid(id),
        createdAt: getFormatedDate(new Date),
        updatedAt: getFormatedDateTime(new Date)
    };
    try {
        response = responseBody.status200(data) as APIGatewayProxyResult;
    } catch (err) {
        message = responseBody.catch(err);
        response = responseBody.status500(message) as APIGatewayProxyResult;
    }

    return response;
};
