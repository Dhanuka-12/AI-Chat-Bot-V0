export interface webhookVerificationDto {
    verify_token: string;
    challenge: string;
    mode: string;
}

export interface WebhookVerificationResponseDto {
    status: boolean;
    challenge: string;
}


