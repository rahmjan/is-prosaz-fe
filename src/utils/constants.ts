
export const BE_URL: string = process.env.REACT_APP_BE_URL!;

export const AUTH_TOKEN: string = 'authToken';

export const PRIMARY_COLOR: string = "#1d235c";

export enum PAGE {
    HOME = "/",
    LOGIN = "/login",
    CLIENTS = "/clients",
    CARETAKERS = "/caretakers",
    USERS = "/users",
    REQUESTS = "/requests",
    DAILYPLAN = "/dailyplan",
    MONTHLYPLAN = "/monthlyplan",
    AGENDA = "/agenda",
}