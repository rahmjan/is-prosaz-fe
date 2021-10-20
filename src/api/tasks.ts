import { getRequest } from "./api";

export interface TaskDto {
  id: number,
  activity: string,
  duration: string
}

export function getTasksForRequest(requestId: number) {
  return getRequest<TaskDto[]>(`/task?requestId=${requestId}`);
}