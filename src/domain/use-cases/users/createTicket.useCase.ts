import { CreateUserDto } from "../../dtos/users";
import { UsersRepository } from "../../repositories/users.repository";


export class CreateTicketUseCase{


    // DI
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly createJwt: (payload: Object, duration?: string) => Promise<string | null>,
    ){};


    public async use( createUserDto: CreateUserDto ){
        //* Regresamos el usuario
        const user = await this.usersRepository.createUser(createUserDto);

        //* Creamos el JWT
        const jwt = await this.createJwt({userId: user.userId}, '1d');

        //* Retornamos sus datos de usuario
        return {
            user,
            jwt,
        }
    }
}
