import React, { useState } from "react";
import { Box, Button, Container, makeStyles, TextField } from "@material-ui/core";
import backgroundImage from "../../assets/loginBackground.png";
import { useAppDispatch } from "../../hooks";
import { createAuthToken, saveLoginInformation } from "../../slices/userSlice";
import { loginUser } from "../../api/auth";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles({
  loginForm: {
    margin: 'auto',
    maxWidth: '450px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
  },
  screen: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
  },
  buttons: {
    display: 'flex',
    justifyContent: "space-between",
  }
});

export function Login() {
  const history = useHistory();
  const classes = useStyle();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createAuthToken({username, password}));
    loginUser().then(res => {
      dispatch(saveLoginInformation(res));
      history.push('/');
    });
  }

  const onChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }
  
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Box className={classes.screen}>
      <Container>
        <form className={classes.loginForm} onSubmit={handleSubmit}>
          <h1 style={{alignSelf: 'center'}}>Login Screen</h1>

          Uživatelské jméno
          <TextField variant="outlined" required onChange={onChangeUserName}/>
          Heslo
          <TextField variant="outlined" type="password" required onChange={onChangePassword}/>

          <Box className={classes.buttons}>
            Zapomněli jste heslo?
            <Button variant="contained" color="primary" type="submit">
              Přihlásit
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  )
}