import {Request, Response} from "express";
import { APP_CONFIG } from "../config/app.config";
import { WebhookMessageDto, webhookVerificationDto, WebhookVerificationResponseDto } from "../dto/webhookVerification.dto";
import { MessageService } from "./message.service";
import { GeminiService } from "./gemini.service";



export class WebhookService {
    private static instance: WebhookService;
    private messageService:MessageService;
    private geminiService:GeminiService;

    public static getInstance(): WebhookService {
        if (!WebhookService.instance) {
            WebhookService.instance = new WebhookService();
        }

        return WebhookService.instance;

    }

    private constructor() {
        this.messageService = MessageService.getInstance();
        this.geminiService = GeminiService.getInstance();

    }

    public handlewebhookVerification(data: webhookVerificationDto):WebhookVerificationResponseDto {
        const password = APP_CONFIG.WEBHOOK_VERIFICATION_PASSWORD;

        if(data.mode === 'subscribe' && data.verify_token === password) {
            return {
                status: true,
                challenge: data.challenge
            }
        }
        return {
            status: false,
            challenge: ''
        };
    }

    public async handleRecieveMessage(data: WebhookMessageDto): Promise<boolean> {
        const status = data.entry[0].changes[0].value.statuses;
        if(status !== undefined && status.length > 0) {
            console.log('status:', status[0].status);
            return true;
        }
        console.log(JSON.stringify(status));
        try{

            const message = data.entry[0].changes[0].value.messages[0].text?.body;

            

            if(message === undefined){
                console.log('message is undefined');
                console.log(JSON.stringify(data));
                return true;
            }

            const phoneNumber = data.entry[0].changes[0].value.contacts[0].wa_id;
            const name = data.entry[0].changes[0].value.contacts[0].profile.name;

            const history = await this.messageService.getMessagesByUserId(phoneNumber);

            //const replyMessage = `Hello ${name}, Your message recieved`;
            const replyMessage = await this.geminiService.generateReply(message, history);
            const isReplied = await this.messageService.sendMessage(phoneNumber, replyMessage);

            

            if(!isReplied){
                return true;
            }
        }catch(error:any){
            console.log(error);
            return true;
        }

        return false;
        
    }

}
