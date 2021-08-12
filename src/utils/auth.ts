import { store } from "../store";
import { ROLE } from "./types"

export function isLogged(): boolean {
    return store.getState().currentUser.isLogged;
}

export function hasRole(role: ROLE): boolean {
    return store.getState().currentUser.roles.includes(role);
}
