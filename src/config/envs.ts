import 'dotenv/config'
import { get } from "env-var";



export const envs = {
    PORT: get('PORT').required().asPortNumber(),

    MONGO_URI: get('MONGO_URI').required().asString(),

    JWT_SEED: get('JWT_SEED').required().asString(),

    WEBHOOK_ERRORS: get('WEBHOOK_ERRORS').required().asString(),
    WELCOME_USERS_HOOK: get('WELCOME_USERS_HOOK').required().asString(),
}
