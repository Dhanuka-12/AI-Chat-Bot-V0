import { APP_CONFIG } from "../config/app.config";

export class GeminiService {
    private geminiApiKey: string;

    private static instance: GeminiService;
    public static getInstance(): GeminiService {
        if (!GeminiService.instance) {
            GeminiService.instance = new GeminiService();
        }
        return GeminiService.instance;
    }
    private constructor() {
        this.geminiApiKey = APP_CONFIG.GEMINI_API_KEY || '';
    }

}