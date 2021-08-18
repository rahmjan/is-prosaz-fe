import React from 'react';
import { Switch, useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { loginUser } from '../api/auth';
import { saveIncommingAddress, saveLoginInformation } from '../slices/userSlice';
import { useAppDispatch } from '../hooks';
import { PAGE } from '../utils/constants';
import { pageItems } from './pages/pages';
import { ProtectedRoute } from './common/ProtectedRoute';

export default function App() {
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    loginUser().then(res => {
      dispatch(saveLoginInformation(res));
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
