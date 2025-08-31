"use client";

/** LIBRARIES */
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
  Button,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useRouter, useSearchParams } from "next/navigation";

/** MODELS */
import { type AppData } from "@/lib/models/app";

/** HOOKS */
import { useCharacterContext } from "@/app/hooks/useCharacterContext";

/** MISC */
import { searchOptions } from "@/lib/data/searchOptions";
import { FILTERS, SEARCH_PLACEHOLDER } from "@/lib/constants/common";

type HeaderProps = {
  onSearch: (query: string) => void;
  onSidebarClick: () => void;
  searchBy: string;
};

const Header = ({ onSearch, onSidebarClick, searchBy }: HeaderProps) => {
  const searchParams = useSearchParams();
  const theme = useTheme();
  const router = useRouter();
  const { activeApp } = useCharacterContext();
  const initialQuery = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { title } =
    activeApp ?? (JSON.parse(localStorage.getItem("activeApp")!) as AppData);
  const searchOptionLabel = searchOptions.find(
    ({ value }) => value === searchBy
  )?.label;

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const searchChangeHandler = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(value);
    onSearch(value);

    const params = new URLSearchParams(searchParams);
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
          {title}
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
                  placeholder={`${SEARCH_PLACEHOLDER} ${searchOptionLabel}`}
                  value={searchQuery}
                  onChange={searchChangeHandler}
                  fullWidth
                  sx={{
                    bgcolor: "#f1f1f1",
                    px: 2,
                    py: 1,
                    borderRadius: 0,
                  }}
                />
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ bgcolor: "#f1f1f1", px: 2, py: 0.5, borderRadius: 0 }}>
            <InputBase
              placeholder={`${SEARCH_PLACEHOLDER} ${searchOptionLabel}`}
              value={searchQuery}
              onChange={searchChangeHandler}
              startAdornment={<SearchIcon sx={{ mr: 1 }} />}
            />
          </Box>
        )}
        <Button
          variant="outlined"
          onClick={onSidebarClick}
          sx={{ ml: 2 }}
          color="inherit"
        >
          {FILTERS}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
