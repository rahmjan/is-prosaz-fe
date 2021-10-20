import { getRequest } from "./api";

export interface RequestDto {
  id: number,
  activity?: string,
  client?: number,
  duration?: Date,
  earliestStart?: Date,
  latestEnd?: Date,
  startPlace?: number,
  endPlace?: number,
  note?: string,
  numberOfCaretakers?: number,
  requiredGender?: string,
  territory?: string
}

export function getRequests() {
  return getRequest<RequestDto[]>('/request');
}