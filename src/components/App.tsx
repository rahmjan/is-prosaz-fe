import React from 'react';
import { Switch, useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { loginUser } from '../api/auth';
import { saveIncommingAddress, saveLoginUser } from '../slices/userSlice';
import { useAppDispatch } from '../hooks';
import { PAGE } from '../utils/constants';
import { pageItems } from './common/pages';
import { ProtectedRoute } from './common/ProtectedRoute';
import { findUser } from '../api/users';

export default function App() {
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    loginUser().then(res => {
      findUser(res.id).then(res => {
        dispatch(saveLoginUser(res));
      })
    })
    .catch(error => {
      dispatch(saveIncommingAddress(history.location.pathname));
      history.push(PAGE.LOGIN);
    });
  }, [history, dispatch]);

  return (
    <Switch>
      {pageItems.map((item, index) => 
        <ProtectedRoute exact key={index} path={item.link} role={item.hasRole} render={item.render}/>
      )}
    </Switch>
  );
}
