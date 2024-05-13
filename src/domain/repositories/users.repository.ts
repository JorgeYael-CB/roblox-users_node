import { CheckTicketDto, CreateUserDto } from "../dtos/users";
import { UserEntity } from "../entities";



export abstract class UsersRepository {
    abstract createUser( createUserDto: CreateUserDto ): Promise<UserEntity>
    abstract checkUser( checkTicketDto: CheckTicketDto ): Promise<UserEntity>
}

