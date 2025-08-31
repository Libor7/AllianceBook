/** LIBRARIES */
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1e88e5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#c62828",
      contrastText: "#ffffff",
    },
    background: {
      default: '#ffffff',
      paper: "#f5f5f5",
    },
    text: {
      primary: "#000000",
      secondary: "#424242",
    },
    success: {
      main: "#4caf50",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    error: {
      main: "#f44336",
    },
  },
});

export default theme;
