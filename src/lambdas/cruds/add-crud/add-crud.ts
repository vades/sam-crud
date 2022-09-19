
/**
 *
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ResponseBody } from '../../../app/response-body';
import { v4 as uuid} from 'uuid';
export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    let message: string;
    const responseBody = new ResponseBody;
    const data = {
        id: uuid(),
        title: 'Crud created'
    };
    try {
        response = responseBody.status200(data) as APIGatewayProxyResult;
    } catch (err) {
        message = responseBody.catch(err);
        response = responseBody.status500(message) as APIGatewayProxyResult;
    }

    return response;
};
