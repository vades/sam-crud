export class ResponseBody {

    public status200(data: any, message: string = 'OK'): Object{
        return this.responseBody(200,message, data)
    }
    
    public status500(message: string = 'Internal server error'): Object{
        return this.responseBody(500,message)
    }


    private responseBody(statusCode: number, message: string, data: any = undefined): Object{
        const response = {
            statusCode,
            body: JSON.stringify({
                message,
                data
            }),
        };
        return response;
    }

    public catch(error: any, trace = false): string{
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