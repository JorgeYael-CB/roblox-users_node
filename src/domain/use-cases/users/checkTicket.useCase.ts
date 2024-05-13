import { UsersDatasource } from "../../datasources/users.datasources";
import { CheckTicketDto } from "../../dtos/users";
import { CustomError } from "../../errors/CustomError";


export class CheckTicketUseCase{

    // DI
    constructor(
        private readonly validateJwt: <T>(token: string) => Promise<T | null>,
        private readonly usersDatasource: UsersDatasource,
    ){};


    public async check( checkTicketDto: CheckTicketDto, jwt: string ){
        //* Verificamos que el JWT sea valido
        const token = await this.validateJwt<{userId: string}>(jwt);
        if( !token ) throw CustomError.unauthorized('The key is invalid or expired');

        const {userId} = token;

        const user = await this.usersDatasource.checkUser( checkTicketDto );

        //* Verificamos que la firma del JWT coincida con la del usuario
        if( userId !== user.userId ) throw CustomError.unauthorized('this token is not valid for this user.');


        return {
            user,
            acces: true,
        };
    }
}
