import { Grid, type GridProps } from "@mui/material";
import { type ReactNode } from "react";

type GridLayoutProps = {
  children: ReactNode;
  minHeight?: string | number;
  padding?: number;
} & GridProps;

export const GridLayout = ({
  children,
  minHeight = "100vh",
  padding = 4,
  sx,
  ...rest
}: GridLayoutProps) => {
  return (
    <Grid container sx={{ minHeight, padding, ...sx }} {...rest}>
      {children}
    </Grid>
  );
};
