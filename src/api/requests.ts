import { getRequest, postRequest } from "./api";

interface RequestDtoBase {
  activity?: string,
  client?: number,
  duration?: string,
  earliestStart?: string,
  latestEnd?: string,
  startPlace?: number,
  endPlace?: number,
  note?: string,
  numberOfCaretakers?: number,
  requiredGender?: string,
  territory?: string,
}

export interface RequestDto extends RequestDtoBase {
  id: number,
  repetitions?: RepetitionDto[]
}

export interface CreateRequestDto extends RequestDtoBase { 
  repetitions?: CreateRepetitionDto[]
}

export enum DayOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

interface RepetitionDtoBase {
  dayOfWeek: DayOfWeek,
  start?: Date,
  finish?: Date,
  influencedByHoliday: boolean,
  firstDate?: Date,
  weeksRepetition: number
}

export interface RepetitionDto extends RepetitionDtoBase {
  id: number
}

export interface CreateRepetitionDto extends RepetitionDtoBase {}

export function getRequests() {
  return getRequest<RequestDto[]>('/request');
}

export function createRequest(request: CreateRequestDto) {
  return postRequest<any, CreateRequestDto>('/request', request);
}
