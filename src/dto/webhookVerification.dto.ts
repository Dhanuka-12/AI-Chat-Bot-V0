export interface webhookVerificationDto {
    verify_token: string | undefined;
    challenge: any;
    mode: string;
}

