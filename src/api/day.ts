import { getRequest } from "./api";

export interface TaskShortestDto {
  id: number,
  date: Date,
  start: Date,
  end: Date,
  clientName: string,
}

export function getCaretakerOverview() {

  const from = '2010-01-01';
  const to = '2030-01-01';

  const params = {from, to};

  return getRequest<TaskShortestDto[]>('/days/own/overview', params);
}