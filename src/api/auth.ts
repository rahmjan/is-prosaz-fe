import { ROLE } from "../utils/constants";
import { getRequest } from "./api";

export interface ShortUserDto {
    id: number,
    roles: ROLE[],
}

export function loginUser() {
    return getRequest<ShortUserDto>('/auth/login');
}
