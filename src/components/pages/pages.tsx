import { PAGE } from "../../utils/constants";
import { Login } from "./Login";

interface PageItemI {
    // Menu
    label: string,
    showInMenu: boolean,

    // Switch
    render: object,
    showInSwitch: boolean,

    // Both
    link: string,
  }  

export const pageItems: PageItemI[] = [
  {
    label: "Home",
    showInMenu: false,
    render: <div>homescreen</div>,
    showInSwitch: true,
    link: PAGE.HOME,
  },
  {
    label: "Login",
    showInMenu: false,
    render: <Login/>,
    showInSwitch: false,
    link: PAGE.LOGIN,
  },
  {
    label: "Klienti",
    showInMenu: true,
    render: <div/>,
    showInSwitch: true,
    link: PAGE.CLIENTS,
  },
  {
    label: "Pečovatelé",
    showInMenu: true,
    render: <div/>,
    showInSwitch: true,
    link: PAGE.CARETAKERS,
  },
  {
    label: "Uživatelé",
    showInMenu: true,
    render: <div/>,
    showInSwitch: true,
    link: PAGE.USERS,
  },
  {
    label: "Požadavky",
    showInMenu: true,
    render: <div/>,
    showInSwitch: true,
    link: PAGE.REQUESTS,
  },
  {
    label: "Denní plán",
    showInMenu: true,
    render: <div/>,
    showInSwitch: true,
    link: PAGE.DAILYPLAN,
  },
  {
    label: "Měsíční plán",
    showInMenu: true,
    render: <div/>,
    showInSwitch: true,
    link: PAGE.MONTHLYPLAN,
  },
  {
    label: "Agenda",
    showInMenu: true,
    render: <div/>,
    showInSwitch: true,
    link: PAGE.AGENDA,
  },
];