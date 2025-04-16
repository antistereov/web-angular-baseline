export interface ChangeEmailRequest {
    newEmail: string;
    password: string;
}

export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export interface ChangeUserRequest {
    name: string;
}
