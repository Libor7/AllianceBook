"use client";

/** COMPONENTS */
import GenericList from "@/app/components/genericList";
import Pagination from "@/app/components/pagination";
import CharacterItem from "@/app/components/characterItem";
import GridLayout from "@/app/components/layouts/gridLayout";
import DataContextProvider from "@/app/components/util/DataContextProvider";
import LoadingSpinner from "@/app/components/loadingSpinner";
import Sidebar from "@/app/components/sidebar";
import Header from "@/app/components/header";

/** LIBRARIES */
import { Box, Grid, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/** HOOKS */
import useCharacters from "@/app/hooks/useCharacters";
import useFilteredCharacters from "@/app/hooks/useFilteredCharacters";

/** MISC */
import { getCharactersPerPage } from "@/lib/utils/helpers";
import { CHARACTERS_PER_PAGE } from "@/lib/constants/common";

const CharactersPageClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { characters, status } = useCharacters();
  const filteredCharacters = useFilteredCharacters(characters);

  const searchBy = searchParams.get("searchBy") || "name";
  let minHeight = 0;
  let maxHeight = 0;

  if (characters) {
    const numericHeights = characters
      .map((character) => parseInt(character.height))
      .filter((number) => !isNaN(number));

    if (numericHeights.length > 0) {
      minHeight = Math.min(...numericHeights);
      maxHeight = Math.max(...numericHeights);
    }
  }

  const searchHandler = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams);

      if (query.trim() === "") {
        params.delete("query");
      } else {
        params.set("query", query);
      }

      params.set("page", "1");
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const sidebarHandler = useCallback(() => setSidebarOpen(true), []);

  if (status && status > 299) {
    return (
      <GridLayout spacing={2} alignItems="center" justifyContent="center">
        <Typography variant="h4">
          An unexpected error occured, please contact your space IT support
        </Typography>
      </GridLayout>
    );
  }

  if (!characters) {
    return (
      <GridLayout spacing={2} alignItems="center" justifyContent="center">
        <LoadingSpinner />
      </GridLayout>
    );
  }

  if (characters.length === 0) {
    return (
      <GridLayout spacing={2} alignItems="center" justifyContent="center">
        <Typography variant="h4">
          No Characters found in the whole Universe
        </Typography>
      </GridLayout>
    );
  }

  const page = +(searchParams.get("page") || 1);
  const totalPages = Math.ceil(filteredCharacters.length / CHARACTERS_PER_PAGE);
  const { currentData, currentPage } = getCharactersPerPage(
    filteredCharacters,
    page
  );

  return (
    <DataContextProvider property="allCharacters" value={characters}>
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        maxHeight={maxHeight}
        minHeight={minHeight}
      />
      <Box>
        <Header
          onSearch={searchHandler}
          onSidebarClick={sidebarHandler}
          searchBy={searchBy}
        />
        <GridLayout
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ mt: -8 }}
        >
          <Grid container justifyContent="center" size={{ xs: 12 }}>
            <GenericList
              items={currentData}
              renderItem={(item) => (
                <CharacterItem key={item.id} character={item} />
              )}
            />
          </Grid>
          <Grid container justifyContent="center" size={{ xs: 12 }}>
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </Grid>
        </GridLayout>
      </Box>
    </DataContextProvider>
  );
};

export default CharactersPageClient;
