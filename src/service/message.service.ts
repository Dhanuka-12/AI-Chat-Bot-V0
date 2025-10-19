export class MessageService {
    private static instance: MessageService;

    public static getInstance(): MessageService {
        if (!MessageService.instance) {
            MessageService.instance = new MessageService();
        }
        return MessageService.instance;
    }
    private constructor() {

       }
}