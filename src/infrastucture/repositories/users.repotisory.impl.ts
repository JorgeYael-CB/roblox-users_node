import { UsersDatasource } from "../../domain/datasources/users.datasources";
import { CheckTicketDto, CreateUserDto } from "../../domain/dtos/users";
import { UserEntity } from "../../domain/entities";
import { UsersRepository } from "../../domain/repositories/users.repository";



export class UsersRepositoryImpl implements UsersRepository{

    constructor(
        private readonly UsersDatasource: UsersDatasource,
    ){}


    checkUser(checkTicketDto: CheckTicketDto): Promise<UserEntity> {
        return this.UsersDatasource.checkUser(checkTicketDto);
    };


    createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.UsersDatasource.createUser( createUserDto );
    }


}
