export const BE_URL: string = process.env.REACT_APP_BE_URL!;
export const AUTH_TOKEN: string = 'authToken';

export const PRIMARY_COLOR: string = "#1d235c"; // blue
export const GREY_COLOR: string = "#757575";
export const WHITE_COLOR: string = "#fafafa";

export type ROLE = "ADMIN" | "COORDINATOR" | "SHIFT_LEADER" | "CARETAKER" | "NONE";

export enum PAGE {
    HOME = "/",
    LOGIN = "/login",
    CLIENTS = "/clients", 
    CARETAKERS = "/caretakers",
    USERS = "/users",
    USEREDIT = "/useredit",
    REQUESTS = "/requests",
    TASKS = "/tasks",
    DAILYPLAN = "/dailyplan",
    MONTHLYPLAN = "/monthlyplan",
    AGENDA = "/agenda",
}

export type EmploymentType = "PLNY" | "POLOVICNI" | "TRICTYRY" | "JEDNACTYRI" | "DPP" | "DPC";
export type Gender = "MALE" | "FEMALE";

export const FormDateFormat = "dd.MM.yyyy";
export const FormTimeFormat = "HH:mm";
export const FormDateTimeFormat = `${FormDateFormat} ${FormTimeFormat}`;