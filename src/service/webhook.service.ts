import {Request, Response} from "express";
import { webhookVerificationDto } from "../dto/webhookVerification.dto";
import { APP_CONFIG } from "../config/app.config";

export class webhookService {
    private static instance: webhookService;

    public static getInstance(): webhookService {
        if (!webhookService.instance) {
            webhookService.instance = new webhookService();
        }

        return webhookService.instance;

    }

    private constructor() {

    }

    public handlewebhookVerification(data: webhookVerificationDto) {
        const password = APP_CONFIG.WEBHOOK_VERIFICATION_PASSWORD;

        if(data.mode === 'subscribe' && data.verify_token === password) {
            return data.challenge;
        }
        return 'Error, wrong token';
    }

}