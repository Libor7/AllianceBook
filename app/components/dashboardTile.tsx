"use client";

/** LIBRARIES */
import { Card, CardContent, Typography, Grid } from "@mui/material";
import Link from "next/link";

/** MODELS */
import { type AppData } from "@/lib/models/app";

/** HOOKS */
import { useCharacterContext } from "@/app/hooks/useCharacterContext";

const DashboardTile = (app: AppData) => {
  const { setCharacterState } = useCharacterContext();

  const setActiveApp = () => {
    setCharacterState({ activeApp: app });
    localStorage.setItem("activeApp", JSON.stringify(app));
  };

  return (
    <Grid>
      <Link href={app.path} onClick={setActiveApp}>
        <Card
          sx={{
            backgroundColor: "primary.main",
            borderRadius: 0,
            color: "primary.contrastText",
            cursor: "pointer",
            margin: "0.5em",
            padding: "1.5em 1em",
          }}
        >
          <CardContent>
            <Typography variant="h4" sx={{ mb: 2 }}>{app.title}</Typography>
            <Typography variant="body2">{app.description}</Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
}

export default DashboardTile;
