import { getRequest } from "./api";
import { PersonShortDto } from "./commonInterfaces";

export interface ClientShortDto extends PersonShortDto {
  id: number,
  active: boolean,
  newClient: boolean,
}

export function getClients() {
  return getRequest<ClientShortDto[]>('/clients/short');
}