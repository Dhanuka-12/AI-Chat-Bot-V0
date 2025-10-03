import { Request, Response } from "express";

export class WebhookController {

    webhook = async (req: Request, res: Response) => {
        console.log(JSON.stringify(req.query));
        const mood = req.query['hub.mode'];
        const challenge = req.query['hub.challenge'];
        let verify_token = req.query['hub.verify_token'];
        
        console.log(mood,challenge, verify_token);
        if (mood === 'subscribe' && verify_token === '123456') {
            res.send(challenge);
            return;
        } else {
            res.send('Error');
        }

        
    }
    webhookMessage = async (req: Request, res: Response) => {
            console.log(JSON.stringify(req.body));
            
    }

}