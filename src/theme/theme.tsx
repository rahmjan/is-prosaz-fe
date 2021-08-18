import { createTheme } from "@material-ui/core";
import { PRIMARY_COLOR } from "../utils/constants";

export const theme = createTheme({
  palette: {
    primary: {main: PRIMARY_COLOR},
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        borderRadius: "25px",
      },
      notchedOutline: {
        borderColor: PRIMARY_COLOR,
        borderWidth: "2px",
      },
    },
    MuiButton: {
      root: {
        borderRadius: "10px",
      }
    },
  },
});
