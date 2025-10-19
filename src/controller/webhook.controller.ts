import { Request, Response } from "express";
import { WebhookService } from "../service/webhook.service";
import { WebhookMessageDto } from "../dto/webhookVerification.dto";
import { json } from "stream/consumers";

export class WebhookController {

    private webhookService: WebhookService;

    constructor(){
        this.webhookService = WebhookService.getInstance();
    }

    webhook = async (req: Request, res: Response) => {
        const mode = req.query['hub.mode'] as string;
        const challenge = req.query['hub.challenge'] as string;
        let verify_token = req.query['hub.verify_token'] as string;
        
       
        const data = {
            mode,
            challenge,
            verify_token
        }
        const response = this.webhookService.handlewebhookVerification(data);
        if (response.status) {
            res.send(response.challenge);
            return
        }
        res.send('Error, Wrong token');

    }

    webhookMessage = async (req: Request, res: Response) => {
        //console.log(JSON.stringify(req.body));
        const data = req.body as WebhookMessageDto;  

        const isReplied = await this.webhookService.handleRecieveMessage(data);

        if(isReplied){
            res.status(200).send('Ok');
        }else{
            res.status(500).send('Error');
        }
        
    }

    

    

}