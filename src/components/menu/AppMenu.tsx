import React from "react";
import { Drawer, IconButton, List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { Link } from "react-router-dom";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../utils/constants";
import Logo from "../../assets/logo.png";
import { pageItems } from "../pages/pages";

interface AppMenuPropsI {
  open: boolean,
  handleClose: React.MouseEventHandler<HTMLButtonElement>,
}

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
});

export function AppMenu(props: AppMenuPropsI) {
  const classes = useStyle();

  return (
    <Drawer
      classes={{paper: classes.menu}}
      variant="persistent"
      anchor="left"
      open={props.open}
    >
      <IconButton className={classes.closeButton} onClick={props.handleClose}>
        <CloseIcon/>
      </IconButton>
      <img src={Logo} alt="logo"/>
      <List className={classes.list}>
        {pageItems.map((item, index) => 
          item.showInMenu &&
            <ListItem button key={index} component={Link} to={item.link}>
              <ListItemText primary={item.label}/>
            </ListItem>
        )}
      </List>
    </Drawer>
  )
}