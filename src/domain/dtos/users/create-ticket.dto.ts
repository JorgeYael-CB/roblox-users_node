


export class CreateUserDto{


    constructor(
        public readonly userName: string,
        public readonly userId: string,
        public readonly userRebirths: number,
    ){};



    static create( obj: { [key:string]:any } ): [string?, CreateUserDto?]{
        const { userName, userRebirths, userId } = obj;

        if( !userName ) return ['Missing userName'];
        if( !userRebirths ) return ['Missing userRebirths'];
        if( isNaN(Number(userRebirths) )) return ['userRebirths is not a valid'];

        if( !userId ) return ['Missing userId'];


        return[undefined, new CreateUserDto(userName, userId, Number(userRebirths))];
    };
};