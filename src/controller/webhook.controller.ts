import { Request, Response } from "express";
import { webhookService } from "../service/webhook.service";

export class WebhookController {

    private webhookService: webhookService;

    constructor(){
        this.webhookService = webhookService.getInstance();
    }

    webhook = async (req: Request, res: Response) => {
        this.webhookService.handlewebhook(req,res);
        console.log(JSON.stringify(req.query));
        const mood = req.query['hub.mode'];
        const challenge = req.query['hub.challenge'];
        let verify_token = req.query['hub.verify_token'];
        
        console.log(mood,challenge, verify_token);
          
    }
    
    webhookMessage = async (req: Request, res: Response) => {
            console.log(JSON.stringify(req.body));
            
    }

}