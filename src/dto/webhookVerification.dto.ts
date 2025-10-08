export interface webhookVerificationDto {
    verify_token: string;
    challenge: string;
    mode: string;
}

export interface webhookMessageDto {
    status: boolean;
    challenge: string;
}
