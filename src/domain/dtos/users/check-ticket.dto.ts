

export class CheckTicketDto{


    constructor(
        public readonly userId: string,
    ){};


    static create( obj: {[key:string]:any} ):[string?, CheckTicketDto?] {
        const {userId} = obj;


        if( !userId ) return ['Missing userId'];


        return[undefined, new CheckTicketDto(userId)];
    }
};
