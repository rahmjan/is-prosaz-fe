import { ROLE } from "../utils/types";
import { getRequest } from "./api";

export interface ShortUserDto {
    id: number,
    roles: ROLE[],
}

export function loginUser() {
    return getRequest<ShortUserDto>('/auth/login');
}
