import { CheckTicketDto, CreateUserDto } from "../dtos/users";
import { UserEntity } from "../entities";



export abstract class UsersDatasource {

    abstract createUser( createUserDto: CreateUserDto ): Promise<UserEntity>
    abstract checkUser( checkTicketDto: CheckTicketDto ): Promise<UserEntity>
}

