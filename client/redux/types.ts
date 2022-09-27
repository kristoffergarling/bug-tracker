export interface UserState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface CredentialsPayload {
    email: string;
    password: string;
}