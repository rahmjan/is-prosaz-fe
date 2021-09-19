import React from "react";
import { Drawer, IconButton, List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { Link } from "react-router-dom";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../utils/constants";
import Logo from "../../assets/logo.png";
import { pageItems } from "../common/pages";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { appMenuIsOpen, setIsOpen } from "../../slices/appMenuSlice";

const useStyle = makeStyles({
  menu: {
    background: PRIMARY_COLOR,
    minWidth: "15vw",
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  list: {
    color: WHITE_COLOR,
  },
  listItem: {
    borderBottom: `1px solid grey`,
    paddingBottom: "0px",
    paddingLeft: "5px",
    minWidth: "10vw",
  },
});

export function AppMenu() {
  const classes = useStyle();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(appMenuIsOpen);

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
    </Drawer>
  )
}