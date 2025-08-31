"use client";

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import { Search as SearchIcon, Menu as MenuIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { apps } from "@/lib/data/apps";
import { useRouter, useSearchParams } from "next/navigation";

export default function Header({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const searchChangeHandler = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(value);
    onSearch(value);
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("query", value);
      params.set("page", "1");
    } else {
      params.delete("query");
      params.set("page", "1");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {apps[0].title}
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setDrawerOpen(true)}
            >
              <SearchIcon />
            </IconButton>

            <Drawer
              anchor="top"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <Box sx={{ p: 2 }}>
                <InputBase
                  autoFocus
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={searchChangeHandler}
                  fullWidth
                  sx={{
                    bgcolor: "#f1f1f1",
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                  }}
                />
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ bgcolor: "#f1f1f1", px: 2, py: 0.5, borderRadius: 1 }}>
            <InputBase
              placeholder="Search..."
              value={searchQuery}
              onChange={searchChangeHandler}
              startAdornment={<SearchIcon sx={{ mr: 1 }} />}
            />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
