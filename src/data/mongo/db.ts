import mongoose from "mongoose";



interface Options{
    mongoUrI: string;
}


export class MongoDatabase{

    static async connect( options: Options ){
        const {mongoUrI} = options;

        try {
            await mongoose.connect(mongoUrI);

            console.log('Mongo connected');
            return true;
        } catch (error) {
            console.log('Mongo Connection error');
            throw error;
        }
    };
};