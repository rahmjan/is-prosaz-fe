import { getRequest } from "./api";

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
  territory?: string
}

export interface RequestDto extends RequestDtoBase {
  id: number
}

export interface CreateRequestDto extends RequestDtoBase { }


export function getRequests() {
  return getRequest<RequestDto[]>('/request');
}