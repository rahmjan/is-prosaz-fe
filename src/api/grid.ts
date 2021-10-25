import { EmploymentType, Gender } from "../utils/constants";
import { getDateFormat } from "../utils/formating";
import { getRequest } from "./api";

export interface PlaceDto {
  id: number,
  Town: string,
  StreetName: string,
  DescriptiveNum: string,
  OrientationNumber: string,
  PostalCode: string,
}

export interface ShiftNestedDto {
  shiftId: number,
  date: Date,
  shiftStart: Date,
  shiftEnd: Date,
  shiftMaxTime: Date,
  tasks: TaskShortDto[],
}

export interface EmployeeShiftsDto {
  employeeId: number,
  placeDto: PlaceDto,
  name: string,
  surname: string,
  employmentType: EmploymentType,
  shifts: Map<Date, ShiftNestedDto>,
}

export interface TaskShortDto {
  id: number,
  activity: string,
  earliestStart: Date,
  latestEnd: Date,
  duration: Date,
  requiredGender: Gender,
  start: Date,
  finish: Date,
  date: Date,
  clientName: string,
  clientSurname: string,
}

export interface GridWrapper {
  from: Date,
  to: Date,
  employeeShiftsDtos: EmployeeShiftsDto[],
  freeTasks: Map<Date, TaskShortDto[]>,
}

export function getGrid(from: Date, to: Date) {
  const params = {
    from: getDateFormat(from),
    to: getDateFormat(to),
  };
  return getRequest<GridWrapper>(`/grid`, params);
}
