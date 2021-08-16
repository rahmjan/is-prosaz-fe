import React from 'react';
import { Login } from './pages/Login';
import { Switch, Route, useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { loginUser } from '../api/auth';
import { saveIncommingAddress, saveLoginInformation, userIsLogged } from '../slices/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { AppHeader } from './menu/AppHeader';
import { PAGE } from '../utils/constants';
import { pageItems } from './pages/pages';

export default function App() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector(userIsLogged);

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
      {isLogged && pageItems.map((item, index) =>
        item.showInSwitch && (
          <Route key={index} path={item.link} exact render={() => 
            <>
              <AppHeader/>
              {item.render}
            </>
          }/>
      ))}
      <Route path={PAGE.LOGIN} exact render={() => <Login/>}/>
    </Switch>
  );
}
