export interface UserState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface CredentialsPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}