


export class UserEntity{

    constructor(
        public readonly userName: string,
        public readonly userRebirths: number,
        public readonly userId: string,
        public readonly id: string,
        public readonly available: boolean,
        public readonly comprador: boolean,
    ){};
};