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
      // default: '#121212',  // dark mode 
      default: '#ffffff',
      // paper: "#1e1e1e",  // dark mode 
      paper: "#f5f5f5",
    },
    text: {
      // primary: "#ffffff",  // dark mode 
      primary: "#000000",
      // secondary: "#b0bec5",  // dark mode 
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
