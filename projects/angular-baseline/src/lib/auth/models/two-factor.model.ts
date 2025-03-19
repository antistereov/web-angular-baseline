export interface TwoFactorSetupResponse {
    secret: string;
    optAuthUrl: string;
    recoveryCode: string;
}

export interface TwoFactorStatusResponse {
    twoFactorRequired: boolean;
}
