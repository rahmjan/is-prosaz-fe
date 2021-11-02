import {getRequest, putRequest} from "./api";
import { PersonShortDto } from "./commonInterfaces";

export interface CaretakerShortDto extends PersonShortDto {
    id: number,
}

interface GetCaretakerParams {
    firstname?: string,
    lastname?: string;
}

export function getCaretakers(params?: GetCaretakerParams) {
    return getRequest<CaretakerShortDto[]>('/employees?roles=CARETAKER', params);
}

export interface CaretakerDto {
    address: {
        descriptiveNum?: string,
        id?: number,
        orientationNumber?: string,
        postalCode?: string,
        streetName?: string,
        town?: string
    },
    dateOfAdmission?: string,
    dateOfBirth?: string,
    education?: string,
    email?: string,
    emergencyContact?: string,
    employmentType?: string,
    gender?: string,
    id: number,
    name?: string,
    phoneNumber?: string,
    superior?: number,
    surname?: string,
    territory?: string,
    title?: string
}

export function getCaretakerById(caretakerId: number) {
    return getRequest<CaretakerDto>(`/employees/${caretakerId}`)
}

export function updateCaretaker(caretaker: CaretakerDto) {
    return putRequest<any, CaretakerDto>(`/employees/${caretaker.id}`, caretaker);
}

export interface CreateCaretakerDto extends CaretakerDto { }

export type CaretakerDetailProps = {
    open: boolean,
    onClose(event: object, reason: string): void,
    caretakerId: number | null
}

export interface WorkHoursDto {
    employee: number,
    finish: {
        hour: string,
        minute: string,
        nano: number,
        second: string
    },
    id: number,
    maxTime: {
        hour: string,
        minute: string,
        nano: number,
        second: string
    },
    shiftType: string,
    start: {
        hour: string,
        minute: string,
        nano: number,
        second: string
    },
    territory: string,
    workHours: [
        {
            dayOfWeek: string,
            finish: string,
            firstDate: string,
            id: number,
            influencedByHoliday: boolean,
            start: string,
            weeksRepetition: number
        }
    ]
}

export function getWorkHours(caretakerId: number) {
    return getRequest<WorkHoursDto>(`/employees/${caretakerId}/workHours`)
}