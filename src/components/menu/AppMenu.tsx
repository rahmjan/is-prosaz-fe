import React from "react";
import { Box, Button, Drawer, IconButton, List, ListItem, ListItemText, makeStyles, Typography } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { Link } from "react-router-dom";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../utils/constants";
import Logo from "../../assets/logo.png";
import { pageItems } from "../common/pages";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { appMenuIsOpen, setIsOpen } from "../../slices/appMenuSlice";
import { currentUserFullName, currentUserRoles } from "../../slices/userSlice";
import { roleToText } from "../../utils/translations";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyle = makeStyles({
  menu: {
    background: PRIMARY_COLOR,
    minWidth: "15vw",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  closeButton: {
    alignSelf: "flex-end",
    color: WHITE_COLOR,
  },
  list: {
    color: WHITE_COLOR,
    flex: 1,
  },
  listItem: {
    borderBottom: `1px solid grey`,
    paddingBottom: "0px",
    paddingLeft: "5px",
    minWidth: "10vw",
  },
  loggedUserInfo: {
    minWidth: "9vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  loggedUserInfoName: {
    alignSelf: "center",
    color: WHITE_COLOR,
  },
  logout: {
    color: WHITE_COLOR,
    alignSelf: "flex-end",
    marginRight: "2vw",
    marginTop: "2vw",
    marginBottom: "4vh",
  }
});

export function AppMenu() {
  const classes = useStyle();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(appMenuIsOpen);
  const fullName = useAppSelector(currentUserFullName);
  const roles = useAppSelector(currentUserRoles);

  function handleClose() {
    dispatch(setIsOpen(false));
  }

  return (
    <Drawer
      classes={{paper: classes.menu}}
      variant="persistent"
      anchor="left"
      open={isOpen}
    >
      <IconButton className={classes.closeButton} onClick={handleClose}>
        <CloseIcon/>
      </IconButton>
      <img src={Logo} alt="logo"/>

      <List className={classes.list}>
        {pageItems.map((item, index) => 
          item.showInMenu &&
            <ListItem className={classes.listItem} button key={index} component={Link} to={item.link}>
              <ListItemText primary={item.label}/>
            </ListItem>
        )}
      </List>
      
      <Box className={classes.loggedUserInfo}>
        <Typography variant="body2" noWrap color="textPrimary">Přihlášen:</Typography>
        <Typography className={classes.loggedUserInfoName} variant="body1" noWrap>{fullName}</Typography>
        <Box style={{alignSelf: "flex-end"}}>
          {roles.map((item, index) =>
            <Typography key={index} variant="body2" noWrap color="textPrimary">- {roleToText(item)}</Typography>
          )}
        </Box>
      </Box>
      
      <Button className={classes.logout} variant="text" startIcon={<ExitToAppIcon/>}>
        Odhlásit se
      </Button>

    </Drawer>
  )
}