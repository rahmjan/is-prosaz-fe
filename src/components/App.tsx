import React from 'react';
import { Login } from './authentication/Login';
import { Switch, Route, useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { loginUser } from '../api/auth';
import { saveLoginInformation } from '../slices/userSlice';
import { useAppDispatch } from '../hooks';

export default function App() {
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    loginUser().then(res => {
      dispatch(saveLoginInformation(res));
    })
    .catch(error => {
      history.push('/login');
    });
  }, [history, dispatch]);

  return (
    <Switch>
      <Route path={'/login'} exact render={() => <Login/>}/>
      <Route path={'/'} exact render={() => <div>homescreen</div>}/>
    </Switch>
  );
}
