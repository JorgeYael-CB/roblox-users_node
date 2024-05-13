

export class DiscordWebhook{

    constructor(
        private readonly urlWebhook:string,
    ){};


    async notify( message: string ){
        const body = {
            content: message,
        };

        const response = await fetch( this.urlWebhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( body ),
        });


        if( response.ok ){
            console.log('Webhook is ok');
            return true;
        } else{
            return false;
        }
    }

}
