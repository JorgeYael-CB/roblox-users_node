import { Router } from "express";
import { UsersRoutes } from "./users/routes";



export class Routes{


    static get routes():Router{
        const router = Router();


        //* Le pasamos las rutas
        router.use('/api', UsersRoutes.routes);


        return router
    }
}
