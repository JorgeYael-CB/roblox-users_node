import express, { Router } from 'express';
import cors from 'cors';


interface Props{
    port: number;
    publicPath: string;
    routes: Router;
}


export class Server{

    private readonly app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;


    constructor( config: Props ){
        const {port, publicPath, routes} = config;

        this.port = port;
        this.publicPath = publicPath;
        this.routes = routes;

        this.config();
    };


    private config(){
        //* Middlewares
        this.app.use( cors() );

        this.app.use( express.json() );
        this.app.use( express.urlencoded( {extended: true} ) );

        //* Routes
        this.app.use( this.routes );


        //* 404
        this.app.use(function(req, res, next) {
            res.status(404).send('Sorry cant find that!');
        });
    };


    public start(){
        this.app.listen(this.port, () => {
            console.log(`http://localhost:${this.port}/`);
        })
    };
};