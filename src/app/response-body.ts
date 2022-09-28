export class ResponseBody {

    public status200(data: any, message: string = ''): Object {
        const responseMessage = 'OK. ' + message;
        return this.responseBody(200, responseMessage, data);
    }

    public status201(data: any, message: string = ''): Object {
        const responseMessage = 'Created. ' + message;
        return this.responseBody(201, responseMessage, data);
    }

    public status500(message: string = ''): Object {
        const responseMessage = 'Internal server error! ' + message;
        return this.responseBody(500, responseMessage);
    }

    public status400(message: string = ''): Object {
        const responseMessage = 'Bad Request! ' + message
        return this.responseBody(400, responseMessage);
    }


    private responseBody(statusCode: number, message: string, data: any = undefined): Object {
        const response = {
            statusCode,
            body: JSON.stringify({
                message: message.trim(),
                data
            }),
        };
        return response;
    }

    public catch(error: any, trace = false): string {
        let message = 'Unknown exception';
        if (error instanceof Error) {
            message = error.message;
        }
        console.error('\x1b[31m%s\x1b[0m', message);
        if (trace) {
            console.error('\x1b[31m%s\x1b[0m', error);
        }

        return message;
    }

}