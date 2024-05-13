import { envs } from "../../config";
import { DiscordWebhook } from "../../config/webhook-errors";

export class CustomError extends Error {

    constructor(
        public readonly statusCode: number,
        public readonly message: string
    ){
        super(message);
    }

    static badRequest(message: string): CustomError {
        return new CustomError(400, message);
    }

    static unauthorized(message: string): CustomError {
        return new CustomError(401, message);
    }

    static forbidden(message: string): CustomError {
        return new CustomError(403, message);
    }

    static notFound(message: string): CustomError {
        return new CustomError(404, message);
    }

    static conflict(message: string): CustomError {
        return new CustomError(409, message);
    }

    static tooManyRequests(message: string): CustomError {
        return new CustomError(429, message);
    }

    static internalServer(message: string): CustomError {
        new DiscordWebhook(envs.WEBHOOK_ERRORS).notify(message)
            .then( () => console.log('Send webhook') )
            .catch( error => console.log(`error hook: ${error.message}`) );

        return new CustomError(500, 'Internal Server Error');
    }

    static notImplemented(message: string): CustomError {
        return new CustomError(501, message);
    }

    static badGateway(message: string): CustomError {
        return new CustomError(502, message);
    }

    static serviceUnavailable(message: string): CustomError {
        return new CustomError(503, message);
    }

    static gatewayTimeout(message: string): CustomError {
        return new CustomError(504, message);
    }
};
