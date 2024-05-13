import { DiscordWebhook } from "../../config/webhook-errors";
import { UserModel } from "../../data/mongo";
import { UsersDatasource } from "../../domain/datasources/users.datasources";
import { CheckTicketDto, CreateUserDto } from "../../domain/dtos/users";
import { UserEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/CustomError";
import { UserMapper } from "../mappers/User.mapper";



export class UserDatasourceMongoImpl implements UsersDatasource{

    constructor(
        private readonly newUserEvent: DiscordWebhook,
    ){}


    async checkUser(checkTicketDto: CheckTicketDto): Promise<UserEntity> {
        try {
            const user = await UserModel.findOne({userId: checkTicketDto.userId});
            if( !user ) throw CustomError.unauthorized('this token is not valid for this user.');

            if( !user.available ) throw CustomError.unauthorized('User banned!');

            return UserMapper.userEntityFromOject(user);
        } catch (error) {
            if( error instanceof CustomError ){
                throw error;
            };

            throw new Error(`${error}`);
        }
    };


    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        try {
            //* Verificamos que no exista un usuario
            let user = await UserModel.findOne( {userId: createUserDto.userId} );

            if( !user ){
                // Creamos el nuevo usuario
                user = await UserModel.create({
                    name: createUserDto.userName,
                    userId: createUserDto.userId,
                    rebirths: createUserDto.userRebirths,
                });

                //* Mandamos el aviso al servidor de discord
                await this.newUserEvent.notify(`@here\nA new user has registered in your script.\nwelcome to: **${createUserDto.userName}**\ncongratulations for having **${createUserDto.userRebirths}** Rebirths!`);
            }

            //* Verificamos que el usuario no este baneado del script (en caso de que exista)
            if( !user.available ) throw CustomError.unauthorized('User banned');


            //* Creamos el nuevo usuario
            await user.save();


            //* Retornamos el nuevo usuario mapeado
            return UserMapper.userEntityFromOject( user );

        } catch (error) {
            if( error instanceof CustomError ){
                throw error;
            };

            throw new Error(`${error}`);
        }
    };
};