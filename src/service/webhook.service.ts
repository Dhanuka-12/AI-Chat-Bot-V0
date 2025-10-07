import { get } from "http";

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

}