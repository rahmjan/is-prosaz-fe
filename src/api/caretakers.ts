import { getRequest } from "./api";
import { PersonShortDto } from "./commonInterfaces";

export interface CaretakerShortDto extends PersonShortDto {
    id: number,
}

export function getCaretakers() {
    return getRequest<CaretakerShortDto[]>('/employees?roles=CARETAKER');
}

export interface CaretakerDto {
    address: {
        descriptiveNum: string,
        id: number,
        orientationNumber: string,
        postalCode: string,
        streetName: string,
        town: string
    },
    dateOfAdmission: string,
    dateOfBirth: string,
    education: string,
    email: string,
    emergencyContact: string,
    employmentType: string,
    gender: string,
    id: number,
    name: string,
    phoneNumber: string,
    superior: number,
    surname: string,
    territory: string,
    title: string
}

export function getCaretakerById(caretakerId: number) {
    return getRequest<CaretakerDto>(`/employees/${caretakerId}`)
}