import React from "react";
import { Route } from "react-router";
import { useAppSelector } from "../../hooks";
import { currentUserRoles } from "../../slices/userSlice";
import { ROLE } from "../../utils/constants";

interface ProtectedRoutePropsI {
  exact: boolean,
  key?: number,
  path: string,
  roles: ROLE[],
  render: object,
}

export function ProtectedRoute(params: ProtectedRoutePropsI) {
  const roles = useAppSelector(currentUserRoles);

  function hasRole(element: ROLE, index: number, array: ROLE[]) { 
    return roles.includes(element);
  } 

  if (params.roles.some(hasRole)) {
    return (
      <Route key={params.key} path={params.path} exact={params.exact} render={() => params.render}/>
    )
  }
  return (<></>)
}
