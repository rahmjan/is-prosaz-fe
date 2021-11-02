import { PAGE, ROLE } from "../../utils/constants";
import { Clients } from "../pages/Clients";
import { Requests } from "../pages/Requests";
import { Dailyplan } from "../pages/Dailyplan";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

interface PageItemI {
    // Menu
    label: string,
    showInMenu: boolean,

    // Switch
    render: object,

    // Both
    hasRole: ROLE[],
    link: string,
  }  

export const pageItems: PageItemI[] = [
  {
    label: "Home", // ToDo... delete this
    showInMenu: false,
    render: <Home/>,
    hasRole: ["CARETAKER"],
    link: PAGE.HOME,
  },
  {
    label: "Login",
    showInMenu: false,
    render: <Login/>,
    hasRole: ["NONE"],
    link: PAGE.LOGIN,
  },
  {
    label: "Klienti",
    showInMenu: true,
    render: <Clients/>,
    hasRole: ["ADMIN", "COORDINATOR"],
    link: PAGE.CLIENTS,
  },
  {
    label: "Pečovatelé",
    showInMenu: true,
    render: <div/>,
    hasRole: ["ADMIN", "COORDINATOR", "SHIFT_LEADER"],
    link: PAGE.CARETAKERS,
  },
  {
    label: "Uživatelé",
    showInMenu: true,
    render: <div/>,
    hasRole: ["ADMIN"],
    link: PAGE.USERS,
  },
  {
    label: "Požadavky klientů",
    showInMenu: true,
    render: <Requests/>,
    hasRole: ["ADMIN", "COORDINATOR"],
    link: PAGE.REQUESTS,
  },
  {
    label: "Denní plán",
    showInMenu: true,
    render: <Dailyplan/>,
    hasRole: ["ADMIN", "COORDINATOR"],
    link: PAGE.DAILYPLAN,
  },
  {
    label: "Měsíční plán",
    showInMenu: true,
    render: <div/>,
    hasRole: ["ADMIN", "COORDINATOR"],
    link: PAGE.MONTHLYPLAN,
  },
  {
    label: "Agenda",
    showInMenu: true,
    render: <div/>,
    hasRole: ["SHIFT_LEADER", "CARETAKER"],
    link: PAGE.AGENDA,
  },
];