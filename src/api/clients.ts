import { getRequest } from "./api";
import { PersonShortDto } from "./commonInterfaces";

export interface ClientShortDto extends PersonShortDto {
  id: number,
  active: boolean,
  newClient: boolean,
}

interface GetClientsParams {
  firstname?: string,
  lastname?: string;
  active?: boolean;
  territory?: string; 
}

export function getClients(params?: GetClientsParams) {
  return getRequest<ClientShortDto[]>('/clients/short', params);
}