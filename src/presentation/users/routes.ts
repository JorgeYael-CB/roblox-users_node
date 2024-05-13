import { Router } from "express";
import { UsersController } from "./controller";
import { UsersRepositoryImpl } from "../../infrastucture/repositories/users.repotisory.impl";
import { UserDatasourceMongoImpl } from "../../infrastucture/datasources/users.datasource.impl.mongo";
import { JwtAdapter } from "../../config/jwt";
import { DiscordWebhook } from "../../config/webhook-errors";
import { envs } from "../../config";



const discordHook = new DiscordWebhook(envs.WEBHOOK_ERRORS);
const discordHookEventsUser = new DiscordWebhook(envs.WELCOME_USERS_HOOK);

const usersDatasource = new UserDatasourceMongoImpl(discordHookEventsUser);
const usersRepository = new UsersRepositoryImpl( usersDatasource );
const createJwt = JwtAdapter.generateToken;
const validateJwt = JwtAdapter.validateToken;


export class UsersRoutes{

    static get routes():Router{
        const router = Router();
        const controller = new UsersController( usersRepository, createJwt, validateJwt, discordHook );


        //* Ejecutamos las rutas
        router.post('/create-ticket', controller.createTicket);
        router.post('/check-ticket/:jwt', controller.checkTicket);


        return router;
    }
};
