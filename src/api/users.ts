import { ROLE } from "../utils/constants";
import { getRequest } from "./api";
import { PersonShortDto } from "./commonInterfaces";

export interface UserDto extends PersonShortDto {
  id: number,
  email: string,
  roles: ROLE[],
}

export type UserDetailProps = {
  open: boolean,
  onClose(event: object, reason: string): void,
  userId: number | null
}

export function findUser(id: number) {
  return getRequest<UserDto>(`/users/${id}`);
}

export function getUsers() {
  return getRequest<UserDto[]>('/users/');
}
