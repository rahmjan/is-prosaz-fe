import { createTheme } from "@material-ui/core";
import { GREY_COLOR, PRIMARY_COLOR } from "../utils/constants";

export const theme = createTheme({
  palette: {
    primary: {main: PRIMARY_COLOR},
    text: {
      primary: GREY_COLOR,
    },
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
      },
    },
    MuiTableCell: {
      head: {
        paddingLeft: "5px !important",
        color: PRIMARY_COLOR,
        fontWeight: "bolder",
        borderBottomColor: PRIMARY_COLOR,
      },
    },
  },
});
