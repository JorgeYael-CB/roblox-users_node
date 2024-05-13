import { envs } from "./config";
import { MongoDatabase } from "./data/mongo";
import { CustomError } from "./domain/errors/CustomError";
import { Routes, Server } from "./presentation";




(()=>{
    main();
})();


async function main(){
    //* DB
    try {
        const db = await MongoDatabase.connect({
            mongoUrI: envs.MONGO_URI,
        })
        console.log('Db Connected')
    } catch (error) {
        CustomError.internalServer(`${error}`)
    }


    //* Iniciamos el servidor
    const routes = Routes.routes
    const server = new Server({
        port: envs.PORT,
        publicPath: 'public',
        routes,
    });


    server.start();
};