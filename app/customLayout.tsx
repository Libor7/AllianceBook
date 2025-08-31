"use client";

/** LIBRARIES */
import { CssBaseline, ThemeProvider } from "@mui/material";

/** MISC */
import theme from "@/lib/theme";

type CustomLayoutProps = {
  children: React.ReactNode;
};

const CustomLayout = ({ children }: CustomLayoutProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default CustomLayout;
