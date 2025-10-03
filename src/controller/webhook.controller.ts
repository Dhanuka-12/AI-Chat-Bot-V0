import { Request, Response } from "express";

export class WebhookController {

    webhook = async (req: Request, res: Response) => {
        const mood = req.params['hub.mode'];
        const challenge = req.params['hub.challenge'];
        let verify_token = req.params['hub.verify_token'];
        
        if (mood === 'subscribe' && verify_token === '123456') {
            res.send(challenge);
        } else {
            res.send('Error');
        }
    }

}