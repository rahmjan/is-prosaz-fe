import React from "react";
import { AppBar, Box, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { AppMenu } from "./AppMenu";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { currentUserFullName } from "../../slices/userSlice";
import { appMenuIsOpen, setIsOpen } from "../../slices/appMenuSlice";

const useStyle = makeStyles({
  header: {
    background: "inherit",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  rightText: {
    display: "flex",
    alignItems: "flex-end",
  },
  name: {
    marginRight: "1vw",
  }
});

export function AppHeader() {
  const classes = useStyle();
  const dispatch = useAppDispatch();
  const userFullName = useAppSelector(currentUserFullName);
  const menuIsOpen = useAppSelector(appMenuIsOpen);

  const handleMenuOpen = () => {
    dispatch(setIsOpen(true));
  };

  return (
    <>
      <AppBar className={classes.header} position="relative" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            onClick={handleMenuOpen}
            style={{visibility: menuIsOpen ? "hidden" : "visible"}}
            edge="start"
          >
            <MenuIcon />
          </IconButton>

          <Box className={classes.rightText}>
            <Typography className={classes.name} variant="body1" noWrap color="textPrimary">{userFullName}</Typography>
            <Typography variant="h4" noWrap color="primary">IS Prosaz</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <AppMenu/>
    </>
  )
}

