import React from "react";
import { Route } from "react-router";
import { useAppSelector } from "../../hooks";
import { currentUserRoles } from "../../slices/userSlice";
import { ROLE } from "../../utils/constants";

interface ProtectedRoutePropsI {
  exact: boolean,
  key?: number,
  path: string,
  role: ROLE,
  render: object,
}

export function ProtectedRoute(params: ProtectedRoutePropsI) {
  const roles = useAppSelector(currentUserRoles);

  if (roles.includes(params.role)) {
    return (
      <Route key={params.key} path={params.path} exact={params.exact} render={() => params.render}/>
    )
  }
  return (<></>)
}