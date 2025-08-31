/** LIBRARIES */
import { Grid, type GridProps } from "@mui/material";
import { type ReactNode } from "react";

type GridLayoutProps = {
  children: ReactNode;
  minHeight?: string | number;
  padding?: number;
} & GridProps;

const GridLayout = ({
  children,
  minHeight = "100vh",
  padding = 4,
  sx,
  ...rest
}: GridLayoutProps) => (
  <Grid container sx={{ minHeight, padding, ...sx }} {...rest}>
    {children}
  </Grid>
);

export default GridLayout;
