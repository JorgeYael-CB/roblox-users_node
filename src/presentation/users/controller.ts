import { Request, Response } from "express";
import { CheckTicketDto, CreateUserDto } from '../../domain/dtos/users';
import { UsersRepository } from "../../domain/repositories/users.repository";
import { CreateTicketUseCase } from "../../domain/use-cases/users/createTicket.useCase";
import { CustomError } from "../../domain/errors/CustomError";
import { CheckTicketUseCase } from "../../domain/use-cases/users";
import { DiscordWebhook } from "../../config/webhook-errors";



export class UsersController{

    // DI
    constructor(
        private readonly userRepository: UsersRepository,
        private readonly createJwt: (payload: Object, duration?: string) => Promise<string | null>,
        private readonly validateJwt:  <T>(token: string) => Promise<T | null>,
        private readonly errorsHook: DiscordWebhook,
    ){};


    private handleError( error:unknown, res:Response ){
        if( error  instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }

        this.errorsHook.notify(`${error}`);
        return res.status(500).json({error: 'Internal server error!'});
    };


    createTicket = (req:Request, res:Response) => {
        const [error, createUserDto] = CreateUserDto.create(req.body);
        if( error ) return res.status(400).json({error});


        //* mandamos a llamar al repository y creamos un JWT de 1 dia con el userId del usuario de Roblox (UseCase)
        new CreateTicketUseCase(this.userRepository, this.createJwt)
            .use(createUserDto!)
                .then( data => res.status(200).json({data}) )
                .catch( error => this.handleError(error, res) );
    };


    checkTicket = ( req:Request, res:Response ) => {
        const [error, checkTicketDto] = CheckTicketDto.create( req.body );
        if( error ) return res.status(400).json({error});


        const {jwt} = req.params;

        //Todo: UseCase para validar la entrada al script
        const useCase = new CheckTicketUseCase(this.validateJwt, this.userRepository)
        useCase.check(checkTicketDto!, jwt)
            .then( data => res.status(200).json({data}) )
            .catch( error => this.handleError( error, res ) );
    };
};