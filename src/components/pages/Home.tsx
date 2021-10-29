import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { AppHeader } from "../menu/AppHeader";

const useStyle = makeStyles({
  screen: {
    height: "100%",
  },
});

export function Home() {
  const classes = useStyle();

  return (
    <Box className={classes.screen}>
      <AppHeader/>
    </Box>
  )
}