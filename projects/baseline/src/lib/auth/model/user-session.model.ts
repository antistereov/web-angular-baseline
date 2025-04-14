import {User} from "@baseline/shared/model/user.model";

export interface DeviceInfoRequest {
    id: string;
    browser: string | undefined;
    os: string | undefined;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginRequest extends LoginCredentials {
    device: DeviceInfoRequest;
}

export interface LoginResponse {
    twoFactorRequired: boolean;
    user: User;
}

export interface RegisterInformation extends LoginCredentials {
    name: string | undefined;
}

export interface RegisterUserRequest extends RegisterInformation {
    device: DeviceInfoRequest;
}

export interface StepUpStatusResponse {
    userId: string;
    deviceId: string;
}
