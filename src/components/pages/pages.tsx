import { PAGE, ROLE } from "../../utils/constants";
import { AppHeader } from "../menu/AppHeader";
import { Login } from "./Login";

interface PageItemI {
    // Menu
    label: string,
    showInMenu: boolean,

    // Switch
    render: object,

    // Both
    hasRole: ROLE,
    link: string,
  }  

export const pageItems: PageItemI[] = [
  {
    label: "Home",
    showInMenu: false,
    render: <AppHeader/>,
    hasRole: "CARETAKER",
    link: PAGE.HOME,
  },
  {
    label: "Login",
    showInMenu: false,
    render: <Login/>,
    hasRole: "NONE",
    link: PAGE.LOGIN,
  },
  {
    label: "Klienti",
    showInMenu: true,
    render: <div>homescreen2</div>,
    hasRole: "CARETAKER",
    link: PAGE.CLIENTS,
  },
  {
    label: "Pečovatelé",
    showInMenu: true,
    render: <div/>,
    hasRole: "CARETAKER",
    link: PAGE.CARETAKERS,
  },
  {
    label: "Uživatelé",
    showInMenu: true,
    render: <div/>,
    hasRole: "CARETAKER",
    link: PAGE.USERS,
  },
  {
    label: "Požadavky",
    showInMenu: true,
    render: <div/>,
    hasRole: "CARETAKER",
    link: PAGE.REQUESTS,
  },
  {
    label: "Denní plán",
    showInMenu: true,
    render: <div/>,
    hasRole: "CARETAKER",
    link: PAGE.DAILYPLAN,
  },
  {
    label: "Měsíční plán",
    showInMenu: true,
    render: <div/>,
    hasRole: "CARETAKER",
    link: PAGE.MONTHLYPLAN,
  },
  {
    label: "Agenda",
    showInMenu: true,
    render: <div/>,
    hasRole: "CARETAKER",
    link: PAGE.AGENDA,
  },
];