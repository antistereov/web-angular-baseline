export interface TwoFactorSetupResponse {
    secret: string;
    optAuthUrl: string;
    recoveryCode: string;
    token: string;
}

export interface TwoFactorStatusResponse {
    twoFactorRequired: boolean;
}

export interface TwoFactorSetupRequest {
    token: string;
    code: number;
}
