import { UserEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/CustomError";


export class UserMapper{


    static userEntityFromOject( obj: {[key:string]:any} ): UserEntity{
        const { userName, userRebirths, userId, id, _id, available, comprador } = obj;


        if( !id && !_id ) throw CustomError.badRequest('Missing ID');


        return {
            userName,
            userRebirths,
            userId,
            id: id || _id,
            available,
            comprador
        }
    }

}
