import { Router } from "express";
import { MessageController } from "../controller/message.controller";

export class MessageRouter{
    private router: Router;
    private constructor() {
        this.router = Router();
        this.messageController = new MessageController();
    }

    private static instance : MessageRouter;
    
    private messageController: MessageController;

    public static getInstance(): MessageRouter {
        if (!MessageRouter.instance) {
            MessageRouter.instance = new MessageRouter();
        }
        return MessageRouter.instance;
    }
}