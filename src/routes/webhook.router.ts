import { Router } from "express";
import { WebhookController } from "../controller/webhook.controller";

export class webhookRouter{
    private router: Router;
    private constructor() {
        this.router = Router();
        this.webhookController = new WebhookController();
    }

    private static instance : webhookRouter;
    
    private webhookController: WebhookController;
    public static getInstance(): webhookRouter {
        if (!webhookRouter.instance) {
            webhookRouter.instance = new webhookRouter();
        }
        return webhookRouter.instance;
    }

    public initRoutes(){
        this.router.get("/", this.webhookController.webhook);
        this.router.post("/", this.webhookController.webhookMessage);
    }

    public getRouter(): Router {
        return this.router;
    }
}