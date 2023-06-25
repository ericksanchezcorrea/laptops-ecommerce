import {createTheme} from "@mui/material"
import { purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#171515",
      contrastText: "#fff",
    },
      secondary: {
      main:purple[500],
    },
    neutral:{
      main: '#f3e5f5'
    }
  }}
);
  
export default theme;
  