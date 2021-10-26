import { getRequest } from "./api";

export interface TaskDto {
  id: number,
  activity: string,
  duration: string
}

export interface RepetitionDto {
  dayOfWeek: string,
  start: string,
  finish: string,
  influencedByHoliday: boolean,
  firstDate: Date,
  weeksRepetition: number
}

export function getTasksForRequest(requestId: number) {
  return getRequest<TaskDto[]>(`/task?requestId=${requestId}`);
}