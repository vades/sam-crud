
/**
 *
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { ResponseBody } from '../../app';


export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const responseBody = new ResponseBody;
    const response = [
        {
            id: 'aeebb8fd-dad0-47dd-8b7a-51b2afcb2073',
            title: 'First crud',
            apiKey: process.env.API_KEY,
            event
        },
        {
            id: 'beebb8fd-dad0-47dd-8b7a-51b2afcb2073',
            title: 'Second crud',
            apiKey: process.env.API_KEY
        },
    ]
    try {

        return responseBody.status200(response);
    } catch (err) {
        const message = responseBody.catch(err);
        return responseBody.status500(message);
    }
};
