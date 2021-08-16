import React from "react";
import { AppBar, Box, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from "react";
import { AppMenu } from "./AppMenu";

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
  const [open, setOpen] = useState<boolean>(false);

  const handleMenuOpen = () => {
    setOpen(true);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar className={classes.header} position="relative" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            onClick={handleMenuOpen}
            style={{visibility: open ? "hidden" : "visible"}}
            edge="start"
          >
            <MenuIcon />
          </IconButton>

          <Box className={classes.rightText}>
            <Typography className={classes.name} variant="body1" noWrap color="textPrimary">Jmeno Příjmení</Typography>
            <Typography variant="h4" noWrap color="primary">IS Prosaz</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <AppMenu open={open} handleClose={handleMenuClose}/>
    </>
  )
}

