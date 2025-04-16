export interface TwoFactorSetupResponse {
    secret: string;
    optAuthUrl: string;
    recoveryCodes: string[];
    token: string;
}

export interface TwoFactorStatusResponse {
    twoFactorRequired: boolean;
}

export interface TwoFactorSetupRequest {
    token: string;
    code: number;
}

export interface DisableTwoFactorRequest {
    password: string;
}

export interface StartTwoFactorSetupRequest {
    password: string;
}
