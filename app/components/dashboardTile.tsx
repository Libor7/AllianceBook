import { type AppData } from "@/lib/models/app";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import Link from "next/link";

export default function DashboardTile({ description, path, title }: AppData) {
  return (
    <Grid>
      <Link href={path}>
        <Card
          sx={{
            alignItems: "center",
            backgroundColor: "primary.main",
            borderRadius: 0,
            boxShadow: 0,
            color: "primary.contrastText",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "0.5em",
            padding: "1.5em 1em",
            textAlign: "center",
          }}
        >
          <CardContent>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="body2">{description}</Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
}
