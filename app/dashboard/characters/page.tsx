"use client";

import { useSearchParams } from "next/navigation";
import { GenericList } from "@/app/components/genericList";
import Pagination from "@/app/components/pagination";
import CharacterItem from "@/app/components/characterItem";
import { GridLayout } from "@/app/components/layouts/gridLayout";
import { Grid } from "@mui/material";
import DataContextProvider from "@/app/components/util/DataContextProvider";
import useCharacters from "@/app/hooks/useCharacters";
import LoadingSpinner from "@/app/components/loadingSpinner";
import { getCharactersPerPage } from "@/lib/utils/helpers";
import { CHARACTERS_PER_PAGE } from "@/lib/constants/common";
import Header from "@/app/components/header";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export default function CharactersPage() {
  const searchParams = useSearchParams();
  const { characters, status } = useCharacters();
  const router = useRouter();

  const queryParam = searchParams.get("query")?.toLowerCase() || "";
  const dataToDisplay = characters
    ? queryParam
      ? characters.filter(({ name }) => name.toLowerCase().includes(queryParam))
      : characters
    : [];

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

  if (status && status > 299) {
    return (
      <GridLayout spacing={2} alignItems="center" justifyContent="center">
        <h2>
          An unexpected error occured, please contact your space IT support
        </h2>
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
        <h2>No Characters found in the whole Universe</h2>
      </GridLayout>
    );
  }

  const page = +(searchParams.get("page") || 1);
  const totalPages = Math.ceil(dataToDisplay!.length / CHARACTERS_PER_PAGE);
  const { currentData, currentPage } = getCharactersPerPage(
    dataToDisplay!,
    page
  );

  return (
    <DataContextProvider property="allCharacters" value={characters}>
      <Header onSearch={searchHandler} />
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
    </DataContextProvider>
  );
}
