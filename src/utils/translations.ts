import { ROLE } from "./constants";

export function roleToText(role: ROLE): string {
    switch (role) {
      case "ADMIN":
        return "administrátor";
      case "CARETAKER":
        return "pečovatel";
      case "COORDINATOR":
        return "koordinátor";
      case "SHIFT_LEADER":
        return "vedoucí služeb";
      default:
        return "bez role";
    }
}